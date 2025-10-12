import { ChessRules } from "..";
import type { Pieces } from "../../types";
import type { Teams } from "../../types/enums";

const wouldKingBeInCheck = (
    prevX: number,
    prevY: number,
    newX: number,
    newY: number,
    team: Teams,
    board: Pieces[]
): boolean => {
    const tempBoard = board.map(piece => {
        if (piece.x === prevX && piece.y === prevY) {
            return { ...piece, x: newX, y: newY };
        }
        if (piece.x === newX && piece.y === newY && piece.team !== team) {
            return null;
        }
        return piece;
    }).filter(Boolean) as Pieces[];

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
    const tempBoard = board.map(piece => {
        if (piece.x === prevX && piece.y === prevY) {
            return { ...piece, x: newX, y: newY };
        }
        const capturedPawnX = prevX;
        const capturedPawnY = newY;
        
        if (piece.x === capturedPawnX && piece.y === capturedPawnY && piece.team !== team) {
            return null;
        }
        return piece;
    }).filter(Boolean) as Pieces[];

    const boardWithUpdatedMoves = updatePossibleMoves(tempBoard);
    
    return isKingInCheckWithUpdatedMoves(team, boardWithUpdatedMoves);
};

const updatePossibleMoves = (board: Pieces[]): Pieces[] => {
    const rules = new ChessRules();
    return board.map(piece => ({
        ...piece,
        possibleMoves: rules.getPossibleMove(board, piece)
    }));
};

const isKingInCheckWithUpdatedMoves = (team: Teams, board: Pieces[]): boolean => {
    const king = board.find(piece => piece.type === 'KING' && piece.team === team);
    
    if (!king) {
        return false;
    }
    const opponentPieces = board.filter(piece => piece.team !== team);

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

export {isKingInCheckWithUpdatedMoves, updatePossibleMoves, wouldKingBeInCheck, wouldKingBeInCheckAfterEnPassant}