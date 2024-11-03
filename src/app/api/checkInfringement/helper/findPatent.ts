import { Patent } from "../model";

export function findPatent(
  patents: Patent[],
  patentId: string
): Patent | undefined {
  return patents.find((p) => p.id.toString() === patentId.toString());
}
