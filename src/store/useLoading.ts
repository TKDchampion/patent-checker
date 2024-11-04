// useLoading.ts
import { create } from "zustand";
import { AnalysisResult } from "@/types/patentModel";

interface Status {
  type: string;
  message: string;
}

interface LoadingState {
  isCheck: boolean;
  isSave: boolean;
  isHistory: boolean;
  isCreateTable: boolean;
  status: Status | null;
  result: AnalysisResult | null;
  setLoading: (
    type: keyof Omit<
      LoadingState,
      | "setLoading"
      | "resetLoading"
      | "status"
      | "setStatus"
      | "result"
      | "setResult"
    >,
    value: boolean
  ) => void;
  resetLoading: () => void;
  setStatus: (status: Status | null) => void;
  setResult: (result: AnalysisResult | null) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  isCheck: false,
  isSave: false,
  isHistory: false,
  isCreateTable: true,
  status: null,
  result: null,
  setLoading: (type, value) =>
    set((state) => ({
      ...state,
      [type]: value,
    })),
  resetLoading: () =>
    set({
      status: null,
      result: null,
    }),
  setStatus: (status) => set({ status }),
  setResult: (result) => set({ result }),
}));

export default useLoadingStore;
