import type { Pieces } from '../../types';
import type { PieceType, Teams } from '../../types/enums';
import { isCellAccessible, isCellOccupiedByOpponent } from '../utills';
import { enPassant } from './enPassant';

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

    if (newX === prevX + direction && newY === prevY) {
        return isCellAccessible(newX, newY, board);
    }

    if (
        prevX === startRow &&
        newX === prevX + 2 * direction &&
        newY === prevY
    ) {
        const midX = prevX + direction;
        return (
            isCellAccessible(midX, newY, board) &&
            isCellAccessible(newX, newY, board)
        );
    }

    if (newX === prevX + direction && Math.abs(newY - prevY) === 1) {
        return (
            isCellOccupiedByOpponent(newX, newY, board, team) ||
            enPassant(prevX, prevY, newX, newY, team, board, type)
        );
    }
    return false;
};

export { pawnLogic };
