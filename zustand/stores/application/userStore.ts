import { Restaurant } from "@prisma/client";
import { create } from "zustand";

interface UserStore {
  rankingId: string;
  setRankingId: (id: string) => void;
}

export const useUser = create<UserStore>()((set) => ({
  rankingId: "",
  setRankingId: (id) => set({ rankingId: id }),
}));
