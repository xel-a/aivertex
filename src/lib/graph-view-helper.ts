import { navigation } from '../config/navigation';
import { getAllContent } from './content';

export interface RawNode {
  id: string;
  label: string;
  path: string;
}

export interface RawEdge {
  source: string;
  target: string;
}

const LAB_SECTIONS = new Set(['experiments', 'notes', 'writeups']);

export async function createNodesAndEdges(variant: 'full' | 'compact' = 'compact') {
  const content = await getAllContent();

  const rawNodes: RawNode[] = [];
  const rawEdges: RawEdge[] = [];
  const nodeIds = new Set<string>();

  const addNode = (node: RawNode) => {
    if (nodeIds.has(node.id)) return;

    rawNodes.push(node);
    nodeIds.add(node.id);
  };

  const addEdge = (source: string, target: string) => {
    const exists = rawEdges.some((edge) => edge.source === source && edge.target === target);

    if (!exists) {
      rawEdges.push({ source, target });
    }
  };

  for (const node of navigation) {
    addNode({
      id: node.id,
      label: node.label,
      path: node.path!,
    });

    if (node.parent) {
      addEdge(node.parent, node.id);
    }
  }

  if (variant === 'compact') {
    const labSections = new Set<string>();

    for (const entry of content) {
      if (entry.type !== 'lab') continue;

      const parts = entry.path.split('/').filter(Boolean);
      const section = parts[1];

      if (section && LAB_SECTIONS.has(section)) {
        labSections.add(section);
      }
    }

    for (const section of labSections) {
      addNode({
        id: `lab/${section}`,
        label: section[0].toUpperCase() + section.slice(1),
        path: `/lab/${section}`,
      });

      addEdge('lab', `lab/${section}`);
    }

    return {
      rawNodes,
      rawEdges,
    };
  }

  for (const entry of content) {
    if (entry.type === 'lab') {
      const parts = entry.path.split('/').filter(Boolean);
      const section = parts[1];

      if (section && LAB_SECTIONS.has(section)) {
        const sectionId = `lab/${section}`;

        addNode({
          id: sectionId,
          label: section[0].toUpperCase() + section.slice(1),
          path: `/lab/${section}`,
        });

        addEdge('lab', sectionId);

        addNode({
          id: entry.id,
          label: entry.data.title,
          path: entry.path,
        });

        addEdge(sectionId, entry.id);
      }

      continue;
    }

    addNode({
      id: entry.id,
      label: entry.data.title,
      path: entry.path,
    });

    addEdge(entry.parent, entry.id);
  }

  return {
    rawNodes,
    rawEdges,
  };
}
