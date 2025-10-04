import type { PieceType, Teams } from './enums';

export interface Pieces {
    image: string;
    x: number;
    y: number;
    team: Teams;
    type: PieceType;
    isEmpassant?: boolean | undefined;
    isKingMoving?: boolean | undefined;
    isRookMoving?: boolean | undefined;
}

export interface Position {
    x: number;
    y: number;
}
