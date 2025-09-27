import type { Pieces } from '../types';

export const VERTICAL_AXIS = new Array(8).fill(0).map((_, i) => i + 1);
export const HORIZONTAL_AXIS = new Array(8)
    .fill(0)
    .map((_, i) => String.fromCharCode(i + 97));

export const Piece = (type: string): string => {
    return `assets/piece/fantasy/${type}.svg`;
};

export const pushRocks = (piece: Pieces[]) => {
    piece.push({ image: Piece('bR'), x: 0, y: 0 });
    piece.push({ image: Piece('bR'), x: 7, y: 0 });
    piece.push({ image: Piece('wR'), x: 0, y: 7 });
    piece.push({ image: Piece('wR'), x: 7, y: 7 });
};

export const pushKnight = (piece: Pieces[]) => {
    piece.push({ image: Piece('bN'), x: 1, y: 0 });
    piece.push({ image: Piece('bN'), x: 6, y: 0 });
    piece.push({ image: Piece('wN'), x: 1, y: 7 });
    piece.push({ image: Piece('wN'), x: 6, y: 7 });
};

export const pushPishop = (piece: Pieces[]) => {
    piece.push({ image: Piece('bB'), x: 2, y: 0 });
    piece.push({ image: Piece('bB'), x: 5, y: 0 });
    piece.push({ image: Piece('wB'), x: 2, y: 7 });
    piece.push({ image: Piece('wB'), x: 5, y: 7 });
};

export const pushKQ = (piece: Pieces[]) => {
    piece.push({ image: Piece('bQ'), x: 3, y: 0 });
    piece.push({ image: Piece('bK'), x: 4, y: 0 });
    piece.push({ image: Piece('wQ'), x: 3, y: 7 });
    piece.push({ image: Piece('wK'), x: 4, y: 7 });
};
