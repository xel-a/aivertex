import type { NodeId } from '../config/navigation';
import { site } from '../config/site';
import { getNodeInfo } from './navigation';

export function generatePageTitle(pageId?: NodeId, contentTitle?: string) {
	if (pageId) {
		const navInfo = getNodeInfo(pageId)!;

		switch (pageId) {
			case 'home':
				return `${site.author.name} | ${site.name}`;
			default:
				return `${navInfo.label} | ${site.name}`;
		}
	}

	if (contentTitle) {
		return `${contentTitle} | ${site.name}`;
	}
}
