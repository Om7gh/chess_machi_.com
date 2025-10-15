import { useEffect, useState } from 'react';
import type { CheckMateProps, Pieces } from '../types';
import PromotionModal from '../utils/PromotionModel';
import { Piece } from '../utils';
import type { PieceType } from '../types/enums';
import { initBoard } from '../utils/initBoard';
import CheckMate from './CheckMate';
import Board from './Board';
import { isCheckMate } from '../chessRules/PieceLogic/checkMate';

export default function Referee({}) {
  const [pieces, setPieces] = useState<Pieces[]>(initBoard);
  const [checkMate, setCheckMate] = useState<CheckMateProps>({
    isCheckmate: false,
    winner: null,
  });
  const [promotionPending, setPromotionPending] = useState<{
    piece: Pieces;
    newX: number;
    newY: number;
  } | null>(null);

  useEffect(() => {
    const opponentPiece = pieces.filter((p) => p.team === 'OPPONENT');
    const myPieces = pieces.filter((p) => p.team === 'ME');
    setTimeout(() => {
      if (isCheckMate(pieces, opponentPiece[0].team))
        setCheckMate({ isCheckmate: true, winner: 'WHITE' });
      if (isCheckMate(pieces, myPieces[0].team))
        setCheckMate({ isCheckmate: true, winner: 'BLACK' });
    }, 0);
  }, [pieces]);

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
          pieceImage = undefined;
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
      {checkMate.isCheckmate && <CheckMate winner={checkMate.winner} />}
      <Board
        pieces={pieces}
        setPieces={setPieces}
        setPromotionPending={setPromotionPending}
        checkmate={checkMate}
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
