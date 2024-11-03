import { validateParams } from "./validateParams";

describe("validateParams", () => {
  it("should return an error message if 'patentId' is missing", () => {
    const result = validateParams(undefined, "SomeCompany");
    expect(result).toBe("Missing 'patentId' or 'companyName' parameter.");
  });

  it("should return an error message if 'companyName' is missing", () => {
    const result = validateParams("12345", undefined);
    expect(result).toBe("Missing 'patentId' or 'companyName' parameter.");
  });

  it("should return an error message if both 'patentId' and 'companyName' are missing", () => {
    const result = validateParams();
    expect(result).toBe("Missing 'patentId' or 'companyName' parameter.");
  });

  it("should return null if both 'patentId' and 'companyName' are provided", () => {
    const result = validateParams("12345", "SomeCompany");
    expect(result).toBeNull();
  });
});
