import { navigation, type NodeId } from '../config/navigation';

export function getNavInfo(pageId: NodeId) {
	return navigation.find((navItem) => navItem.id === pageId);
}