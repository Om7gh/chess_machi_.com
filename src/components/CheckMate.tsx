export default function CheckMate({
    winner,
    myTeam,
    onRestart,
}: {
    winner: 'WHITE' | 'BLACK' | 'DRAW' | null;
    myTeam: 'WHITE' | 'BLACK' | null;
    onRestart: () => void;
}) {
    if (winner === null) return <></>;

    if (winner === 'DRAW') {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0  flex justify-center items-center z-999 w-full m-auto">
                <div className="flex flex-col gap-10 justify-center items-center bg-slate-950/80 backdrop-blur-md rounded-lg w-[20vmax] py-8 text-slate-100">
                    <p className="text-3xl font-bold text-shadow-current">
                        stalmate
                    </p>
                    <p className="text-3xl font-bold text-shadow-current">
                        game is: <span>{winner}</span>
                    </p>
                </div>
                <button
                    className="bg-violet-400 px-4 py-2 rounded-lg text-slate-900 font-bold hover:bg-slate-900 hover:text-violet-400 transition-all duration-300"
                    onClick={onRestart}
                >
                    back to menu
                </button>
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
                                : 'text-pink-500'
                        }
                    >
                        {winning}
                    </span>
                </p>
                <div>
                    <button
                        className="bg-violet-400 px-4 py-2 rounded-lg text-slate-900 font-bold hover:bg-slate-900 hover:text-violet-400 transition-all duration-300"
                        onClick={onRestart}
                    >
                        Restart Game
                    </button>
                    <button>back to menu</button>
                </div>
            </div>
        </div>
    );
}
