export interface Metric { value: string; label: string }
export interface Project {
  slug: string;
  title: string;
  context: string;
  summary: string;
  metrics: Metric[];
  tags: string[];
  badge?: string;
  github?: string;
  demo?: string;
  figure: 'plan-layers' | 'dumbbell' | 'round-trip';
  figureLabel: string;
}

// Every number here matches the resume.
export const projects: Project[] = [
  {
    slug: 'flight-disruption-forecaster',
    title: 'Flight Disruption Forecaster',
    context: 'Personal project · LLM explanation layer',
    summary:
      'Predicts US flight disruptions from 10.9 million flights plus weather data, with an LLM explanation layer grounded in SHAP attributions.',
    metrics: [
      { value: '10.9M', label: 'flights' },
      { value: '0.32 → 0.60', label: 'PR-AUC' },
      { value: '2% → 98%', label: 'faithfulness' },
    ],
    tags: ['Python', 'LightGBM', 'SHAP', 'MLflow', 'FastAPI', 'Streamlit', 'Docker'],
    demo: 'https://huggingface.co/spaces/yamanb/flight-delay-forecaster',
    github: 'https://github.com/Yaman-B/flights-delay-forecaster',
    figure: 'dumbbell',
    figureLabel:
      'Before and after chart. PR-AUC rose from 0.32 with a climatology baseline to 0.60 with LightGBM. Explanation faithfulness rose from 2% ungrounded to 98% when grounded in SHAP, on a 250-case evaluation.',
  },
  {
    slug: 'training-plan-agent',
    title: 'LLM Training Plan Agent',
    context: 'LeverX · AI Engineering internship',
    summary:
      'An LLM agent that turns an 11-field intake questionnaire into a four-layer training plan, served through FastAPI over PostgreSQL with a browser UI.',
    metrics: [
      { value: '11+', label: 'validators' },
      { value: '74', label: 'offline tests' },
      { value: '4', label: 'plan layers' },
    ],
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Pydantic', 'LLMs'],
    github: 'https://github.com/Yaman-B/training-plan-generator',
    figure: 'plan-layers',
    figureLabel:
      'Diagram of the four plan layers. An 11-field intake produces a year of 12 months; one month expands into weeks, one week into days, and one day into a session of warm-up, main set, and cool-down. Each layer passes validation.',
  },
  {
    slug: 'medford',
    title: 'MEDFORD Metadata Parser',
    context: 'Tufts Computational Biology Research Group',
    summary:
      'Built the --out feature for MEDFORD, a metadata language for scientific datasets, reconstructing parsed files back into text with nested imports and variable substitutions preserved.',
    metrics: [
      { value: '10+', label: 'automated tests' },
      { value: '9', label: 'EXIF fields mapped' },
      { value: '2', label: 'parser bugs fixed' },
    ],
    tags: ['Python', 'Parsing', 'Research software'],
    badge: 'Submitted to VLDB 2026',
    github: 'https://github.com/TuftsBCB/medford',
    figure: 'round-trip',
    figureLabel:
      'Round-trip diagram. MEDFORD text is parsed into a structured tree, and the --out feature writes the tree back to text, preserving nested imports and variable substitution.',
  },
];
