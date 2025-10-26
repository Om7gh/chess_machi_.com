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
    myTeam: 'WHITE' | 'BLACK' | null;
}

const boardTile = ({ pieces, activePieceCoords, myTeam }: Props) => {
    const board = [];
    for (let x = VERTICAL_AXIS.length - 1; x >= 0; x--) {
        for (let y = 0; y < HORIZONTAL_AXIS.length; y++) {
            let image = undefined;
            // map display coordinates (x,y) to canonical board coords
            const boardX = myTeam === 'BLACK' ? 7 - x : x;
            const boardY = myTeam === 'BLACK' ? 7 - y : y;

            const currentPiece = pieces.find(
                (p) =>
                    p.x === activePieceCoords?.x && p.y === activePieceCoords?.y
            );

            let highlight = currentPiece?.possibleMoves
                ? currentPiece.possibleMoves.some(
                      (p) => p.x === boardX && p.y === boardY
                  )
                : false;

            image = pieces.find((p) => p.x === boardX && p.y === boardY)?.image;

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
