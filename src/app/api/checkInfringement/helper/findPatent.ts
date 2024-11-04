import { Patent } from "@/types/patentModal";

export function findPatent(
  patents: Patent[],
  patentId: string
): Patent | undefined {
  return patents.find((p) => p.id.toString() === patentId.toString());
}
