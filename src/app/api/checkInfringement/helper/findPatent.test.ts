import { findPatent } from "./findPatent";
import { Patent } from "../model";

describe("findPatent", () => {
  // Mock data for patents
  const mockPatents: Patent[] = [
    { id: "12345", claims: "Claims for Patent A" },
    { id: "67890", claims: "Claims for Patent B" },
    { id: "13579", claims: "Claims for Patent C" },
  ];

  it("should return the correct patent object when a matching patentId is found", () => {
    const result = findPatent(mockPatents, "67890");
    expect(result).toEqual({
      id: "67890",
      claims: "Claims for Patent B",
    });
  });

  it("should return undefined when no matching patentId is found", () => {
    const result = findPatent(mockPatents, "99999");
    expect(result).toBeUndefined();
  });

  it("should work with patentId as numbers or strings", () => {
    const result = findPatent(mockPatents, 12345 as unknown as string); // Number converted to string for testing
    expect(result).toEqual({
      id: "12345",
      claims: "Claims for Patent A",
    });
  });
});
