import type { Pieces } from "../../types";
import type { Teams } from "../../types/enums";
import { isCellOccupiedByMe } from "../utills";

const knightLogic = (
    team: Teams,
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    board: Pieces[]
) => {
    const deltaX = Math.abs(newX - prevX);
    const deltaY = Math.abs(newY - prevY);

    if ((deltaX === 2 && deltaY === 1) || (deltaX === 1 && deltaY === 2)) {
        return isCellOccupiedByMe(newX, newY, board, team);
    }
    return false;
};

export { knightLogic };
