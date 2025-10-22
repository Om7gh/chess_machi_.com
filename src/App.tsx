import { useOnlineChess } from './hooks/useOnlineChess';
import Referee from './components/Referee';

export default function App() {
    const {
        roomId,
        myTeam,
        opponentConnected,
        createRoom,
        joinRoom,
        syncBoard,
    } = useOnlineChess();

    return (
        <div className="App">
            <div className="grid place-items-center bg-slate-900/80 backdrop-blur-2xl h-screen">
                <div>
                    {!roomId && (
                        <div className="flex gap-8 items-center">
                            <button
                                onClick={createRoom}
                                className="px-5 py-2 rounded-xl text-xl font-bold bg-violet-500 text-slate-100"
                            >
                                Create Room
                            </button>
                            <p className="text-xl font-bold text-violet-500">
                                or
                            </p>
                            <div className="flex  gap-5 flex-col justify-center border-4 border-violet-400 p-4 rounded-2xl">
                                <p className="text-slate-200 text-xl">
                                    Join Room
                                </p>
                                <input
                                    className="text-xl px-4 py-2 text-slate-100 rounded-xl border-2 border-violet-400"
                                    placeholder="Room ID"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter')
                                            joinRoom(
                                                (e.target as HTMLInputElement)
                                                    .value
                                            );
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {roomId && (
                        <div className="flex flex-col gap-2">
                            <h3 className="text-slate-100 text-bold text-xl">
                                <span className="text-pink-400"> Room id</span>{' '}
                                : {roomId}
                            </h3>
                            <p className="text-slate-200 text-bold text-xl">
                                <span className="text-pink-400">my Team :</span>{' '}
                                {myTeam ? myTeam : 'waiting...'}
                            </p>
                            <p className="text-slate-100 text-xl">
                                <span className="text-pink-400">
                                    Opponent :
                                </span>{' '}
                                {opponentConnected
                                    ? '✅ Connected'
                                    : '⌛ Waiting...'}
                            </p>
                            <Referee
                                myTeam={myTeam}
                                syncBoard={syncBoard}
                                opponentConnected={opponentConnected}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
