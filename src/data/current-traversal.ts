interface Topic {
  name: string;
  started: boolean;
  completed: boolean;
}

interface TraversalNode {
  title: string;
  subtitle: string;
  completionDate: string;
  topics: Topic[];
}

export const traversalNodes: TraversalNode[] = [
  {
    title: 'SC-200 Certification',
    subtitle: 'Microsoft Certified: Security Operations Analyst Associate',
    completionDate: 'October 17, 2026',
    topics: [
      {
        name: 'Microsoft Defender XDR',
        started: true,
        completed: false,
      },
      {
        name: 'Microsoft Defender for Endpoint',
        started: false,
        completed: false,
      },
      {
        name: 'Microsoft Defender for Cloud',
        started: false,
        completed: false,
      },
      {
        name: 'Kusto Query Language (KQL)',
        started: false,
        completed: false,
      },
      { name: 'Microsoft Sentinel', started: false, completed: false },
      { name: 'Microsoft Purview', started: false, completed: false },
    ],
  },
];

export function getProgress(node: TraversalNode): number {
  if (node.topics.length === 0) return 0;
  const completed = node.topics.filter((t) => t.completed).length;
  return Math.round((completed / node.topics.length) * 100);
}

export function getStatus(node: TraversalNode) {
  return getProgress(node) === 100 ? 'completed' : 'in progress';
}
