import { HORIZONTAL_AXIS, VERTICAL_AXIS } from '../utils';

export default function Tile({
    file,
    rank,
    piece,
}: {
    file: number;
    rank: number;
    piece: string | undefined;
}) {
    const isLight = (rank + file) % 2 === 1;
    const tileId = `${HORIZONTAL_AXIS[file]}${VERTICAL_AXIS[rank]}`;

    const baseStyles = 'w-full h-full flex items-center justify-center';

    const lightTileStyle =
        'bg-[radial-gradient(circle_at_center,theme(colors.violet.900),theme(colors.violet.500))]';
    const darkTileStyle =
        'bg-[radial-gradient(circle_at_center,theme(colors.slate.600),theme(colors.slate.900))]';

    return (
        <div
            key={tileId}
            className={`${baseStyles} ${
                isLight ? lightTileStyle : darkTileStyle
            }`}
        >
            {piece && (
                <div
                    className="w-4/5 h-4/5 bg-contain bg-center bg-no-repeat cursor-grab piece"
                    style={{ backgroundImage: `url('${piece}')` }}
                />
            )}
        </div>
    );
}
