import type { Pieces } from '../../types';
import { isCellAccessible } from '../utills';
import { pawnCheck } from './kingProtection';
import { getBishopPossibleMoves } from '../PossibleMoves/bishopPossibleMoves';
import { getKingPossibleMoves } from '../PossibleMoves/kingPossibleMoves';
import { getKnightPossibleMoves } from '../PossibleMoves/knightPossibleMoves';
import { getPawnPossibleMoves } from '../PossibleMoves/pawnPossibleMoves';
import { getQueenPossibleMoves } from '../PossibleMoves/queenPossibleMoves';
import { getRockPossibleMoves } from '../PossibleMoves/rockPossibleMoves';

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

    if (prevX !== newX) {
        return { isValid: false };
    }

    if (kingPiece.isKingMoving || rookPiece.isRookMoving) {
        return { isValid: false };
    }

    const distance = Math.abs(newY - prevY);
    if (distance !== 3 && distance !== 4) {
        return { isValid: false };
    }
    const yDirection = newY > prevY ? 1 : -1;

    for (let i = 1; i < distance; i++) {
        const checkY = prevY + i * yDirection;
        if (!isCellAccessible(prevX, checkY, board)) {
            return { isValid: false };
        }
    }

    const isSquareAttacked = (
        x: number,
        y: number,
        byTeam: 'WHITE' | 'BLACK'
    ) => {
        for (const piece of board) {
            if (piece.team !== byTeam) continue;
            if (piece.type === 'PAWN') {
                if (pawnCheck(piece, x, y)) return true;
                continue;
            }
            let moves;
            switch (piece.type) {
                case 'KING':
                    moves = getKingPossibleMoves(piece, board);
                    break;
                case 'KNIGHT':
                    moves = getKnightPossibleMoves(piece, board);
                    break;
                case 'QUEEN':
                    moves = getQueenPossibleMoves(piece, board);
                    break;
                case 'BISHOP':
                    moves = getBishopPossibleMoves(piece, board);
                    break;
                case 'ROCK':
                    moves = getRockPossibleMoves(piece, board);
                    break;
                default:
                    moves = getPawnPossibleMoves(piece, board);
            }
            for (const m of moves) {
                if (m.x === x && m.y === y) return true;
            }
        }
        return false;
    };

    const opponentTeam = kingPiece.team === 'WHITE' ? 'BLACK' : 'WHITE';
    if (isSquareAttacked(kingPiece.x, kingPiece.y, opponentTeam)) {
        return { isValid: false };
    }

    for (let i = 1; i <= 2; i++) {
        const checkY = prevY + i * yDirection;
        if (isSquareAttacked(prevX, checkY, opponentTeam)) {
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
