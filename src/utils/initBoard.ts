// initBoard.ts
import { Piece, pushKnight, pushKQ, pushPishop, pushRocks } from '.';
import type { Pieces } from '../types';

const initBoard = () => {
    const initBoardState: Pieces[] = [];

    for (let i = 0; i < 8; i++) {
        initBoardState.push({ image: Piece('bP'), x: i, y: 1 });
    }

    for (let i = 0; i < 8; i++) {
        initBoardState.push({ image: Piece('wP'), x: i, y: 6 });
    }

    pushRocks(initBoardState);
    pushKnight(initBoardState);
    pushPishop(initBoardState);
    pushKQ(initBoardState);
    return initBoardState;
};

export { initBoard };
