import { Piece } from '../utils';

export default function CheckMate({
    winner,
}: {
    winner: 'WHITE' | 'BLACK' | 'DRAW' | null;
}) {
    if (winner === null) return <></>;

    if (winner === 'DRAW') {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0  flex justify-center items-center z-50 w-full m-auto">
                <div className="flex flex-col gap-10 justify-center items-center bg-slate-950/40 backdrop-blur-md rounded-lg w-[25vmax] py-8">
                    <p className="text-3xl font-bold text-shadow-current">
                        game is: <span>{winner}</span>
                    </p>
                </div>
            </div>
        );
    }

    const image = winner === 'WHITE' ? Piece('wK') : Piece('bK');
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0  flex justify-center items-center z-50 w-full m-auto">
            <div className="flex flex-col gap-10 justify-center items-center bg-slate-950/40 backdrop-blur-md rounded-lg w-[25vmax] py-8">
                <img src={image} alt={winner} className="w-30" />
                <p className="text-3xl font-bold text-shadow-current">
                    Winner is:{' '}
                    <span
                        className={
                            winner === 'BLACK'
                                ? 'text-slate-950'
                                : 'text-slate-100'
                        }
                    >
                        {winner}
                    </span>
                </p>
            </div>
        </div>
    );
}
