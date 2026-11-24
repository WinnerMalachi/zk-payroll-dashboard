/** Newest salary commitment format version supported by the dashboard. */
export const SUPPORTED_SALARY_COMMITMENT_VERSION = 1;

/**
 * Missing version metadata is treated as legacy version 1 for compatibility.
 */
export function isSupportedSalaryCommitmentVersion(
  version: number | undefined,
): boolean {
  return (
    version === undefined ||
    version === SUPPORTED_SALARY_COMMITMENT_VERSION
  );
}

/**
 * Returns privacy-safe, actionable guidance for a salary commitment format
 * version. Never includes salary amounts, commitment values, or wallet data.
 *
 * Guidance is intentionally specific about the next step so operators know
 * exactly how to proceed without exposing any payroll-sensitive details.
 */
export function getSalaryCommitmentVersionGuidance(
  version: number | undefined,
): string | null {
  if (isSupportedSalaryCommitmentVersion(version)) return null;

  const found = version === undefined ? "unknown (no version metadata)" : `v${version}`;
  return (
    `This salary commitment uses format ${found}, but the dashboard supports ` +
    `v${SUPPORTED_SALARY_COMMITMENT_VERSION} only. Do not run payroll for this ` +
    `employee. Next step: re-generate the commitment through the replacement ` +
    `review flow so it is issued in v${SUPPORTED_SALARY_COMMITMENT_VERSION}, ` +
    `or ask an administrator to confirm compatibility with the payroll contract. ` +
    `No salary amounts or commitment values are shown here.`
  );
}
