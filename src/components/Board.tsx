import { useRef, useState } from 'react';
import { HORIZONTAL_AXIS, Piece, VERTICAL_AXIS } from '../utils';
import Tile from './Tile';
import { ChessRules } from '../chessRules';
import Files from './Files';
import Ranks from './Ranks';
import { enPassant } from '../chessRules/PieceLogic/enPassant';
import type { Props } from '../types';

export default function Board({
    pieces,
    setPieces,
    setPromotionPending,
}: Props) {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const [draggablePiece, setDraggablePiece] = useState<HTMLElement | null>(
        null
    );
    const [activePieceCoords, setActivePieceCoords] = useState<{
        x: number;
        y: number;
    } | null>(null);

    const rules = new ChessRules();

    function updateMoves() {
        setPieces((prev) => {
            return prev.map((p) => {
                const possibleMoves = rules.getPossibleMove(prev, p);
                return {
                    ...p,
                    possibleMoves,
                };
            });
        });
    }

    const dragPiece = (e: React.MouseEvent<HTMLDivElement>) => {
        updateMoves();
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

            const isEnPassantMove = enPassant(
                activePieceCoords.x,
                activePieceCoords.y,
                newX,
                newY,
                currentPiece.team,
                pieces,
                currentPiece.type
            );

            const validMove = rules.isValid(
                activePieceCoords.x,
                activePieceCoords.y,
                newX,
                newY,
                currentPiece.team,
                currentPiece.type,
                pieces
            );

            if (validMove) {
                if (Array.isArray(validMove)) {
                    setPieces(
                        validMove.map((p) => ({ ...p, isEmpassant: false }))
                    );
                } else if (validMove === true) {
                    const isPromotionMove =
                        currentPiece.type === 'PAWN' &&
                        ((currentPiece.team === 'ME' && newX === 7) ||
                            (currentPiece.team === 'OPPONENT' && newX === 0));

                    if (isPromotionMove) {
                        setPromotionPending({
                            piece: currentPiece,
                            newX,
                            newY,
                        });
                    } else {
                        setPieces((prevPieces) => {
                            const resetEnPassantPieces = prevPieces.map(
                                (p) => ({
                                    ...p,
                                    isEmpassant: false,
                                })
                            );

                            return resetEnPassantPieces
                                .map((p) => {
                                    if (
                                        p.x === activePieceCoords.x &&
                                        p.y === activePieceCoords.y
                                    ) {
                                        if (
                                            Math.abs(
                                                activePieceCoords.x - newX
                                            ) === 2 &&
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
                                .filter((p) => p !== null);
                        });
                    }
                }
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

    const boardTiles = [];
    for (let x = VERTICAL_AXIS.length - 1; x >= 0; x--) {
        for (let y = 0; y < HORIZONTAL_AXIS.length; y++) {
            let image = undefined;
            const currentPiece = pieces.find(
                (p) =>
                    p.x === activePieceCoords?.x && p.y === activePieceCoords?.y
            );

            const highlight = currentPiece?.possibleMoves
                ? currentPiece.possibleMoves.some((p) => p.x === x && p.y === y)
                : false;

            image = pieces.find((p) => p.x === x && p.y === y)?.image;

            boardTiles.push(
                <Tile
                    piece={image}
                    file={x}
                    rank={y}
                    key={`${x}-${y}`}
                    highlight={highlight}
                />
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
                {boardTiles}
                <Ranks />
            </div>
    );
}
