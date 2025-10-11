import type { Pieces } from '../../types';
import type { Teams } from '../../types/enums';
import { isCellAccessible, isCellOccupiedByMe } from '../utills';
import { wouldKingBeInCheck } from './kingProtection';

const rookLogic = (
    team: Teams,
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    board: Pieces[]
) => {
    const deltaX = Math.abs(newX - prevX);
    const deltaY = Math.abs(newY - prevY);

    if (deltaX > 0 && deltaY > 0) {
        return false;
    }

    if (deltaX === 0 && deltaY === 0) {
        return false;
    }

    if (deltaX > 0) {
        const xDirection = newX > prevX ? 1 : -1;

        for (let i = 1; i < deltaX; i++) {
            const checkX = prevX + i * xDirection;

            if (!isCellAccessible(checkX, prevY, board)) {
                return false;
            }
        }
    } else {
        const yDirection = newY > prevY ? 1 : -1;

        for (let i = 1; i < deltaY; i++) {
            const checkY = prevY + i * yDirection;

            if (!isCellAccessible(prevX, checkY, board)) {
                return false;
            }
        }
    }

    if (isCellOccupiedByMe(newX, newY, board, team)) {
        const rock = board.find(
            (p) => p.x === prevX && p.y === prevY && p.type === 'ROCK'
        );
            if (wouldKingBeInCheck(prevX, prevY, newX, newY, team, board))
                return false
        if (rock) rock.isRookMoving = true;
        return true;
    }
    return false;
};

export { rookLogic };
