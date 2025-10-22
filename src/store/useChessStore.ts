import { create } from 'zustand';

type Store = {
    turns: number;
    setTurns: () => void;
    currentTurn: 'WHITE' | 'BLACK';
    setCurrentTurn: () => void;
};

const useChessStore = create<Store>()((set) => ({
    currentTurn: 'WHITE',
    turns: 1,
    setTurns: () => set((state) => ({ turns: state.turns + 1 })),
    setCurrentTurn: () =>
        set((state) => ({
            currentTurn: state.currentTurn === 'WHITE' ? 'BLACK' : 'WHITE',
        })),
}));

export { useChessStore };
