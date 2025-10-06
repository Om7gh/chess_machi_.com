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
    if (deltaX === 1 || deltaY === 1) {
        if (deltaX + deltaY > 2) return false;
        if (isCellOccupiedByMe(newX, newY, board, team)) {
            const king = board.find(
                (p) => p.x === prevX && p.y == prevY && p.type === 'KING'
            );
            if (king) king.isKingMoving = true;
            return true;
        }
    }
    return false;
};

export { kingLogic };
