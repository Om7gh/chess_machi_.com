// kingLogic.ts
import type { Pieces } from '../../types';
import type { Teams } from '../../types/enums';
import { isCellOccupiedByMe } from '../utills';

const kingLogic = (
    team: Teams,
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    board: Pieces[]
) => {
    const deltaX = Math.abs(newX - prevX);
    const deltaY = Math.abs(newY - prevY);

    if (deltaX > 1 || deltaY > 1) {
        return false;
    }

    if (!isCellOccupiedByMe(newX, newY, board, team)) {
        return false;
    }

    if (isKingInCheck(team, board, newX, newY)) {
        return false;
    }

    return true;
};

export const isKingInCheck = (
    team: Teams,
    board: Pieces[],
    newX: number,
    newY: number
): boolean => {
    const king = board.find(
        (piece) => piece.type === 'KING' && piece.team === team
    );

    if (!king) {
        return false;
    }

    const opponentPieces = board.filter((piece) => piece.team !== team);

    for (const piece of opponentPieces) {
        if (piece.type === 'PAWN') {
            const pawnIsDanger = pawnCheck(piece, newX, newY);
            if (pawnIsDanger) return true;
        } else if (piece.possibleMoves) {
            for (const move of piece.possibleMoves) {
                if (move.x === newX && move.y === newY) return true;
            }
        }
    }
    return false;
};

const pawnCheck = (pawn: Pieces, newX: number, newY: number) => {
    const direction = pawn.team === 'ME' ? 1 : -1;
    const pawnAttackMoves = [
        {
            x: pawn.x + direction,
            y: pawn.y + 1,
        },
        {
            x: pawn.x + direction,
            y: pawn.y - 1,
        },
    ];

    for (const moves of pawnAttackMoves) {
        if (moves.x === newX && moves.y === newY) {
            console.log(moves.x, moves.y);
            console.log(newX, newY);
            return true;
        }
    }
    return false;
};

export { kingLogic };
