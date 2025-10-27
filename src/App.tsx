import { useState } from 'react';
import { useOnlineChess } from './hooks/useOnlineChess';
import Referee from './components/Referee';
import MiniChat from './components/MiniChat';
import PlayedMoves from './components/PlayedMoves';

export default function App() {
    const {
        roomId,
        myTeam,
        opponentConnected,
        enterMatchmaking,
        leaveMatchmaking,
        syncBoard,
    } = useOnlineChess();

    const [findingMatch, setFindingMatch] = useState(false);

    return (
        <div className="App">
            <div className="grid place-items-center bg-slate-900/80 backdrop-blur-2xl h-screen">
                <div>
                    {!roomId && (
                        <div className="flex flex-col items-center gap-6">
                            <button
                                onClick={() => {
                                    enterMatchmaking();
                                    setFindingMatch(true);
                                }}
                                className="px-6 py-3 rounded-lg text-lg font-semibold bg-green-500 text-white hover:bg-green-600 transition"
                            >
                                Find Opponent
                            </button>
                            {findingMatch && (
                                <p className="text-yellow-400 text-lg">
                                    Finding a match...
                                </p>
                            )}
                            {findingMatch && (
                                <button
                                    onClick={() => {
                                        leaveMatchmaking();
                                        setFindingMatch(false);
                                    }}
                                    className="px-6 py-3 rounded-lg text-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition"
                                >
                                    Cancel Matchmaking
                                </button>
                            )}
                        </div>
                    )}

                    {roomId && (
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white">
                                    Room ID:{' '}
                                    <span className="text-yellow-400">
                                        {roomId}
                                    </span>
                                </h3>
                                <p className="text-lg text-gray-300">
                                    Team:{' '}
                                    <span className="text-blue-400">
                                        {myTeam || 'Waiting...'}
                                    </span>
                                </p>
                                <p className="text-lg text-gray-300">
                                    Opponent:{' '}
                                    {opponentConnected ? (
                                        <span className="text-green-400">
                                            Connected
                                        </span>
                                    ) : (
                                        <span className="text-red-400">
                                            Waiting...
                                        </span>
                                    )}
                                </p>
                            </div>
                            <Referee
                                myTeam={myTeam}
                                syncBoard={syncBoard}
                                opponentConnected={opponentConnected}
                            />
                            <div className="flex gap-6 w-full justify-center">
                                <PlayedMoves />
                                <MiniChat />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
