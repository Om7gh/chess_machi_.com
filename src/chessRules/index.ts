import type { Pieces } from '../types';
import type { PieceType, Teams } from '../types/enums';

export class ChessRules {
    isCellAccessible(posX: number, posY: number, board: Pieces[]) {
        const piece = board.find((p) => p.x === posX && p.y === posY);
        return piece === undefined;
    }

    isCellOccupiedByOpponent(
        posX: number,
        posY: number,
        board: Pieces[],
        team: Teams
    ) {
        const piece = board.find((p) => p.x === posX && p.y === posY);
        return piece !== undefined && piece.team !== team;
    }

    isValid = (
        prevX: number,
        prevY: number,
        newX: number,
        newY: number,
        team: Teams,
        type: PieceType,
        board: Pieces[]
    ): boolean => {
        if (type === 'PAWN') {
            const direction = team === 'ME' ? 1 : -1;
            const startRow = team === 'ME' ? 1 : 6;

            if (newX - prevX === direction && newY === prevY) {
                return this.isCellAccessible(newX, newY, board);
            }

            if (
                prevX === startRow &&
                newX - prevX === 2 * direction &&
                newY === prevY
            ) {
                const midX = prevX + direction;
                return (
                    this.isCellAccessible(midX, newY, board) &&
                    this.isCellAccessible(newX, newY, board)
                );
            }
        }
        return false;
    };
}
