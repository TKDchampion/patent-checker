import { create } from "zustand";

interface LoadingState {
  isCheck: boolean;
  isSave: boolean;
  isHistory: boolean;
  isCreateTable: boolean;
  setLoading: (
    type: keyof Omit<LoadingState, "setLoading" | "resetLoading">,
    value: boolean
  ) => void;
  resetLoading: () => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  isCheck: false,
  isSave: false,
  isHistory: false,
  isCreateTable: true,
  setLoading: (type, value) =>
    set((state) => ({
      ...state,
      [type]: value,
    })),
  resetLoading: () =>
    set({
      isCheck: false,
      isSave: false,
      isHistory: false,
      isCreateTable: false,
    }),
}));

export default useLoadingStore;
