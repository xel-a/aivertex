import rss from '@astrojs/rss';
import { getRSSItems } from '../config/rss';
import { site } from '../config/site';

export async function GET(context) {
	return rss({
		title: site.name,
		description: site.description,
		site: context.site,
		items: await getRSSItems(),
		customData: `<language>${site.language}</language>`,
	});
}
