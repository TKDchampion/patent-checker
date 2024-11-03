export function validateParams(
  patentId?: string,
  companyName?: string
): string | null {
  if (!patentId || !companyName) {
    return "Missing 'patentId' or 'companyName' parameter.";
  }
  return null;
}
