/**
 * LLM Hook Generator
 * Generates compelling hooks and narrative elements for RTI stories
 * In production, this would call an actual LLM API
 */

import type {
  LLMHook,
  RTIOutcomeType,
  UrgencyLevel,
  HookTemplate,
} from '@/types/redesign'

// ============================================
// Hook Templates by Outcome Type
// ============================================

const HOOK_TEMPLATES: Record<RTIOutcomeType, HookTemplate> = {
  data_released: {
    outcomeType: 'data_released',
    templates: {
      hookLine: [
        '{entity} forced to reveal {data} after {duration} of secrecy',
        'RTI exposes {data} that {entity} tried to hide',
        '{entity} releases {data} showing {revelation}',
        'Hidden {data} exposed through RTI reveals {revelation}',
        'After {duration}, {entity} finally discloses {data}',
      ],
      whyItMatters: [
        'This data affects {beneficiaries} who were kept in the dark about {issue}',
        'Public now has access to information critical for {purpose}',
        'Exposes systemic issues in {system} that need urgent reform',
        'Citizens can now hold {entity} accountable for {issue}',
        'Opens door for similar disclosures across {scope}',
      ],
      humanAngle: [
        '{number} families finally have answers after {duration} of waiting',
        'Local residents struggled without this information for {duration}',
        'Community activists used this data to demand {action}',
        '{beneficiaries} can now make informed decisions about {issue}',
      ],
    },
  },
  money_sanctioned: {
    outcomeType: 'money_sanctioned',
    templates: {
      hookLine: [
        '{entity} releases ₹{amount} after RTI exposed {issue}',
        'RTI forces disbursement of ₹{amount} stuck for {duration}',
        '{beneficiaries} get ₹{amount} after RTI reveals fund blockage',
        '₹{amount} sanctioned after RTI exposes {issue}',
        'Funds meant for {beneficiaries} released after {duration} delay',
      ],
      whyItMatters: [
        '{number} {beneficiaries} were denied promised funds for {duration}',
        'Money was allocated but not disbursed despite {condition}',
        'Exposes delays in fund utilization affecting {beneficiaries}',
        'Sets precedent for other blocked fund releases',
        'Demonstrates power of transparency in fund management',
      ],
      humanAngle: [
        'Families waited {duration} for promised assistance',
        '{beneficiaries} struggled without funds meant for {purpose}',
        'Community members had to {hardship} due to fund delays',
        'Children affected by lack of {resource} for {duration}',
      ],
    },
  },
  services_fixed: {
    outcomeType: 'services_fixed',
    templates: {
      hookLine: [
        'RTI revealed {issue} - {entity} forced to fix {service}',
        '{service} restored to {beneficiaries} after RTI exposed {issue}',
        '{entity} fixes {service} after RTI shows {duration} of neglect',
        'RTI exposes why {service} was broken - now fixed',
        'After {duration} without {service}, RTI forces {entity} to act',
      ],
      whyItMatters: [
        '{number} {beneficiaries} suffered without {service} for {duration}',
        'Basic {service} denied despite {condition}',
        'Safety concerns raised by lack of {service}',
        'Sets precedent for fixing similar issues across {scope}',
        'Demonstrates accountability through transparency',
      ],
      humanAngle: [
        'Residents endured {hardship} for {duration}',
        '{beneficiaries} had no choice but to {alternative}',
        'Daily life disrupted for {number} people',
        'Families reported {consequence} due to lack of {service}',
      ],
    },
  },
  policy_changed: {
    outcomeType: 'policy_changed',
    templates: {
      hookLine: [
        'RTI data forces {entity} to revise {policy}',
        '{entity} changes {policy} after RTI reveals {issue}',
        'Policy shift on {issue} after RTI exposes {revelation}',
        'RTI-driven evidence leads to {policy} reform',
        '{entity} updates {policy} following RTI disclosure',
      ],
      whyItMatters: [
        'New policy will benefit {beneficiaries} across {scope}',
        'Addresses systemic {issue} affecting {number} people',
        'Sets new standard for {system}',
        'Could trigger similar policy changes in other {entities}',
        'Marks significant win for transparency advocates',
      ],
      humanAngle: [
        'Citizens campaigned for {duration} for this change',
        'Community groups used RTI data to demand reform',
        'Policy was causing hardship for {beneficiaries}',
        'Change comes after {number} complaints went unheard',
      ],
    },
  },
  accountability_action: {
    outcomeType: 'accountability_action',
    templates: {
      hookLine: [
        'RTI leads to action against {officials} for {misconduct}',
        '{entity} launches probe after RTI exposes {issue}',
        'Officials face consequences after RTI reveals {misconduct}',
        'Accountability enforced: RTI exposes {issue}',
        'RTI-triggered investigation into {misconduct}',
      ],
      whyItMatters: [
        'Sends strong message that officials will be held accountable',
        '{issue} had been ignored despite multiple complaints',
        'May deter future {misconduct} in {system}',
        'Restores public faith in accountability mechanisms',
        'Could lead to systemic reforms in {scope}',
      ],
      humanAngle: [
        'Citizens felt helpless until RTI exposed truth',
        'Victims of {misconduct} finally see action',
        'Community demanded accountability for {duration}',
        'Public pressure following disclosure forced action',
      ],
    },
  },
}

// ============================================
// Urgency Phrases
// ============================================

const URGENCY_PHRASES: Record<UrgencyLevel, string[]> = {
  critical: [
    'urgent action needed',
    'lives at stake',
    'immediate danger',
    'crisis situation',
    'emergency intervention required',
  ],
  high: [
    'significant hardship',
    'serious concern',
    'major impact',
    'widespread suffering',
    'needs prompt attention',
  ],
  medium: [
    'growing concern',
    'affecting many',
    'requires attention',
    'causing difficulties',
    'should be addressed',
  ],
  low: [
    'of public interest',
    'worth monitoring',
    'routine matter',
    'standard concern',
    'administrative issue',
  ],
}

// ============================================
// Helper Functions
// ============================================

/**
 * Seeded random number generator for reproducible results
 */
function seededRandom(seed: number): () => number {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

/**
 * Get random item from array using optional seed
 */
function getRandomItem<T>(items: T[], seed?: number): T {
  if (seed !== undefined) {
    const random = seededRandom(seed)
    return items[Math.floor(random() * items.length)]
  }
  return items[Math.floor(Math.random() * items.length)]
}

/**
 * Replace placeholders in template string
 */
function fillTemplate(template: string, variables: Record<string, string>): string {
  let result = template
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
  }
  return result
}

// ============================================
// Hook Generation Functions
// ============================================

/**
 * Generate a hook line for a win story
 */
export function generateWinHookLine(
  outcomeType: RTIOutcomeType,
  variables: Record<string, string>,
  seed?: number
): string {
  const templates = HOOK_TEMPLATES[outcomeType].templates.hookLine
  const template = getRandomItem(templates, seed)
  return fillTemplate(template, variables)
}

/**
 * Generate a "why it matters" statement
 */
export function generateWhyItMatters(
  outcomeType: RTIOutcomeType,
  variables: Record<string, string>,
  seed?: number
): string {
  const templates = HOOK_TEMPLATES[outcomeType].templates.whyItMatters
  const template = getRandomItem(templates, seed)
  return fillTemplate(template, variables)
}

/**
 * Generate a human angle narrative
 */
export function generateHumanAngle(
  outcomeType: RTIOutcomeType,
  variables: Record<string, string>,
  seed?: number
): string {
  const templates = HOOK_TEMPLATES[outcomeType].templates.humanAngle
  const template = getRandomItem(templates, seed)
  return fillTemplate(template, variables)
}

/**
 * Generate complete LLM hook
 */
export function generateLLMHook(
  outcomeType: RTIOutcomeType,
  variables: Record<string, string>,
  includeHumanAngle = false,
  seed?: number
): LLMHook {
  return {
    hookLine: generateWinHookLine(outcomeType, variables, seed),
    whyItMatters: generateWhyItMatters(outcomeType, variables, seed),
    humanAngle: includeHumanAngle
      ? generateHumanAngle(outcomeType, variables, seed)
      : undefined,
  }
}

/**
 * Generate urgency-based hook for pending cases
 */
export function generateUrgencyHook(
  urgencyLevel: UrgencyLevel,
  question: string,
  impactDetails: string[],
  seed?: number
): LLMHook {
  const urgencyPhrase = getRandomItem(URGENCY_PHRASES[urgencyLevel], seed)
  const primaryImpact = impactDetails[0] || 'Public affected'

  return {
    hookLine: `${question} - ${urgencyPhrase}`,
    whyItMatters: primaryImpact,
    humanAngle: impactDetails.length > 1 ? impactDetails[1] : undefined,
  }
}

/**
 * Generate question hook (why this question is interesting)
 */
export function generateQuestionHook(
  topic: string,
  department: string,
  context: string,
  seed?: number
): LLMHook {
  const hookPatterns = [
    `Citizens demand transparency on ${context} from ${department}`,
    `Key question on ${topic}: ${context}`,
    `${department} asked to disclose ${context}`,
    `Public seeks answers about ${context}`,
    `${context} - ${department} must respond`,
  ]

  const whyPatterns = [
    `This information is crucial for public oversight of ${topic}`,
    `Citizens have right to know about ${context}`,
    `Transparency on ${topic} is essential for accountability`,
    `Answer will shed light on ${context}`,
    `Public interest in ${topic} demands disclosure`,
  ]

  return {
    hookLine: getRandomItem(hookPatterns, seed),
    whyItMatters: getRandomItem(whyPatterns, seed),
  }
}

// ============================================
// Outcome Title Generation
// ============================================

/**
 * Generate compelling outcome title for win stories
 */
export function generateOutcomeTitle(
  outcomeType: RTIOutcomeType,
  achievement: string,
  scale: string,
  seed?: number
): string {
  const titlePatterns: Record<RTIOutcomeType, string[]> = {
    data_released: [
      `${achievement} Data Released`,
      `${achievement} Records Made Public`,
      `Disclosure: ${achievement}`,
      `${achievement} Information Exposed`,
    ],
    money_sanctioned: [
      `${scale} Sanctioned for ${achievement}`,
      `Funds Released: ${achievement}`,
      `${scale} Disbursed for ${achievement}`,
      `${achievement} - ${scale} Approved`,
    ],
    services_fixed: [
      `${achievement} Restored`,
      `${achievement} Fixed`,
      `Service Resumed: ${achievement}`,
      `${achievement} Repaired`,
    ],
    policy_changed: [
      `Policy Updated: ${achievement}`,
      `${achievement} - New Rules Implemented`,
      `Reform: ${achievement}`,
      `${achievement} Policy Revised`,
    ],
    accountability_action: [
      `Action Taken: ${achievement}`,
      `Accountability: ${achievement}`,
      `Investigation: ${achievement}`,
      `${achievement} - Officials Held Responsible`,
    ],
  }

  const patterns = titlePatterns[outcomeType]
  return getRandomItem(patterns, seed)
}

// ============================================
// Export All
// ============================================

export {
  HOOK_TEMPLATES,
  URGENCY_PHRASES,
  getRandomItem,
  fillTemplate,
}
