/* eslint-disable @typescript-eslint/no-explicit-any */
import { setError } from "@/utils/status";

type AsyncFunction = () => Promise<any>;

interface AsyncHandlerOptions {
  setLoading: (
    key: "isCheck" | "isSave" | "isHistory" | "isCreateTable",
    value: boolean
  ) => void;
  setStatus: (status: { type: string; message: string } | null) => void;
  resetLoading: () => void;
}

const asyncHandler = async (
  asyncFunc: AsyncFunction,
  loadingKey: "isCheck" | "isSave" | "isHistory" | "isCreateTable",
  { setLoading, setStatus, resetLoading }: AsyncHandlerOptions
) => {
  setLoading(loadingKey, true);
  setStatus(null);
  resetLoading();

  try {
    return await asyncFunc();
  } catch (error) {
    setStatus(setError((error as Error).message || "Something went wrong."));
  } finally {
    setLoading(loadingKey, false);
  }
};

export default asyncHandler;
