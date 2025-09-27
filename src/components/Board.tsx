import { useRef, useState } from 'react';
import type { Pieces } from '../types';
import { HORIZONTAL_AXIS, VERTICAL_AXIS } from '../utils';
import Tile from './Tile';
import { initBoard } from '../utils/initBoard';
import { ChessRules } from '../chessRules';

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
            const x = Math.floor((e.clientX - rect.left) / tileSize);
            const y = Math.floor((e.clientY - rect.top) / tileSize);

            setDraggablePiece(target);
            setActivePieceCoords({ x, y });

            target.style.position = 'absolute';
            target.style.width = '4vmax';
            target.style.height = '4vmax';
            target.style.pointerEvents = 'none';
            target.style.zIndex = '1000';

            const boardX = e.clientX - rect.left - target.offsetWidth / 2;
            const boardY = e.clientY - rect.top - target.offsetHeight / 2;
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
            const newX = Math.floor((e.clientX - rect.left) / tileSize);
            const newY = Math.floor((e.clientY - rect.top) / tileSize);
            const isValidMove = rules.isValid();
            setPieces((prevPieces) =>
                prevPieces.map((p) =>
                    p.x === activePieceCoords.x &&
                    p.y === activePieceCoords.y &&
                    isValidMove
                        ? { ...p, x: newX, y: newY }
                        : p
                )
            );

            draggablePiece.style.position = '';
            draggablePiece.style.width = '';
            draggablePiece.style.height = '';
            draggablePiece.style.pointerEvents = '';
            draggablePiece.style.zIndex = '';
            draggablePiece.style.left = '';
            draggablePiece.style.top = '';

            setDraggablePiece(null);
            setActivePieceCoords(null);
        }
    };

    for (let y = 0; y < VERTICAL_AXIS.length; y++) {
        for (let x = 0; x < HORIZONTAL_AXIS.length; x++) {
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
            {board}
        </div>
    );
}
