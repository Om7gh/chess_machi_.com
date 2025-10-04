import type { Pieces, Position } from '../types';
import { type PieceType, type Teams } from '../types/enums';
import { bishopLogic } from './PieceLogic/bishopLogic';
import { castleLogic } from './PieceLogic/castleLogic';
import { kingLogic } from './PieceLogic/kingLogic';
import { knightLogic } from './PieceLogic/knightLogic';
import { pawnLogic } from './PieceLogic/pawnRules';
import { queenLogic } from './PieceLogic/queenLogic';
import { rookLogic } from './PieceLogic/rockLogic';

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

    // getPossibleMove(board: Pieces[], type: PieceType) {
    //     let possibleMoves: Position[] = [];
    //     switch (type) {
    //         case 'PAWN':
    //             possibleMoves = getPawnPossibleMoves(board);
    //             break;
    //         case 'KING':
    //             possibleMoves = getKingPossibleMoves(board);
    //             break;
    //         case 'KNIGHT':
    //             possibleMoves = getKnightPossibleMoves(board);
    //             break;
    //         case 'QUEEN':
    //             possibleMoves = getQueenPossibleMoves(board);
    //             break;
    //         case 'BISHOP':
    //             possibleMoves = getBishopPossibleMoves(board);
    //             break;
    //         case 'ROCK':
    //             possibleMoves = getRockPossibleMoves(board);
    //             break;
    //     }
    //     return possibleMoves;
    // }
}
