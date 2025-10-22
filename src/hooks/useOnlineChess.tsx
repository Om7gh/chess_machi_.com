import { useEffect, useState } from 'react';
import { chessSocket } from '../classes/chessWebsocket';
import type {
    BoardUpdateData,
    ChatMessageData,
    OnlineState,
    Pieces,
} from '../types';

export function useOnlineChess() {
    const [state, setState] = useState<OnlineState>({
        roomId: null,
        myTeam: null,
        opponentConnected: false,
    });

    useEffect(() => {
        chessSocket.connect('ws://localhost:9000/game/chess');

        chessSocket.on('connected', () => {
            console.log('✅ Connected to server');
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
                setState({ roomId, myTeam, opponentConnected: false });
            }
        );

        chessSocket.on(
            'gameStart',
            ({
                myTeam,
                opponentConnected,
                roomId,
            }: {
                myTeam: 'WHITE' | 'BLACK' | null;
                opponentConnected: boolean;
                roomId: string;
            }) => {
                setState((prev) => ({
                    ...prev,
                    myTeam,
                    opponentConnected,
                    roomId: roomId ?? prev.roomId,
                }));
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
            alert('Opponent disconnected');
        });

        chessSocket.on('error', (msg: string) => {
            console.error('Server error:', msg);
        });

        return () => {
            chessSocket.off('connected');
            chessSocket.off('roomCreated');
            chessSocket.off('gameStart');
            chessSocket.off('boardUpdate');
            chessSocket.off('chatMessage');
            chessSocket.off('opponentDisconnected');
            chessSocket.off('error');
        };
    }, []);

    const createRoom = () => chessSocket.createRoom();
    const joinRoom = (roomId: string) => chessSocket.joinRoom(roomId);
    const syncBoard = (
        board: Pieces[],
        currentTurn: 'WHITE' | 'BLACK',
        turns: number
    ) => chessSocket.syncBoard(board, currentTurn, turns);
    const sendChat = (text: string) => chessSocket.sendChat(text);

    return {
        ...state,
        createRoom,
        joinRoom,
        syncBoard,
        sendChat,
        isConnected: chessSocket.isConnected(),
    };
}
