import type { Pieces } from '../../types';
import { isCellAccessible } from '../utills';
import { isKingInCheck } from './kingProtection';

const castleLogic = (
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    board: Pieces[]
): { isValid: boolean; updatedBoard?: Pieces[] } => {
    const kingPiece = board.find(
        (p) => p.x === prevX && p.y === prevY && p.type === 'KING'
    );
    const rookPiece = board.find(
        (p) => p.x === newX && p.y === newY && p.type === 'ROCK'
    );

    if (!kingPiece || !rookPiece) {
        return { isValid: false };
    }

    if (kingPiece.team !== rookPiece.team) {
        return { isValid: false };
    }

    if (kingPiece.isKingMoving || rookPiece.isRookMoving) {
        return { isValid: false };
    }

    const distance = Math.abs(newY - prevY);
    const yDirection = newY > prevY ? 1 : -1;

    for (let i = 1; i < distance; i++) {
        const checkY = prevY + i * yDirection;
        if (!isCellAccessible(prevX, checkY, board)) {
            return { isValid: false };
        }
    }

    if (isKingInCheck(kingPiece.team, board, kingPiece.x, kingPiece.y)) {
        return { isValid: false };
    }

    for (let i = 1; i <= 2; i++) {
        const checkY = prevY + i * yDirection;
        if (isKingInCheck(kingPiece.team, board, prevX, checkY)) {
            return { isValid: false };
        }
    }

    const updatedBoard = board.map((piece) => {
        if (piece.x === prevX && piece.y === prevY && piece.type === 'KING') {
            const kingNewY = prevY + 2 * yDirection;
            return {
                ...piece,
                x: prevX,
                y: kingNewY,
                isKingMoving: true,
            };
        }

        if (piece.x === newX && piece.y === newY && piece.type === 'ROCK') {
            const rookNewY = prevY + 1 * yDirection;
            return {
                ...piece,
                x: prevX,
                y: rookNewY,
                isRookMoving: true,
            };
        }

        return piece;
    });

    return { isValid: true, updatedBoard };
};

export { castleLogic };
