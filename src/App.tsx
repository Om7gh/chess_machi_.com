import { useState } from 'react';
import { useOnlineChess } from './hooks/useOnlineChess';
import Referee from './components/Referee';
import MiniChat from './components/MiniChat';
import { ToastContainer } from 'react-toastify';
import DevStatus from './components/DevStatus';

export default function App() {
    const {
        roomId,
        myTeam,
        opponentConnected,
        enterMatchmaking,
        leaveMatchmaking,
        syncBoard,
        isConnected,
        gameOver,
        clearRoom,
        rematch,
        requestRematch,
        acceptRematch,
        declineRematch,
    } = useOnlineChess();

    const [findingMatch, setFindingMatch] = useState(false);

    return (
        <div className="App">
            <div className="grid place-items-center bg-slate-900/80 backdrop-blur-2xl h-screen">
                <ToastContainer />
                <div>
                    {!isConnected && (
                        <p className="text-pink-500 text-lg font-bold">
                            Reconnecting to the server...
                        </p>
                    )}

                    {!roomId && isConnected && (
                        <div className="flex flex-col items-center gap-6">
                            {!findingMatch && (
                                <button
                                    onClick={() => {
                                        enterMatchmaking();
                                        setFindingMatch(true);
                                    }}
                                    className="px-6 py-3 rounded-lg text-lg font-semibold bg-violet-500 text-white hover:bg-violet-600 transition"
                                >
                                    Find Opponent
                                </button>
                            )}
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
                                    className="px-6 py-3 rounded-lg text-lg font-semibold bg-pink-500 text-white hover:bg-pink-600 transition"
                                >
                                    Cancel Matchmaking
                                </button>
                            )}
                        </div>
                    )}

                    {roomId && (
                        <div className="flex items-center gap-6">
                            <DevStatus
                                myTeam={myTeam}
                                opponentConnected={opponentConnected}
                                roomId={roomId}
                            />
                            <div className="flex  flex-col gap-5 items-start">
                                <div className="text-left">
                                    <h3 className="text-2xl font-bold text-white">
                                        Opponent ID:{' '}
                                        <span className="text-yellow-400">
                                            {opponentConnected
                                                ? 'Opponent'
                                                : 'Waiting...'}
                                        </span>
                                    </h3>
                                </div>
                                <Referee
                                    key={roomId}
                                    myTeam={myTeam}
                                    syncBoard={syncBoard}
                                    opponentConnected={opponentConnected}
                                    gameOver={gameOver}
                                    clearRoom={clearRoom}
                                    roomId={roomId}
                                    setFindingMatch={setFindingMatch}
                                    rematch={rematch}
                                    requestRematch={requestRematch}
                                    acceptRematch={acceptRematch}
                                    declineRematch={declineRematch}
                                />
                                <div className="text-left">
                                    <h3 className="text-2xl font-bold text-white">
                                        Your ID:{' '}
                                        <span className="text-blue-400">
                                            {roomId}
                                        </span>
                                    </h3>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 w-full justify-center">
                                <MiniChat />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
