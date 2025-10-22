import { enPassant } from '../chessRules/PieceLogic/enPassant';
import type { Pieces } from '../types';

const getBoardCoordinates = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    boardRef: React.RefObject<HTMLDivElement | null>
): { newX: number; newY: number; tileSize: number } | null => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return null;

    let clientX: number, clientY: number;

    if ('touches' in e) {
        const touch = e.touches[0] || e.changedTouches[0];
        if (!touch) return null;
        clientX = touch.clientX;
        clientY = touch.clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    const tileSize = rect.width / 8;
    const newX = 7 - Math.floor((clientY - rect.top) / tileSize);
    const newY = Math.floor((clientX - rect.left) / tileSize);

    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) return null;

    return { newX, newY, tileSize };
};

const getCurrentPiece = (
    activePieceCoords: { x: number; y: number } | null,
    pieces: Pieces[]
): Pieces | null => {
    if (!activePieceCoords) return null;

    return (
        pieces.find(
            (p) => p.x === activePieceCoords.x && p.y === activePieceCoords.y
        ) || null
    );
};

const validateTurn = (currentPiece: Pieces | null, turns: number): boolean => {
    if (!currentPiece) return false;

    if (currentPiece.team === 'WHITE' && turns % 2 === 0) return false;
    if (currentPiece.team === 'BLACK' && turns % 2 === 1) return false;

    return true;
};

const isPromotionMove = (currentPiece: Pieces, newX: number): boolean => {
    return (
        currentPiece.type === 'PAWN' &&
        ((currentPiece.team === 'WHITE' && newX === 7) ||
            (currentPiece.team === 'BLACK' && newX === 0))
    );
};

const updatePiecesForMove = (
    prevPieces: Pieces[],
    activePieceCoords: { x: number; y: number },
    newX: number,
    newY: number,
    currentPiece: Pieces,
    isEnPassantMove: boolean
): Pieces[] => {
    const resetEnPassantPieces = prevPieces.map((p) => ({
        ...p,
        isEmpassant: false,
    }));

    return resetEnPassantPieces
        .map((p) => {
            if (p.x === activePieceCoords.x && p.y === activePieceCoords.y) {
                if (
                    Math.abs(activePieceCoords.x - newX) === 2 &&
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

            if (p.x === newX && p.y === newY && p.team !== currentPiece.team) {
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
};

const handleValidMove = (
    validMove: boolean | Pieces[],
    activePieceCoords: { x: number; y: number },
    newX: number,
    newY: number,
    currentPiece: Pieces,
    pieces: Pieces[],
    setPieces: (pieces: Pieces[] | ((prev: Pieces[]) => Pieces[])) => void,
    setPromotionPending: (
        promotion: {
            piece: Pieces;
            newX: number;
            newY: number;
        } | null
    ) => void,
    setTurns: () => void,
    syncBoard: (
        board: Pieces[],
        currentTurn: 'WHITE' | 'BLACK',
        turns: number
    ) => void,
    setCurrentTurn: () => void,
    currentTurn: 'WHITE' | 'BLACK',
    turns: number
): void => {
    const pieceMoved =
        activePieceCoords.x !== newX || activePieceCoords.y !== newY;

    if (Array.isArray(validMove)) {
        setPieces(validMove.map((p) => ({ ...p, isEmpassant: false })));
        if (pieceMoved) {
            setTurns();
            setCurrentTurn();
            syncBoard(pieces, currentTurn, turns);
        }
    } else if (validMove === true) {
        if (isPromotionMove(currentPiece, newX)) {
            setPromotionPending({
                piece: currentPiece,
                newX,
                newY,
            });
            if (pieceMoved) {
                setTurns();
                setCurrentTurn();
                syncBoard(pieces, currentTurn, turns);
            }
        } else {
            const isEnPassantMove = enPassant(
                activePieceCoords.x,
                activePieceCoords.y,
                newX,
                newY,
                currentPiece.team,
                pieces,
                currentPiece.type
            );

            setPieces((prevPieces) =>
                updatePiecesForMove(
                    prevPieces,
                    activePieceCoords,
                    newX,
                    newY,
                    currentPiece,
                    isEnPassantMove
                )
            );
            if (pieceMoved) {
                console.log(currentTurn, turns, pieces);
                setTurns();
                setCurrentTurn();
                syncBoard(pieces, currentTurn, turns + 1);
            }
        }
    }
};

export {
    getBoardCoordinates,
    getCurrentPiece,
    handleValidMove,
    updatePiecesForMove,
    validateTurn,
};
