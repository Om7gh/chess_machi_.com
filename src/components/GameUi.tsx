// src/components/Referee/GameUI.tsx

import type { GameUIProps } from '../types';
import Board from './Board';
import CheckMate from './CheckMate';
import PromotionModal from './PromotionModel';

export default function GameUI({
    pieces,
    setPieces,
    checkMate,
    promotionPending,
    setPromotionPending,
    handlePromotion,
    syncBoard,
    myTeam,
    opponentConnected,
}: GameUIProps) {
    return (
        <>
            {checkMate.isCheckmate && <CheckMate winner={checkMate.winner} />}
            <Board
                pieces={pieces}
                setPieces={setPieces}
                setPromotionPending={setPromotionPending}
                checkmate={checkMate}
                syncBoard={syncBoard}
                myTeam={myTeam}
                opponentConnected={opponentConnected}
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
