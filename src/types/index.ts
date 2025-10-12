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
    checkForCheckmate: (board: Pieces[]) => void;
    checkmate: CheckMateProps;
    pieces: Pieces[];
    setPieces: React.Dispatch<React.SetStateAction<Pieces[]>>;
    setPromotionPending: (
        promotion: { piece: Pieces; newX: number; newY: number } | null
    ) => void;
}

export interface CheckMateProps {
    isChekmate: boolean;
    winner: "WHITE" | "BLACK" | null
}
