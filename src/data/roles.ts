export interface Role {
  id: string;
  epoch: string;
  organization: string;
  title: string;
  location: string;
  period: string;
  highlights: string[];
  tools: string[];
}

// Wording follows the resume.
export const roles: Role[] = [
  {
    id: 'trend-micro',
    epoch: 'epoch 1',
    organization: 'Trend Micro',
    title: 'Cyber Security Intern',
    location: 'Dubai, UAE',
    period: 'Summer 2025',
    highlights: [
      'Researched ML approaches for detecting DNS covert-channel communications, a network threat that evades signature-based detection.',
      'Contributed to a custom VirtualBox lab environment to test detection scenarios.',
      "Analyzed XDR reports and ran simulated threat scenarios, including credential dumping, on Trend Vision One's AI-driven platform.",
      'Earned the Certified Vision One XDR Professional credential.',
    ],
    tools: ['Trend Vision One', 'VirtualBox', 'ML research'],
  },
  {
    id: 'leverx',
    epoch: 'epoch 2',
    organization: 'LeverX',
    title: 'AI Engineering Intern',
    location: 'Online',
    period: 'Summer 2026',
    highlights: [
      'Engineered an LLM planning agent that decomposes an 11-field intake questionnaire into a four-layer training plan (yearly, monthly, weekly, daily session), exposed via a FastAPI service over PostgreSQL with a browser UI.',
      'Enforced structured-output validity through 11+ cross-field Pydantic validators mirrored by matching PostgreSQL CHECK constraints and a retry-with-feedback loop.',
      'Authored 74 offline tests covering all validators, exercise filtering, and generator chaining, with no network, database, or API key.',
    ],
    tools: ['Python', 'FastAPI', 'PostgreSQL', 'Pydantic', 'LLMs'],
  },
  {
    id: 'tufts',
    epoch: 'final epoch',
    organization: 'Tufts University',
    title: 'B.S. Data Science',
    location: 'Medford, MA',
    period: 'May 2027',
    highlights: [
      'Double minor in Engineering Management and Entrepreneurship.',
      "Cumulative GPA 3.96 / 4.00, Dean's List.",
    ],
    tools: [],
  },
];
