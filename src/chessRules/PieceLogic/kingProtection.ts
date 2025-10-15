import { ChessRules } from '..';
import type { Pieces } from '../../types';
import type { Teams } from '../../types/enums';

const wouldKingBeInCheck = (
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    team: Teams,
    board: Pieces[]
): boolean => {
    const tempBoard = board
        .map((piece) => {
            if (piece.x === prevX && piece.y === prevY) {
                return { ...piece, x: newX, y: newY };
            }
            if (piece.x === newX && piece.y === newY && piece.team !== team) {
                return null;
            }
            return piece;
        })
        .filter(Boolean) as Pieces[];

    const boardWithUpdatedMoves = updatePossibleMoves(tempBoard);
    return isKingInCheckWithUpdatedMoves(team, boardWithUpdatedMoves);
};

const wouldKingBeInCheckAfterEnPassant = (
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    team: Teams,
    board: Pieces[]
): boolean => {
    const tempBoard = board
        .map((piece) => {
            if (piece.x === prevX && piece.y === prevY) {
                return { ...piece, x: newX, y: newY };
            }
            const capturedPawnX = prevX;
            const capturedPawnY = newY;

            if (
                piece.x === capturedPawnX &&
                piece.y === capturedPawnY &&
                piece.team !== team
            ) {
                return null;
            }
            return piece;
        })
        .filter(Boolean) as Pieces[];

    const boardWithUpdatedMoves = updatePossibleMoves(tempBoard);

    return isKingInCheckWithUpdatedMoves(team, boardWithUpdatedMoves);
};

const updatePossibleMoves = (board: Pieces[]): Pieces[] => {
    const rules = new ChessRules();
    return board.map((piece) => ({
        ...piece,
        possibleMoves: rules.getPossibleMove(board, piece),
    }));
};

const isKingInCheckWithUpdatedMoves = (
    team: Teams,
    board: Pieces[]
): boolean => {
    const king = board.find(
        (piece) => piece.type === 'KING' && piece.team === team
    );

    if (!king) {
        return false;
    }
    const opponentPieces = board.filter((piece) => piece.team !== team);

    for (const piece of opponentPieces) {
        if (piece.possibleMoves) {
            for (const move of piece.possibleMoves) {
                if (move.x === king.x && move.y === king.y) {
                    return true;
                }
            }
        }
    }

    return false;
};

const opponentPieceIsProtected = (
    newX: number,
    newY: number,
    team: Teams,
    board: Pieces[]
) => {
    const attackPieces = board.filter((p) => p.team !== team);
    for (const piece of attackPieces) {
        if (!piece.possibleMoves) continue;
        for (const move of piece.possibleMoves) {
            if (move.x === newX && move.y === newY) return true;
        }
    }
    return false;
};

const isKingInCheck = (
    team: Teams,
    board: Pieces[],
    newX: number,
    newY: number
): boolean => {
    const king = board.find(
        (piece) => piece.type === 'KING' && piece.team === team
    );

    if (!king) return false;
    const opponentPieces = board.filter((piece) => piece.team !== team);
    for (const piece of opponentPieces) {
        if (piece.type === 'PAWN') {
            const pawnIsDanger = pawnCheck(piece, newX, newY);
            if (pawnIsDanger) return true;
        } else if (piece.possibleMoves) {
            for (const move of piece.possibleMoves) {
                if (move.x === newX && move.y === newY) return true;
            }
        }
    }
    return false;
};

const pawnCheck = (pawn: Pieces, newX: number, newY: number) => {
    const direction = pawn.team === 'ME' ? 1 : -1;
    const pawnAttackMoves = [
        {
            x: pawn.x + direction,
            y: pawn.y + 1,
        },
        {
            x: pawn.x + direction,
            y: pawn.y - 1,
        },
    ];

    for (const moves of pawnAttackMoves) {
        if (moves.x === newX && moves.y === newY) return true;
    }
    return false;
};

export {
    updatePossibleMoves,
    wouldKingBeInCheck,
    wouldKingBeInCheckAfterEnPassant,
    pawnCheck,
    isKingInCheck,
    isKingInCheckWithUpdatedMoves,
    opponentPieceIsProtected,
};
