import type { Pieces, Position } from '../types';
import { type PieceType, type Teams } from '../types/enums';
import { bishopLogic } from './PieceLogic/bishopLogic';
import { castleLogic } from './PieceLogic/castleLogic';
import { kingLogic } from './PieceLogic/kingLogic';
import { knightLogic } from './PieceLogic/knightLogic';
import { pawnLogic } from './PieceLogic/pawnRules';
import { queenLogic } from './PieceLogic/queenLogic';
import { rookLogic } from './PieceLogic/rockLogic';
import { getBishopPossibleMoves } from './PossibleMoves/bishopPossibleMoves';
import { getKingPossibleMoves } from './PossibleMoves/kingPossibleMoves';
import { getKnightPossibleMoves } from './PossibleMoves/knightPossibleMoves';
import { getPawnPossibleMoves } from './PossibleMoves/pawnPossibleMoves';
import { getQueenPossibleMoves } from './PossibleMoves/queenPossibleMoves';
import { getRockPossibleMoves } from './PossibleMoves/rockPossibleMoves';

export class ChessRules {
    isValid = (
        prevX: number,
        prevY: number,
        newX: number,
        newY: number,
        team: Teams,
        type: PieceType,
        board: Pieces[]
    ) => {
        switch (type) {
            case 'PAWN':
                return pawnLogic(team, prevX, prevY, newX, newY, board, type);

            case 'KNIGHT':
                return knightLogic(team, prevX, prevY, newX, newY, board);

            case 'BISHOP':
                return bishopLogic(team, prevX, prevY, newX, newY, board);

            case 'ROCK':
                return rookLogic(team, prevX, prevY, newX, newY, board);

            case 'QUEEN':
                return queenLogic(team, prevX, prevY, newX, newY, board);

            case 'KING': {
                const castleResult = castleLogic(
                    prevX,
                    prevY,
                    newX,
                    newY,
                    board
                );
                if (castleResult.isValid && castleResult.updatedBoard) {
                    return castleResult.updatedBoard;
                }
                return kingLogic(team, prevX, prevY, newX, newY, board);
            }
        }
        return false;
    };

    getPossibleMove(board: Pieces[], piece: Pieces): Position[] {
        switch (piece.type) {
            case 'PAWN':
                return getPawnPossibleMoves(piece, board);
            case 'KING':
                return getKingPossibleMoves(piece, board);
            case 'KNIGHT':
                return getKnightPossibleMoves(piece, board);
            case 'QUEEN':
                return getQueenPossibleMoves(piece, board);
            case 'BISHOP':
                return getBishopPossibleMoves(piece, board);
            case 'ROCK':
                return getRockPossibleMoves(piece, board);
            default:
                return [];
        }
    }
}
