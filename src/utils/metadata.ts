import type { NavigationId } from '../config/navigation';
import { site } from '../config/site';
import { getNavInfo } from './navigation';

export function generatePageTitle(pageId?: NavigationId, contentTitle?: string) {
	if (contentTitle) {
		return `${contentTitle} | ${site.name}`;
	}

	if (pageId) {
		const navInfo = getNavInfo(pageId);

		if (navInfo) {
			return `${navInfo.label} | ${site.name}`;
		}
	}

	return `${site.author.name} | ${site.name}`;
}
