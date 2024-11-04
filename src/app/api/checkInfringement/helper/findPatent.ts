import { Patent } from "@/types/patentModel";

export function findPatent(
  patents: Patent[],
  patentId: string
): Patent | undefined {
  return patents.find((p) => p.id.toString() === patentId.toString());
}
