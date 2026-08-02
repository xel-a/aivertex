import { site } from './site';
import { social } from './social';

export const personSchema = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Person',
			'@id': `${site.url}/#person`,
			name: site.author.name,
			alternateName: site.author.alternateName,
			url: site.url,
			sameAs: [...social.map((socialLink) => socialLink.url)],
		},
		{
      '@type': "Website",
      "@id": `${site.url}/#website`,
      "url": site.url,
      "name": site.name,
      "author": {
        "@id": `${site.url}/#person`
      }
    },
	],
};
