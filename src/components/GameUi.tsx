// src/components/Referee/GameUI.tsx

import type { CheckMateProps, Pieces } from '../types';
import type { PieceType } from '../types/enums';
import Board from './Board';
import CheckMate from './CheckMate';
import PromotionModal from './PromotionModel';

interface GameUIProps {
    pieces: Pieces[];
    setPieces: React.Dispatch<React.SetStateAction<Pieces[]>>;
    checkMate: CheckMateProps;
    promotionPending: {
        piece: Pieces;
        newX: number;
        newY: number;
    } | null;
    setPromotionPending: React.Dispatch<
        React.SetStateAction<{
            piece: Pieces;
            newX: number;
            newY: number;
        } | null>
    >;
    handlePromotion: (type: PieceType) => void;
}

export default function GameUI({
    pieces,
    setPieces,
    checkMate,
    promotionPending,
    setPromotionPending,
    handlePromotion,
}: GameUIProps) {
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
