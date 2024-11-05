/* eslint-disable @typescript-eslint/no-explicit-any */
export function isApiError<E>(
  error: E
): error is E & { status: number; message: string } {
  return (
    typeof (error as any).status === "number" &&
    typeof (error as any).message === "string"
  );
}
