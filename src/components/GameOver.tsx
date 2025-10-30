interface GameOverProps {
    winner: string;
    onRestart: () => void;
    rematch: { incomingOffer: boolean; requested: boolean; declined: boolean };
    requestRematch: () => void;
    acceptRematch: () => void;
    declineRematch: () => void;
}

const GameOver = ({
    winner,
    onRestart,
    rematch,
    requestRematch,
    acceptRematch,
    declineRematch,
}: GameOverProps) => {
    const getMessage = () => {
        if (winner === 'DRAW') return "It's a draw!";
        return `${winner}   wins the game`;
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0  flex justify-center items-center z-999 w-full text-center m-auto">
            <div className="flex flex-col gap-10 justify-center items-center bg-slate-950/80 backdrop-blur-md rounded-lg w-[20vmax] py-8">
                <h2 className="text-slate-100 text-xl">{getMessage()}</h2>
                <div className="flex flex-col gap-3 w-full px-6">
                    {rematch.incomingOffer ? (
                        <div className="flex gap-3 justify-center">
                            <button
                                className="bg-violet-400 px-4 py-2 rounded-lg text-slate-900 font-bold hover:bg-violet-500 transition-all duration-300"
                                onClick={acceptRematch}
                            >
                                Accept rematch
                            </button>
                            <button
                                className="bg-pink-500 px-4 py-2 rounded-lg text-slate-100 font-bold hover:bg-pink-600 transition-all duration-300"
                                onClick={declineRematch}
                            >
                                Decline
                            </button>
                        </div>
                    ) : rematch.requested ? (
                        <p className="text-yellow-300">
                            Rematch requested… waiting for opponent
                        </p>
                    ) : rematch.declined ? (
                        <p className="text-pink-400">
                            Opponent declined your rematch
                        </p>
                    ) : (
                        <button
                            className="bg-violet-400 px-4 py-2 rounded-lg text-slate-900 font-bold hover:bg-violet-500 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={requestRematch}
                            disabled={rematch.requested}
                        >
                            {rematch.requested
                                ? 'Rematch requested…'
                                : 'Offer rematch'}
                        </button>
                    )}
                    <button
                        className="bg-slate-200/80 px-4 py-2 rounded-lg text-slate-900 font-bold hover:bg-slate-900 hover:text-slate-100 transition-all duration-300"
                        onClick={onRestart}
                    >
                        Back to menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
