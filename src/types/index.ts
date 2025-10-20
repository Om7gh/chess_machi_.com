import type { PieceType, Teams } from './enums';

export interface Position {
    x: number;
    y: number;
}

export interface Pieces {
    image: string;
    x: number;
    y: number;
    team: Teams;
    type: PieceType;
    isEmpassant?: boolean | undefined;
    isKingMoving?: boolean | undefined;
    isRookMoving?: boolean | undefined;
    possibleMoves?: Position[] | undefined;
    isCheckMate?: boolean | undefined;
}

export interface Props {
    checkmate: CheckMateProps;
    pieces: Pieces[];
    setPieces: React.Dispatch<React.SetStateAction<Pieces[]>>;
    setPromotionPending: (
        promotion: { piece: Pieces; newX: number; newY: number } | null
    ) => void;
}

export interface CheckMateProps {
    isCheckmate: boolean;
    winner: 'WHITE' | 'BLACK' | 'DRAW' | null;
}

export interface GameUIProps {
    myTeam: 'WHITE' | 'BLACK' | null;
    syncBoard: (
        board: Pieces[],
        currentTurn: 'WHITE' | 'BLACK',
        turns: number
    ) => void;
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

export type OnlineState = {
    roomId: string | null;
    myTeam: 'WHITE' | 'BLACK' | null;
    opponentConnected: boolean;
};

export type BoardUpdateData = {
    board: Pieces[];
    currentTurn: 'WHITE' | 'BLACK';
    turns: number;
    fromPlayer: 'WHITE' | 'BLACK';
};

export type ChatMessageData = {
    from: string;
    text: string;
    timestamp: string;
};
