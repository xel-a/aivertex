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
    completionDate: '',
    topics: [
      {
        name: 'Microsoft Defender XDR',
        started: true,
        completed: true,
      },
      {
        name: 'Microsoft Defender for Endpoint',
        started: true,
        completed: true,
      },
      {
        name: 'Microsoft Defender for Cloud',
        started: true,
        completed: true,
      },
      { name: 'Microsoft Sentinel', started: true, completed: true },
      { name: 'Microsoft Purview', started: true, completed: true },
      {
        name: 'Kusto Query Language (KQL)',
        started: true,
        completed: false,
      },
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
