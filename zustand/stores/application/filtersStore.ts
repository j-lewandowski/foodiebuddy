import { create } from "zustand";

interface FiltersStore {
  rankingFilter: string | null;
  setRankingFilter: (ranking: string | null) => void;
}

export const useFilters = create<FiltersStore>((set) => ({
  rankingFilter: null,
  setRankingFilter: (ranking) => set({ rankingFilter: ranking }),
}));
