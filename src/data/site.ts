export const site = {
  name: 'Yaman Bosnali',
  url: 'https://yamanbosna.li',
  title: 'Yaman Bosnali · Data Scientist',
  description:
    "Data scientist building ML systems and the interfaces that explain them. Tufts Data Science '27. Open to full-time roles from summer 2027.",
  headline: 'Data scientist. I build ML systems and the interfaces that explain them.',
  status: 'Open to full-time data science and ML roles from summer 2027',
  locations: ['US', 'Dubai', 'UK and Europe'],
  email: 'yamanbosnali@gmail.com',
  resume: '/resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/yamanbosnali',
    github: 'https://github.com/Yaman-B',
    kaggle: 'https://www.kaggle.com/yamanbosnal',
  },
  bio:
    "I'm a senior at Tufts University studying Data Science, with minors in Engineering Management and Entrepreneurship, graduating in May 2027. I build machine learning systems end to end, along with the layers that make them trustworthy, reliable, and safe. I speak Turkish and English. When I'm not working with data, I'm usually somewhere with a lot of elevation.",
  facts: [
    { label: 'Education', value: 'Tufts University, B.S. Data Science' },
    { label: 'Minors', value: 'Engineering Management, Entrepreneurship' },
    { label: 'Graduating', value: 'May 2027' },
    { label: 'GPA', value: "3.96 / 4.00 · Dean's List" },
    { label: 'Languages', value: 'Turkish (native) · English (C2) · Spanish (intermediate)' },
  ],
  coursework: [
    'Machine Learning', 'Database Systems', 'Statistical Pattern Recognition', 'Visual Analytics',
    'Data Structures', 'Linear Algebra', 'Discrete Math', 'Statistics',
  ],
};

export const sections = [
  { id: 'about', n: '01', title: 'About', loss: '2.31' },
  { id: 'experience', n: '02', title: 'Experience', loss: '1.47' },
  { id: 'projects', n: '03', title: 'Projects', loss: '0.82' },
  { id: 'skills', n: '04', title: 'Skills', loss: '0.36' },
  { id: 'contact', n: '05', title: 'Contact', loss: '0.003' },
] as const;
