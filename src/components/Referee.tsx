import { useCallback, useEffect, useState } from 'react';
import type { CheckMateProps, Pieces } from '../types';
import PromotionModal from '../utils/PromotionModel';
import Board from './Board';
import { Piece } from '../utils';
import type { PieceType } from '../types/enums';
import { initBoard } from '../utils/initBoard';
import CheckMate from './CheckMate';
import { isKingInCheck } from '../chessRules/PieceLogic/kingLogic';


export default function Referee({}) {
    const [pieces, setPieces] = useState<Pieces[]>(initBoard);
    const [checkMate, setCheckMate] = useState<CheckMateProps>({isChekmate: false, winner: null});
    const [promotionPending, setPromotionPending] = useState<{
        piece: Pieces;
        newX: number;
        newY: number;
    } | null>(null);

    const checkForCheckmate = useCallback((board: Pieces[]) => {
      const allPiecesHaveMoves = board.every((p) => p.possibleMoves !== undefined);
      if (!allPiecesHaveMoves) return;

      const opponentPieces = board.filter((p) => p.team === "OPPONENT");
      const myPieces = board.filter((p) => p.team === "ME");
      const oppKing = opponentPieces.find(p => p.type === "KING");
      const myKing = myPieces.find(p => p.type === "KING");

      const opponentHasMove = opponentPieces.some((p) => p.possibleMoves?.length);
      const myHasMove = myPieces.some((p) => p.possibleMoves?.length);

      if (oppKing && !opponentHasMove && isKingInCheck(oppKing.team, board, oppKing.x, oppKing.y))
        setCheckMate({ isChekmate: true, winner: "WHITE" });
      else if (myKing && !myHasMove && isKingInCheck(myKing.team, board, myKing.x, myKing.y))
        setCheckMate({ isChekmate: true, winner: "BLACK" });
    }, [setCheckMate]);

    useEffect(() => {
      checkForCheckmate(pieces);
    }, [pieces, checkForCheckmate]);

    const handlePromotion = (promotionType: PieceType) => {
        if (!promotionPending) return;
        const { piece, newX, newY } = promotionPending;

        setPieces((prevPieces) => {
            const updatedPieces = prevPieces
                .map((p) => ({
                    ...p,
                    isEmpassant: false,
                }))
                .filter((p) => {
                    if (p.x === piece.x && p.y === piece.y) {
                        return false;
                    }
                    if (p.x === newX && p.y === newY && p.team !== piece.team) {
                        return false;
                    }
                    return true;
                });

            let pieceImage;
            const pieceType = piece.team === 'ME' ? 0 : 1;

            switch (promotionType) {
                case 'QUEEN':
                    pieceImage = pieceType === 0 ? Piece('wQ') : Piece('bQ');
                    break;
                case 'ROCK':
                    pieceImage = pieceType === 0 ? Piece('wR') : Piece('bR');
                    break;
                case 'BISHOP':
                    pieceImage = pieceType === 0 ? Piece('wB') : Piece('bB');
                    break;
                case 'KNIGHT':
                    pieceImage = pieceType === 0 ? Piece('wN') : Piece('bN');
                    break;
                default:
                    console.log('invalid piece');
            }

            return [
                ...updatedPieces,
                {
                    ...piece,
                    x: newX,
                    y: newY,
                    type: promotionType,
                    isEmpassant: false,
                    image: pieceImage,
                },
            ];
        });

        setPromotionPending(null);
    };

    return (
        <>
        {checkMate.isChekmate && <CheckMate winner={checkMate.winner}  />}
            <Board
                pieces={pieces}
                setPieces={setPieces}
                setPromotionPending={setPromotionPending}
                checkmate={checkMate}
                checkForCheckmate={checkForCheckmate}
            />
            {promotionPending && (
                <PromotionModal
                    team={promotionPending.piece.team}
                    onSelect={handlePromotion}
                />
            )}
        </>
    );
}
