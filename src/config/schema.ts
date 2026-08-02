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
			url: `${site.url}/about`,
			email: social.find((socialLink) => socialLink.id === 'email')?.url,
			sameAs: social.filter((socialLink) => socialLink.id !== 'email').map((socialLink) => socialLink.url),
		},
		{
			'@type': 'Website',
			'@id': `${site.url}/#website`,
			url: site.url,
			name: site.name,
			inLanguage: site.language,
			author: {
				'@id': `${site.url}/#person`,
			},
		},
	],
};
