import type { Pieces } from '../../types';
import type { PieceType, Teams } from '../../types/enums';
import { isCellAccessible, isCellOccupiedByOpponent } from '../utills';
import { enPassant } from './enPassant';
import { wouldKingBeInCheck, wouldKingBeInCheckAfterEnPassant } from './kingProtection';

const pawnLogic = (
    team: Teams,
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    board: Pieces[],
    type: PieceType
) => {
    const direction = team === 'ME' ? 1 : -1;
    const startRow = team === 'ME' ? 1 : 6;
    const king = board.find(p => p.team === team && p.type === "KING");

    if (!king) return false;

    if (newX === prevX + direction && newY === prevY) {
        if (!isCellAccessible(newX, newY, board)) {
            return false;
        }
        return !wouldKingBeInCheck(prevX, prevY, newX, newY, team, board);
    }

    if (
        prevX === startRow &&
        newX === prevX + 2 * direction &&
        newY === prevY
    ) {
        const midX = prevX + direction;
        if (!isCellAccessible(midX, newY, board) ||
            !isCellAccessible(newX, newY, board)) {
            return false;
        }
        return !wouldKingBeInCheck(prevX, prevY, newX, newY, team, board);
    }

    if (newX === prevX + direction && Math.abs(newY - prevY) === 1) {
        if (isCellOccupiedByOpponent(newX, newY, board, team)) {
            return !wouldKingBeInCheck(prevX, prevY, newX, newY, team, board);
        }
        if (enPassant(prevX, prevY, newX, newY, team, board, type)) {
            return !wouldKingBeInCheckAfterEnPassant(prevX, prevY, newX, newY, team, board);
        }
        return false;
    }

    if (enPassant(prevX, prevY, newX, newY, team, board, type)) {
        return !wouldKingBeInCheckAfterEnPassant(prevX, prevY, newX, newY, team, board);
    }

    return false;
};

export { pawnLogic };