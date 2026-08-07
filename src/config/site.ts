interface Author {
  name: string;
  alternateName: string;
}

interface SiteConfig {
  name: string;
  domain: string;
  description: string;
  author: Author;
  url: 'https://aivertex.ca';
  language: string;
}

export const site = {
  name: 'AI Vertex',
  domain: 'aivertex',
  description: 'a place where every line of work converges',
  author: {
    name: 'Axel Ignacio',
    alternateName: 'Axel Rom Ignacio',
  },
  url: 'https://aivertex.ca',
  language: 'en-US',
} as const satisfies SiteConfig;
