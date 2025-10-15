import type { Pieces } from '../../types';
import type { Teams } from '../../types/enums';
import { isKingInCheck } from './kingProtection';

const isCheckMate = (board: Pieces[], team: Teams): boolean => {
  const king = board.find((p) => p.type === 'KING' && p.team === team);
  if (!king) return false;
  if (!isKingInCheck(king.team, board, king.x, king.y)) return false;

  const kingArmy = board.filter((p) => p.team === team);

  for (const piece of kingArmy) {
    if (piece.type === 'KING') console.log(piece.possibleMoves);
    for (const move of piece.possibleMoves!) {
      if (move) return false;
    }
  }

  return true;
};

export { isCheckMate };
