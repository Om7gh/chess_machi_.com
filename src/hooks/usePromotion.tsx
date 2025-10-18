import { useState } from 'react';
import type { Pieces } from '../types';
import type { PieceType } from '../types/enums';
import { Piece } from '../utils';

export function usePromotion(
    setPieces: React.Dispatch<React.SetStateAction<Pieces[]>>
) {
    const [promotionPending, setPromotionPending] = useState<{
        piece: Pieces;
        newX: number;
        newY: number;
    } | null>(null);

    const handlePromotion = (promotionType: PieceType) => {
        if (!promotionPending) return;
        const { piece, newX, newY } = promotionPending;

        setPieces((prevPieces) => {
            const updatedPieces = prevPieces
                .map((p) => ({ ...p, isEmpassant: false }))
                .filter((p) => {
                    if (p.x === piece.x && p.y === piece.y) return false;
                    if (p.x === newX && p.y === newY && p.team !== piece.team)
                        return false;
                    return true;
                });

            const isWhite = piece.team === 'WHITE';
            let pieceImage;
            switch (promotionType) {
                case 'QUEEN':
                    pieceImage = isWhite ? Piece('wQ') : Piece('bQ');
                    break;
                case 'ROCK':
                    pieceImage = isWhite ? Piece('wR') : Piece('bR');
                    break;
                case 'BISHOP':
                    pieceImage = isWhite ? Piece('wB') : Piece('bB');
                    break;
                case 'KNIGHT':
                    pieceImage = isWhite ? Piece('wN') : Piece('bN');
                    break;
                default:
                    pieceImage = undefined;
                    console.warn('Invalid promotion piece');
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
                } as Pieces,
            ];
        });

        setPromotionPending(null);
    };

    return { promotionPending, setPromotionPending, handlePromotion };
}
