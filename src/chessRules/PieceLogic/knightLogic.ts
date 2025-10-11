import type { Pieces } from "../../types";
import type { Teams } from "../../types/enums";
import { isCellOccupiedByMe } from "../utills";
import { wouldKingBeInCheck } from "./kingProtection";

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
          if (isCellOccupiedByMe(newX, newY, board, team))
            return !wouldKingBeInCheck(prevX, prevY, newX, newY, team, board)
    }
    return false;
};

export { knightLogic };
