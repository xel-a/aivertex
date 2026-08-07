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

export async function createNodesAndEdges() {
  const content = await getAllContent();

  const rawNodes: RawNode[] = [];
  const rawEdges: RawEdge[] = [];

  for (const node of navigation) {
    rawNodes.push({
      id: node.id,
      label: node.label,
      path: node.path!,
    });

    if (node.parent) {
      rawEdges.push({
        source: node.parent,
        target: node.id,
      });
    }
  }

  for (const entry of content) {
    rawNodes.push({
      id: entry.id,
      label: entry.data.title,
      path: entry.path,
    });

    rawEdges.push({
      source: entry.parent,
      target: entry.id,
    });
  }

  return {
    rawNodes,
    rawEdges,
  };
}
