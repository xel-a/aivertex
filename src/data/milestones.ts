interface Milestone {
  name: string;
  type: 'Certification' | 'Achievement' | 'Award';
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
    type: 'Achievement',
    date: '2024-06-20',
    tags: ['Computer Science', 'Data Structures', 'Algorithms'],
    distinction: 'Cum Laude',
    provider: 'University of Cebu',
    location: 'Cebu, PH',
  },
  {
    name: 'National Skills Competition: IT Software Solutions for Business',
    type: 'Award',
    date: '2023-03-31',
    tags: ['Desktop & Mobile Development', 'C#', 'Kotlin', 'Microsoft SQL Server'],
    distinction: 'Medallion of Excellence',
    provider: 'TESDA',
    location: 'Manila, PH',
  },
  {
    name: 'Top 5 CTF Scorer',
    type: 'Achievement',
    date: '2023-08-23',
    tags: ['CTF', 'Steganography', 'Digital Forensics', 'Web'],
    provider: 'HackForGov 2',
    location: 'Cebu, PH',
  },
];

export { milestones };
