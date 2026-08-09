type ProjectLinks = {
  repository?: string;
  url?: string;
};

type ProjectService = {
  name: string;
  tags: string[];
  repository?: string;
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

export const projects: Project[] = [
  {
    title: 'AIVertex',
    slug: 'aivertex',
    description: 'Where all my work converges',
    category: 'Portfolio',
    tags: ['astro', 'decap-cms', 'typescript', 'wrangler'],
    links: {
      url: 'https://aivertex.ca',
      repository: 'https://github.com/xel-a/aivertex',
    },
    createdAt: '2026-07-23',
  },
  {
    title: 'Fluxio',
    slug: 'fluxio',
    description: 'A personal finance management system',
    category: 'Finance',
    tags: ['docker', 'golang', 'grafana', 'postgresql'],
    links: {
      repository: 'https://github.com/xel-a/fluxio',
    },
    createdAt: '2026-07-02',
  },
  {
    title: 'Doppel',
    slug: 'doppel',
    description: 'An online plagiarism checker using machine learning',
    category: 'Artificial Intelligence',
    tags: ['nextjs', 'prisma', 'react', 'tailwindcss', 'vercel'],
    links: {
      repository: 'https://github.com/xel-a/thedoppelproject',
      url: 'https://thedoppelproject.vercel.app',
    },
    services: [
      {
        name: 'Doppel Inferencer',
        tags: ['bert', 'python', 'web-scraping', 'cosine-similarity', 'vector-embeddings'],
        repository: 'https://github.com/xel-a/doppel-model',
        createdAt: '2024-04-22',
      },
    ],
    createdAt: '2023-12-02',
  },
];
