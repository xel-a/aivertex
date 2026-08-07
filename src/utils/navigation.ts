import { siteNodes, type NodeId } from '../config/navigation';

export function getNodeInfo(pageId: NodeId) {
  return siteNodes.find((node) => node.id === pageId);
}
