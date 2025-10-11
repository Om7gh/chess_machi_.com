import type { Props } from '../types';
import { useRef, useState } from 'react';
import { ChessRules } from '../chessRules';
import { boardTile } from '../utils/boardTiles';
import { draggableEvent } from '../events';
import { getBoardCoordinates, getCurrentPiece, handleValidMove, validateTurn } from '../events/dropEvent';

export default function Board({
    pieces,
    setPieces,
    setPromotionPending,
    checkmate,
    setCheckmate
}: Props) {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const [draggablePiece, setDraggablePiece] = useState<HTMLElement | null>(
        null
    );
    const [activePieceCoords, setActivePieceCoords] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [turns, setTurns] = useState(1);
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
        if (checkmate)
            return ;
        updateMoves();
        draggableEvent(e, boardRef, setDraggablePiece, setActivePieceCoords)
    };

    const movePiece = (e: React.MouseEvent<HTMLDivElement>) => {
         if (checkmate)
            return ;
        const rect = boardRef.current?.getBoundingClientRect();
        if (draggablePiece && rect) {
            const x = e.clientX - rect.left - draggablePiece.offsetWidth / 2;
            const y = e.clientY - rect.top - draggablePiece.offsetHeight / 2;

            draggablePiece.style.left = `${x}px`;
            draggablePiece.style.top = `${y}px`;
        }
    };

    const dropPiece = (e: React.MouseEvent<HTMLDivElement>) => {
         if (checkmate)
            return ;
        if (!draggablePiece || !activePieceCoords) {
        return resetDraggablePiece();
    }

    const boardCoords = getBoardCoordinates(e, boardRef);
    if (!boardCoords) return resetDraggablePiece();

    const { newX, newY } = boardCoords;
    const currentPiece = getCurrentPiece(activePieceCoords, pieces);
    
    if (!currentPiece) return resetDraggablePiece();
    if (!validateTurn(currentPiece, turns)) return resetDraggablePiece();

    const validMove = rules.isValid(
        activePieceCoords.x,
        activePieceCoords.y,
        newX,
        newY,
        currentPiece.team,
        currentPiece.type,
        pieces
    );

    validMove && handleValidMove(
        validMove,
        activePieceCoords,
        newX,
        newY,
        currentPiece,
        pieces,
        setPieces,
        setPromotionPending,
        setTurns
    );
    resetDraggablePiece();
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

    const boardTiles = boardTile({pieces, activePieceCoords, turns});
    return (
        <div
            ref={boardRef}
            id="board"
            onMouseDown={dragPiece}
            onMouseMove={movePiece}
            onMouseUp={dropPiece}
            style={{ position: 'relative' }}
        >
            {boardTiles}
        </div>
    );
}
