// src/components/Referee/useCheckmate.ts
import { useEffect, useState } from 'react';
import type { CheckMateProps, Pieces } from '../types';
import { isCheckMate } from '../chessRules/PieceLogic/checkMate';

export function useCheckmate(pieces: Pieces[]) {
    const [checkMate, setCheckMate] = useState<CheckMateProps>({
        isCheckmate: false,
        winner: null,
    });

    useEffect(() => {
        const blackPieces = pieces.filter((p) => p.team === 'BLACK');
        const whitePieces = pieces.filter((p) => p.team === 'WHITE');

        setTimeout(() => {
            if (blackPieces[0] && isCheckMate(pieces, blackPieces[0].team))
                setCheckMate({ isCheckmate: true, winner: 'WHITE' });

            if (whitePieces[0] && isCheckMate(pieces, whitePieces[0].team))
                setCheckMate({ isCheckmate: true, winner: 'BLACK' });
        }, 0);
    }, [pieces]);

    return checkMate;
}
