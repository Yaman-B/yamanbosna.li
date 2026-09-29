// Tools as evidence of use: each tool lists where it was used (resume).
export const where = {
  agent: 'Plan agent',
  flight: 'Flight forecaster',
  medford: 'MEDFORD',
  trend: 'Trend Micro',
  course: 'Coursework',
} as const;

type Where = keyof typeof where;
export interface SkillGroup { name: string; tools: { name: string; used: Where[] }[] }

export const skillGroups: SkillGroup[] = [
  {
    name: 'Languages',
    tools: [
      { name: 'Python', used: ['agent', 'flight', 'medford'] },
      { name: 'SQL', used: ['agent', 'course'] },
      { name: 'C++', used: ['course'] },
      { name: 'R', used: ['course'] },
    ],
  },
  {
    name: 'Modeling',
    tools: [
      { name: 'LightGBM', used: ['flight'] },
      { name: 'SHAP', used: ['flight'] },
      { name: 'LLMs', used: ['agent', 'flight'] },
      { name: 'PyTorch', used: ['course'] },
      { name: 'Scikit-learn', used: ['course'] },
    ],
  },
  {
    name: 'Data',
    tools: [
      { name: 'PostgreSQL', used: ['agent'] },
      { name: 'Pandas', used: ['flight'] },
      { name: 'NumPy', used: ['course'] },
      { name: 'MLflow', used: ['flight'] },
    ],
  },
  {
    name: 'Serving and infrastructure',
    tools: [
      { name: 'FastAPI', used: ['agent', 'flight'] },
      { name: 'Pydantic', used: ['agent'] },
      { name: 'Streamlit', used: ['flight'] },
      { name: 'Docker', used: ['flight'] },
      { name: 'Hugging Face', used: ['flight'] },
    ],
  },
  {
    name: 'Security',
    tools: [
      { name: 'Trend Vision One (XDR)', used: ['trend'] },
      { name: 'VirtualBox', used: ['trend'] },
    ],
  },
];
