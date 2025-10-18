import { create } from 'zustand';

type Store = {
    turns: number;
    setTurns: () => void;
};

const useChessStore = create<Store>()((set) => ({
    turns: 1,
    setTurns: () => set((state) => ({ turns: state.turns + 1 })),
}));

export { useChessStore };
