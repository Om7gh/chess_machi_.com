import type { Pieces } from "../../types";
import type { Teams } from "../../types/enums";
import { bishopLogic } from "./bishopLogic";
import { rookLogic } from "./rockLogic";


const queenLogic = (
    team: Teams,
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    board: Pieces[]
) => {
    return (
        rookLogic(team, prevX, prevY, newX, newY, board) ||
        bishopLogic(team, prevX, prevY, newX, newY, board)
    );
};

export { queenLogic };
