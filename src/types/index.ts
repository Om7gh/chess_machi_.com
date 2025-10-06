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
    possbileCastle?: boolean | undefined;
}
