import { useRef, useState } from 'react';
import type { Pieces } from '../types';
import { HORIZONTAL_AXIS, VERTICAL_AXIS } from '../utils';
import Tile from './Tile';
import { initBoard } from '../utils/initBoard';
import { ChessRules } from '../chessRules';
import Files from './Files';
import Ranks from './Ranks';

export default function Board() {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const [pieces, setPieces] = useState<Pieces[]>(initBoard);
    const [draggablePiece, setDraggablePiece] = useState<HTMLElement | null>(
        null
    );
    const [activePieceCoords, setActivePieceCoords] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const board = [];
    const rules = new ChessRules();

    const dragPiece = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const rect = boardRef.current?.getBoundingClientRect();

        if (target.classList.contains('piece') && rect) {
            const tileSize = rect.width / 8;
            const x = 7 - Math.floor((e.clientY - rect.top) / tileSize);
            const y = Math.floor((e.clientX - rect.left) / tileSize);

            setDraggablePiece(target);
            setActivePieceCoords({ x, y });

            target.style.position = 'absolute';
            target.style.width = '4vmax';
            target.style.height = '4vmax';
            target.style.pointerEvents = 'none';
            target.style.zIndex = '1000';

            const boardX = e.clientX - rect.left - target.offsetHeight / 2;
            const boardY = e.clientY - rect.top - target.offsetWidth / 2;

            target.style.left = `${boardX}px`;
            target.style.top = `${boardY}px`;
        }
    };

    const movePiece = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = boardRef.current?.getBoundingClientRect();
        if (draggablePiece && rect) {
            const x = e.clientX - rect.left - draggablePiece.offsetWidth / 2;
            const y = e.clientY - rect.top - draggablePiece.offsetHeight / 2;

            draggablePiece.style.left = `${x}px`;
            draggablePiece.style.top = `${y}px`;
        }
    };

    const dropPiece = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = boardRef.current?.getBoundingClientRect();
        if (draggablePiece && rect && activePieceCoords) {
            const tileSize = rect.width / 8;

            const newX = 7 - Math.floor((e.clientY - rect.top) / tileSize);
            const newY = Math.floor((e.clientX - rect.left) / tileSize);

            const currentPiece = pieces.find(
                (p) =>
                    p.x === activePieceCoords.x && p.y === activePieceCoords.y
            );

            if (!currentPiece) {
                resetDraggablePiece();
                return;
            }

            const isEnPassantMove = rules.enPassant(
                activePieceCoords.x,
                activePieceCoords.y,
                newX,
                newY,
                currentPiece.team,
                pieces,
                currentPiece.type
            );

            const isValidMove = rules.isValid(
                activePieceCoords.x,
                activePieceCoords.y,
                newX,
                newY,
                currentPiece.team,
                currentPiece.type,
                pieces
            );

            if (isValidMove) {
                setPieces((prevPieces) => {
                    // First, reset all en passant flags from previous moves
                    const resetEnPassantPieces = prevPieces.map((p) => ({
                        ...p,
                        isEmpassant: false,
                    }));

                    return resetEnPassantPieces
                        .map((p) => {
                            // Move the current piece
                            if (
                                p.x === activePieceCoords.x &&
                                p.y === activePieceCoords.y
                            ) {
                                // Set en passant flag only if pawn moved two squares
                                if (
                                    Math.abs(activePieceCoords.x - newX) ===
                                        2 &&
                                    p.type === 'PAWN'
                                ) {
                                    return {
                                        ...p,
                                        x: newX,
                                        y: newY,
                                        isEmpassant: true,
                                    };
                                } else {
                                    return {
                                        ...p,
                                        x: newX,
                                        y: newY,
                                        isEmpassant: false,
                                    };
                                }
                            }

                            if (
                                p.x === newX &&
                                p.y === newY &&
                                p.team !== currentPiece.team
                            ) {
                                return null;
                            }

                            if (
                                isEnPassantMove &&
                                p.x === activePieceCoords.x &&
                                p.y === newY &&
                                p.team !== currentPiece.team
                            ) {
                                return null;
                            }

                            return p;
                        })
                        .filter((p): p is Pieces => p !== null);
                });
            }

            resetDraggablePiece();
        }
    };

    const resetDraggablePiece = () => {
        if (draggablePiece) {
            draggablePiece.style.position = '';
            draggablePiece.style.width = '';
            draggablePiece.style.height = '';
            draggablePiece.style.pointerEvents = '';
            draggablePiece.style.zIndex = '';
            draggablePiece.style.left = '';
            draggablePiece.style.top = '';
        }
        setDraggablePiece(null);
        setActivePieceCoords(null);
    };

    for (let x = VERTICAL_AXIS.length - 1; x >= 0; x--) {
        for (let y = 0; y < HORIZONTAL_AXIS.length; y++) {
            let image = undefined;
            pieces.forEach((p) => {
                if (p.x === x && p.y === y) {
                    image = p.image;
                }
            });
            board.push(
                <Tile piece={image} file={x} rank={y} key={`${x}-${y}`} />
            );
        }
    }

    return (
        <div
            ref={boardRef}
            id="board"
            onMouseDown={dragPiece}
            onMouseMove={movePiece}
            onMouseUp={dropPiece}
            style={{ position: 'relative' }}
        >
            <Files />
            {board}
            <Ranks />
        </div>
    );
}
