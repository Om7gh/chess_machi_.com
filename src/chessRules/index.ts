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

    enPassant(
        prevX: number,
        prevY: number,
        newX: number,
        newY: number,
        team: Teams,
        board: Pieces[],
        type: PieceType
    ): boolean {
        if (type !== 'PAWN') return false;

        const direction = team === 'ME' ? 1 : -1;

        if (newX === prevX + direction && Math.abs(newY - prevY) === 1) {
            if (this.isCellAccessible(newX, newY, board)) {
                const targetPawn = board.find(
                    (p) =>
                        p.x === prevX &&
                        p.y === newY &&
                        p.type === 'PAWN' &&
                        p.team !== team &&
                        p.isEmpassant
                );

                return targetPawn !== undefined;
            }
        }

        return false;
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

            if (newX === prevX + direction && newY === prevY) {
                return this.isCellAccessible(newX, newY, board);
            }

            if (
                prevX === startRow &&
                newX === prevX + 2 * direction &&
                newY === prevY
            ) {
                const midX = prevX + direction;
                return (
                    this.isCellAccessible(midX, newY, board) &&
                    this.isCellAccessible(newX, newY, board)
                );
            }

            if (newX === prevX + direction && Math.abs(newY - prevY) === 1) {
                return (
                    this.isCellOccupiedByOpponent(newX, newY, board, team) ||
                    this.enPassant(prevX, prevY, newX, newY, team, board, type)
                );
            }
        }
        return false;
    };
}
