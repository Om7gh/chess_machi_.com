import { HORIZONTAL_AXIS, VERTICAL_AXIS } from '.';
import Tile from '../components/Tile';
import type { Position } from '../types';
import type { Teams } from '../types/enums';

interface Piece {
    x: number;
    y: number;
    image: string;
    possibleMoves?: Position[];
    team: Teams;
}

interface Props {
    pieces: Piece[];
    activePieceCoords: {
        x: number;
        y: number;
    } | null;
    turns: number;
}

const boardTile = ({ pieces, activePieceCoords, turns }: Props) => {
    const board = [];
    for (let x = VERTICAL_AXIS.length - 1; x >= 0; x--) {
        for (let y = 0; y < HORIZONTAL_AXIS.length; y++) {
            let image = undefined;
            const currentPiece = pieces.find(
                (p) =>
                    p.x === activePieceCoords?.x && p.y === activePieceCoords?.y
            );

            let highlight = currentPiece?.possibleMoves
                ? currentPiece.possibleMoves.some((p) => p.x === x && p.y === y)
                : false;

            if (currentPiece?.team === 'WHITE' && turns % 2 === 0)
                highlight = false;

            if (currentPiece?.team === 'BLACK' && turns % 2 === 1)
                highlight = false;

            image = pieces.find((p) => p.x === x && p.y === y)?.image;

            board.push(
                <Tile
                    piece={image}
                    file={x}
                    rank={y}
                    key={`${x}-${y}`}
                    highlight={highlight}
                />
            );
        }
    }

    return board;
};

export { boardTile };
