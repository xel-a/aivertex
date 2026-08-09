interface Milestone {
  name: string;
  type: 'certification' | 'achievement' | 'award';
  date: string;
  tags: string[];
  distinction?: string;
  provider?: string;
  url?: string;
  location?: string;
}

const milestones: Milestone[] = [
  {
    name: 'Bachelor of Science in Computer Science',
    type: 'achievement',
    date: '2024-06-20',
    tags: ['Computer Science', 'Data Structures', 'Algorithms'],
    distinction: 'Cum Laude',
    provider: 'University of Cebu - Lapu-lapu & Mandaue',
    location: 'Cebu, PH',
  },
  {
    name: 'National Skills Competition: IT Software Solutions for Business',
    type: 'award',
    date: '2023-03-31',
    tags: ['Desktop Development', 'Android Development', 'Microsoft SQL Server'],
    distinction: 'Medallion of Excellence',
    provider: 'TESDA',
    location: 'Manila, PH',
  },
  {
    name: 'Top 5 CTF Scorer',
    type: 'achievement',
    date: '2023-08-23',
    tags: ['CTF', 'Steganography', 'Digital Forensics', 'Web'],
    provider: 'HackForGov',
    location: 'Cebu, PH',
  },
];
