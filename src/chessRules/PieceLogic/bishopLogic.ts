import type { Pieces } from "../../types";
import type { Teams } from "../../types/enums";
import { isCellAccessible, isCellOccupiedByMe } from "../utills";
import { wouldKingBeInCheck } from "./kingProtection";

const bishopLogic = (
    team: Teams,
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    board: Pieces[]
) => {
    const deltaX = Math.abs(newX - prevX);
    const deltaY = Math.abs(newY - prevY);

    if (deltaX !== deltaY) return false;

    const xDirection = newX > prevX ? 1 : -1;
    const yDirection = newY > prevY ? 1 : -1;
    for (let i = 1; i < deltaX; i++) {
        const checkX = prevX + i * xDirection;
        const checkY = prevY + i * yDirection;

        if (!isCellAccessible(checkX, checkY, board)) {
            return false;
        }
    }
    if (isCellOccupiedByMe(newX, newY, board, team))
        return !wouldKingBeInCheck(prevX, prevY, newX, newY, team, board)
    return false
};

export { bishopLogic };
