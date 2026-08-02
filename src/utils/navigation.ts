import { navigation, type NavigationId } from '../config/navigation';

export function getNavInfo(pageId: NavigationId) {
	return navigation.find((navItem) => navItem.id === pageId);
}