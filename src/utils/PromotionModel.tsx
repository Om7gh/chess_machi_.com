import { Piece } from '.';
import { PieceType, type Teams } from '../types/enums';

const PromotionModal = ({
    team,
    onSelect,
}: {
    team: Teams;
    onSelect: (pieceType: PieceType) => void;
}) => {
    const promotionPieces: PieceType[] = [
        PieceType.QUEEN,
        PieceType.ROCK,
        PieceType.BISHOP,
        PieceType.KNIGHT,
    ];

    const teamType = team === 'ME' ? 0 : 1;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-900/50 flex justify-center items-center z-50 w-full m-auto">
            <div className="flex justify-evenly bg-violet-700/80 backdrop:backdrop-blur-3xl w-[40vmax] py-8">
                {promotionPieces.map((pieceType) => {
                    let pieceImage;
                    switch (pieceType) {
                        case 'QUEEN':
                            pieceImage =
                                teamType === 0 ? Piece('wQ') : Piece('bQ');
                            break;
                        case 'ROCK':
                            pieceImage =
                                teamType === 0 ? Piece('wR') : Piece('bR');
                            break;
                        case 'BISHOP':
                            pieceImage =
                                teamType === 0 ? Piece('wB') : Piece('bB');
                            break;
                        case 'KNIGHT':
                            pieceImage =
                                teamType === 0 ? Piece('wN') : Piece('bN');
                            break;
                        default:
                            console.log('invalid piece');
                    }
                    return (
                        <button
                            key={pieceType}
                            onClick={() => onSelect(pieceType)}
                        >
                            <img
                                src={pieceImage}
                                alt={pieceType}
                                style={{ width: '50px', height: '50px' }}
                                onError={(e) => {
                                    (
                                        e.target as HTMLImageElement
                                    ).style.display = 'none';
                                }}
                            />
                            <div>{pieceType}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PromotionModal;
