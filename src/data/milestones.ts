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
    name: 'Google Cybersecurity Professional Certificate',
    type: 'Certification',
    date: '2024-08-17',
    tags: [
      'NIST Cybersecurity Framework',
      'Risk Management Framework',
      'Security Information and Event Management',
      'Intrusion Detection System',
    ],
    provider: 'Coursera',
    url: 'https://www.credly.com/badges/53ea3445-c8c1-4cd2-b288-cfe235bf4e7e/linked_in_profile',
  },
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
