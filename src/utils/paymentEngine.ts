/**
 * Staffing Bees - Single Payment Engine (Section 10 of PRD)
 *
 * One payment engine supports two scenarios, rather than two separate systems:
 * 1. Contract: candidate rate, client rate and margin percentage produce a recurring hourly Staffing Bees fee.
 * 2. Direct Placement: annual salary and placement-fee percentage produce a one-time Staffing Bees fee.
 *
 * The same engine function drives every fee shown anywhere in the app — requirement forms,
 * submission forms (with a live preview), dashboards and financials — so fee logic lives in exactly one place.
 */

export interface ContractFeeInput {
  type: 'Contract';
  candidateRate: number; // $/hr paid to candidate
  clientRate: number; // $/hr billed to client
  marginPercent?: number; // optional margin % (default calculated from rates or 20%)
  hoursPerWeek?: number; // default 40
}

export interface DirectPlacementFeeInput {
  type: 'Direct Placement';
  annualSalary: number; // $ annual salary
  placementFeePercent: number; // e.g. 20%
}

export type FeeCalculationInput = ContractFeeInput | DirectPlacementFeeInput;

export interface FeeCalculationResult {
  engagementType: 'Contract' | 'Direct Placement';
  // Contract specific
  hourlyMargin?: number;
  marginPercent?: number;
  weeklyFee?: number;
  monthlyFee?: number;
  // Direct Placement specific
  oneTimeFee?: number;
  placementFeePercent?: number;
  // Summary
  formattedSummary: string;
  displayAmount: string;
  isRecurring: boolean;
}

export function calculateStaffingBeesFee(input: FeeCalculationInput): FeeCalculationResult {
  if (input.type === 'Contract') {
    const candidateRate = Math.max(0, input.candidateRate || 0);
    const clientRate = Math.max(0, input.clientRate || 0);
    const hoursPerWeek = input.hoursPerWeek || 40;

    let hourlyMargin = clientRate - candidateRate;
    let marginPercent = clientRate > 0 ? (hourlyMargin / clientRate) * 100 : 0;

    if (input.marginPercent !== undefined && input.marginPercent > 0 && clientRate === 0) {
      marginPercent = input.marginPercent;
      hourlyMargin = candidateRate * (marginPercent / 100);
    }

    const weeklyFee = Math.max(0, hourlyMargin * hoursPerWeek);
    const monthlyFee = weeklyFee * 4.33;

    return {
      engagementType: 'Contract',
      hourlyMargin: Math.max(0, hourlyMargin),
      marginPercent: Math.max(0, Math.round(marginPercent * 10) / 10),
      weeklyFee: Math.round(weeklyFee),
      monthlyFee: Math.round(monthlyFee),
      isRecurring: true,
      displayAmount: `$${Math.max(0, hourlyMargin).toFixed(2)}/hr`,
      formattedSummary: `$${Math.max(0, hourlyMargin).toFixed(2)}/hr margin (${marginPercent.toFixed(1)}%) • ~$${Math.round(weeklyFee).toLocaleString()}/wk`,
    };
  } else {
    const salary = Math.max(0, input.annualSalary || 0);
    const pct = Math.max(0, input.placementFeePercent || 20);
    const fee = Math.round((salary * pct) / 100);

    return {
      engagementType: 'Direct Placement',
      oneTimeFee: fee,
      placementFeePercent: pct,
      isRecurring: false,
      displayAmount: `$${fee.toLocaleString()}`,
      formattedSummary: `$${fee.toLocaleString()} one-time fee (${pct}% of $${salary.toLocaleString()})`,
    };
  }
}

/**
 * Deterministic AI Match Percentage (Section 17 of PRD)
 * Blends skill overlap and CPI (Candidate Performance Index)
 */
export function calculateAIMatchScore(candidateSkills: string[], requiredSkills: string[], candidateCpi: number = 80): {
  matchPercent: number;
  matchedSkills: string[];
  missingSkills: string[];
} {
  if (!requiredSkills || requiredSkills.length === 0) {
    return { matchPercent: 85, matchedSkills: [], missingSkills: [] };
  }

  const normCandidate = candidateSkills.map((s) => s.toLowerCase().trim());
  const matched: string[] = [];
  const missing: string[] = [];

  requiredSkills.forEach((req) => {
    const found = normCandidate.some((c) => c.includes(req.toLowerCase().trim()) || req.toLowerCase().trim().includes(c));
    if (found) {
      matched.push(req);
    } else {
      missing.push(req);
    }
  });

  const skillOverlapScore = (matched.length / requiredSkills.length) * 100;
  // Blend: 70% skill overlap + 30% CPI normalized
  const blended = Math.round(skillOverlapScore * 0.7 + (candidateCpi || 80) * 0.3);
  const matchPercent = Math.min(99, Math.max(45, blended));

  return {
    matchPercent,
    matchedSkills: matched,
    missingSkills: missing,
  };
}
