import { useEffect, useState } from 'react';
import { chessSocket } from '../classes/chessWebsocket';
import { useChessStore } from '../store/useChessStore';
import { toast } from 'react-toastify';
import type { ChatMessageData, Pieces } from '../types';
import type { BoardUpdateData } from '../types';

interface OnlineState {
    roomId: string | null;
    myTeam: 'WHITE' | 'BLACK' | null;
    opponentConnected: boolean;
    gameOver: { winner: string; message: string } | null;
    rematch: {
        incomingOffer: boolean;
        requested: boolean;
        declined: boolean;
    };
}

export function useOnlineChess() {
    // Suppress stale gameOver messages while matchmaking between games
    const suppressGameOverRef = { current: false } as { current: boolean };
    const [state, setState] = useState<OnlineState>({
        roomId: null,
        myTeam: null,
        opponentConnected: false,
        gameOver: null,
        rematch: { incomingOffer: false, requested: false, declined: false },
    });

    useEffect(() => {
        chessSocket.connect('ws://localhost:9000/game/chess');

        chessSocket.on('connected', () => {
            console.log('✅ Connected to server');
            setState((prev) => ({ ...prev }));
        });

        chessSocket.on(
            'roomCreated',
            ({
                roomId,
                myTeam,
            }: {
                roomId: string | null;
                myTeam: 'WHITE' | 'BLACK' | null;
            }) => {
                // Reset online state for a fresh game session
                setState({
                    roomId,
                    myTeam,
                    opponentConnected: false,
                    gameOver: null,
                    rematch: {
                        incomingOffer: false,
                        requested: false,
                        declined: false,
                    },
                });
                // Reset global turn state for a new game
                useChessStore.setState({ currentTurn: 'WHITE', turns: 1 });
                suppressGameOverRef.current = false;
            }
        );

        chessSocket.on(
            'gameStart',
            ({
                myTeam,
                opponentConnected,
                roomId,
            }: {
                myTeam: 'WHITE' | 'BLACK' | 'DRAW' | null; // tolerate variations
                opponentConnected: boolean;
                roomId: string;
            }) => {
                setState((prev) => ({
                    ...prev,
                    myTeam:
                        myTeam === 'WHITE' || myTeam === 'BLACK'
                            ? myTeam
                            : prev.myTeam,
                    opponentConnected,
                    roomId: roomId ?? prev.roomId,
                    gameOver: null,
                    rematch: {
                        incomingOffer: false,
                        requested: false,
                        declined: false,
                    },
                }));
                // Ensure turns reset at the start of every new game
                useChessStore.setState({ currentTurn: 'WHITE', turns: 1 });
                suppressGameOverRef.current = false;
            }
        );

        chessSocket.on('boardUpdate', (data: BoardUpdateData) => {
            window.dispatchEvent(
                new CustomEvent('syncBoard', { detail: data })
            );
        });

        chessSocket.on('chatMessage', (data: ChatMessageData) => {
            window.dispatchEvent(
                new CustomEvent('chatMessage', { detail: data })
            );
        });

        chessSocket.on('opponentDisconnected', () => {
            setState((prev) => ({ ...prev, opponentConnected: false }));
            toast.error('Opponent disconnected', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });

        chessSocket.on('disconnected', () => {
            toast.warn(
                'You have been disconnected. Attempting to reconnect...',
                {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );

            setState((prev) => ({ ...prev }));

            setTimeout(() => {
                chessSocket.reconnect('ws://localhost:9000/game/chess');
            }, 1000);
        });

        chessSocket.on('error', (msg: string) => {
            console.error('Server error:', msg);
        });

        chessSocket.on(
            'gameOver',
            ({ winner, message }: { winner: string; message: string }) => {
                if (suppressGameOverRef.current) {
                    console.log(
                        'Suppressing stale gameOver during matchmaking'
                    );
                    return;
                }
                setState((prev) => ({
                    ...prev,
                    gameOver: { winner, message },
                }));
                toast.info(`Game Over! ${message}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        );

        chessSocket.on('enterMatchmaking', () => {
            console.log('enterMatchmaking event received');
            setState((prev) => {
                const newState = {
                    ...prev,
                    gameOver: null,
                    rematch: {
                        incomingOffer: false,
                        requested: false,
                        declined: false,
                    },
                };
                return newState;
            });
            suppressGameOverRef.current = true;
        });

        chessSocket.on('rematchOffer', () => {
            setState((prev) => ({
                ...prev,
                rematch: {
                    incomingOffer: true,
                    requested: false,
                    declined: false,
                },
            }));
        });

        chessSocket.on('rematchPending', () => {
            setState((prev) => ({
                ...prev,
                rematch: {
                    incomingOffer: false,
                    requested: true,
                    declined: false,
                },
            }));
        });

        chessSocket.on('rematchDeclined', () => {
            setState((prev) => ({
                ...prev,
                rematch: {
                    incomingOffer: false,
                    requested: false,
                    declined: true,
                },
            }));
        });

        return () => {
            chessSocket.off('connected');
            chessSocket.off('roomCreated');
            chessSocket.off('gameStart');
            chessSocket.off('boardUpdate');
            chessSocket.off('chatMessage');
            chessSocket.off('opponentDisconnected');
            chessSocket.off('disconnected');
            chessSocket.off('gameOver');
            chessSocket.off('enterMatchmaking');
            chessSocket.off('rematchOffer');
            chessSocket.off('rematchPending');
            chessSocket.off('rematchDeclined');
            chessSocket.off('error');
        };
    }, []);

    const enterMatchmaking = () => chessSocket.matchmaking();
    const leaveMatchmaking = () => chessSocket.leaveMatchmaking();
    const syncBoard = (
        board: Pieces[],
        currentTurn: 'WHITE' | 'BLACK',
        turns: number
    ) => chessSocket.syncBoard(board, currentTurn, turns);
    const sendChat = (text: string) => chessSocket.sendChat(text);
    const requestRematch = () => {
        // optimistic UI update
        setState((prev) => ({
            ...prev,
            rematch: { incomingOffer: false, requested: true, declined: false },
        }));
        chessSocket.requestRematch();
    };
    const acceptRematch = () => {
        setState((prev) => ({
            ...prev,
            rematch: { incomingOffer: false, requested: true, declined: false },
        }));
        chessSocket.acceptRematch();
    };
    const declineRematch = () => {
        setState((prev) => ({
            ...prev,
            rematch: { incomingOffer: false, requested: false, declined: true },
        }));
        chessSocket.declineRematch();
    };

    const clearRoom = () => {
        // Clear current room and reset online/gameOver state
        setState((prev) => ({
            ...prev,
            roomId: null,
            gameOver: null,
            opponentConnected: false,
        }));
        // Also reset global turn state so next match starts clean
        useChessStore.setState({ currentTurn: 'WHITE', turns: 1 });
    };

    return {
        ...state,
        enterMatchmaking,
        leaveMatchmaking,
        syncBoard,
        sendChat,
        isConnected: chessSocket.isConnected(),
        clearRoom,
        rematch: state.rematch,
        requestRematch,
        acceptRematch,
        declineRematch,
    };
}
