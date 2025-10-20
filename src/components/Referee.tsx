import { useState } from 'react';
import type { Pieces } from '../types';
import { initBoard } from '../utils/initBoard';
import { useCheckmate } from '../hooks/useCheckmate';
import { usePromotion } from '../hooks/usePromotion';
import GameUI from './GameUi';

export default function Referee({
    myTeam,
    syncBoard,
}: {
    myTeam: 'WHITE' | 'BLACK' | null;
    syncBoard: (
        board: Pieces[],
        currentTurn: 'WHITE' | 'BLACK',
        turns: number
    ) => void;
}) {
    const [pieces, setPieces] = useState<Pieces[]>(initBoard);
    const checkMate = useCheckmate(pieces);
    const { promotionPending, setPromotionPending, handlePromotion } =
        usePromotion(setPieces);

    return (
        <>
            <GameUI
                pieces={pieces}
                setPieces={setPieces}
                checkMate={checkMate}
                promotionPending={promotionPending}
                setPromotionPending={setPromotionPending}
                handlePromotion={handlePromotion}
                syncBoard={syncBoard}
                myTeam={myTeam}
            />
        </>
    );
}
