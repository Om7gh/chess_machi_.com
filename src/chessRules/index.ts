import type { Pieces } from '../types';
import type { PieceType, Teams } from '../types/enums';

export class ChessRules {
    isCellAccessible(posX: number, posY: number, board: Pieces[]) {
        const piece = board.find((p) => p.x === posX && p.y === posY);
        return piece === undefined;
    }

    isCellOccupiedByMe(
        posX: number,
        posY: number,
        board: Pieces[],
        team: Teams
    ) {
        const piece = board.find((p) => p.x === posX && p.y === posY);
        if (piece) {
            if (piece.team === team) return false;
        }
        return true;
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

    pawnLogic(
        team: Teams,
        prevX: number,
        prevY: number,
        newX: number,
        newY: number,
        board: Pieces[],
        type: PieceType
    ) {
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
        return false;
    }

    knightLogic(
        team: Teams,
        prevX: number,
        prevY: number,
        newX: number,
        newY: number,
        board: Pieces[]
    ) {
        const deltaX = Math.abs(newX - prevX);
        const deltaY = Math.abs(newY - prevY);

        if ((deltaX === 2 && deltaY === 1) || (deltaX === 1 && deltaY === 2)) {
            return this.isCellOccupiedByMe(newX, newY, board, team);
        }
        return false;
    }

    bishopLogic(
        team: Teams,
        prevX: number,
        prevY: number,
        newX: number,
        newY: number,
        board: Pieces[]
    ) {
        const deltaX = Math.abs(newX - prevX);
        const deltaY = Math.abs(newY - prevY);

        if (deltaX !== deltaY) return false;

        const xDirection = newX > prevX ? 1 : -1;
        const yDirection = newY > prevY ? 1 : -1;
        for (let i = 1; i < deltaX; i++) {
            const checkX = prevX + i * xDirection;
            const checkY = prevY + i * yDirection;

            if (!this.isCellAccessible(checkX, checkY, board)) {
                return false;
            }
        }
        return this.isCellOccupiedByMe(newX, newY, board, team);
    }

    rookLogic(
        team: Teams,
        prevX: number,
        prevY: number,
        newX: number,
        newY: number,
        board: Pieces[]
    ) {
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

                if (!this.isCellAccessible(checkX, prevY, board)) {
                    return false;
                }
            }
        } else {
            const yDirection = newY > prevY ? 1 : -1;

            for (let i = 1; i < deltaY; i++) {
                const checkY = prevY + i * yDirection;

                if (!this.isCellAccessible(prevX, checkY, board)) {
                    return false;
                }
            }
        }

        return this.isCellOccupiedByMe(newX, newY, board, team);
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
            return this.pawnLogic(team, prevX, prevY, newX, newY, board, type);
        }
        if (type === 'KNIGHT') {
            return this.knightLogic(team, prevX, prevY, newX, newY, board);
        }

        if (type === 'BISHOP') {
            return this.bishopLogic(team, prevX, prevY, newX, newY, board);
        }

        if (type === 'ROCK')
            return this.rookLogic(team, prevX, prevY, newX, newY, board);

        return false;
    };
}
