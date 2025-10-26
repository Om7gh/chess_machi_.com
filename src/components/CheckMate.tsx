export default function CheckMate({
    winner,
    myTeam,
}: {
    winner: 'WHITE' | 'BLACK' | 'DRAW' | null;
    myTeam: 'WHITE' | 'BLACK' | null;
}) {
    if (winner === null) return <></>;

    if (winner === 'DRAW') {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0  flex justify-center items-center z-50 w-full m-auto">
                <div className="flex flex-col gap-10 justify-center items-center bg-slate-950/40 backdrop-blur-md rounded-lg w-[25vmax] py-8">
                    <p className="text-3xl font-bold text-shadow-current">
                        stalmate
                    </p>
                    <p className="text-3xl font-bold text-shadow-current">
                        game is: <span>{winner}</span>
                    </p>
                </div>
                <button>rematch</button>
            </div>
        );
    }

    const winning =
        winner === 'WHITE' && myTeam === 'WHITE'
            ? 'you win'
            : winner === 'BLACK' && myTeam === 'BLACK'
            ? 'you win'
            : 'you lose';
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0  flex justify-center items-center z-9999 w-full m-auto">
            <div className="flex flex-col gap-10 justify-center items-center bg-slate-950/40 backdrop-blur-md rounded-lg w-[20vmax] py-8 text-center">
                <p className="text-3xl font-bold text-shadow-current">
                    <p className="text-3xl font-bold text-shadow-current text-slate-100">
                        Checkmate
                    </p>
                    <span
                        className={
                            winning === 'you win'
                                ? 'text-teal-500'
                                : 'text-red-500'
                        }
                    >
                        {winning}
                    </span>
                </p>
                <button className="text-slate-100 bg-slate-900 px-4 py-2 rounded-lg text-xl">
                    rematch
                </button>
            </div>
        </div>
    );
}
