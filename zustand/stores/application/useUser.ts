import { Restaurant } from "@prisma/client";
import { create } from "zustand";

interface UserStore {
  userId: number;
  setUserId: (id: number) => void;
  rankingId: number;
  setRankingId: (id: number) => void;
}

export const useUser = create<UserStore>()((set) => ({
  userId: -1,
  setUserId: (id) => set({ userId: id }),
  rankingId: -1,
  setRankingId: (id) => set({ rankingId: id }),
}));
