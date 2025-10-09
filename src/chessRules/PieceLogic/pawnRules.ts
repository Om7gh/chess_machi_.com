import type { Pieces } from '../../types';
import type { PieceType, Teams } from '../../types/enums';
import { isCellAccessible, isCellOccupiedByOpponent } from '../utills';
import { enPassant } from './enPassant';
import { isKingInCheck } from './kingLogic';

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

    if (!king) return false

    if (newX === prevX + direction && newY === prevY)
    {
        if (!isCellAccessible(newX, newY, board))
            return false
    }

    if (
        prevX === startRow &&
        newX === prevX + 2 * direction &&
        newY === prevY
    ) {
        const midX = prevX + direction;
        if (!isCellAccessible(midX, newY, board) ||
            !isCellAccessible(newX, newY, board))
        return false
    }

    if (newX === prevX + direction && Math.abs(newY - prevY) === 1)
    {
        if (!isCellOccupiedByOpponent(newX, newY, board, team))
            return false
    }
    if (enPassant(prevX, prevY, newX, newY, team, board, type))
            return true

    const tempBoard = board.map(piece => {
        if (piece.x === prevX && piece.y === prevY) {
            return { ...piece, x: newX, y: newY };
        }
        if (piece.x === newX && piece.y === newY && piece.team !== team) {
            return null;
        }
        return piece;
    }).filter(Boolean) as Pieces[];

    if (isKingInCheck(team, tempBoard, king.x, king.y))
        return false

    return true
};

export { pawnLogic };
