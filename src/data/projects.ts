type Repository = {
  name: string;
  url: string;
};

type ProjectLinks = {
  repository?: Repository;
  url?: string;
};

type ProjectService = {
  name: string;
  tags: string[];
  repository?: Repository;
  url?: string;
  model?: string;
  createdAt: string;
};

interface Project {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  links: ProjectLinks;
  services?: ProjectService[];
  createdAt: string;
}

const projects: Project[] = [
  {
    title: 'AIVertex',
    slug: 'aivertex',
    description: 'Where all my work converges',
    category: 'Portfolio',
    tags: ['Astro', 'TypeScript', 'Decap CMS'],
    links: {
      url: 'https://aivertex.ca',
      repository: {
        name: 'GitHub',
        url: 'https://github.com/xel-a/aivertex',
      },
    },
    createdAt: '2026-07-23',
  },
  {
    title: 'Fluxio',
    slug: 'fluxio',
    description: 'A personal finance management system',
    category: 'Finance',
    tags: ['Docker', 'Go', 'Grafana', 'PostgreSQL'],
    links: {
      repository: {
        name: 'GitHub',
        url: 'https://github.com/xel-a/fluxio',
      },
    },
    createdAt: '2026-07-02',
  },
  {
    title: 'Doppel',
    slug: 'doppel',
    description: 'An online plagiarism checker using machine learning',
    category: 'Artificial Intelligence',
    tags: ['Next.js', 'Prisma', 'React', 'Tailwind CSS', 'Vercel'],
    links: {
      repository: {
        name: 'GitHub',
        url: 'https://github.com/xel-a/thedoppelproject',
      },
      url: 'https://thedoppelproject.vercel.app',
    },
    services: [
      {
        name: 'Doppel Inferencer',
        tags: ['BERT', 'Python', 'Web Scraping', 'Cosine Similarity', 'Vector Embeddings'],
        repository: {
          name: 'GitHub',
          url: 'https://github.com/xel-a/doppel-model',
        },
        createdAt: '2024-04-22',
      },
    ],
    createdAt: '2023-12-02',
  },
];

export { type Project, projects };
