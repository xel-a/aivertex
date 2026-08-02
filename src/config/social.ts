type SocialId = 'email' | 'github' | 'linkedin';

interface SocialLink {
	id: SocialId;
	label: string;
	url: string;
}

export const social = [
	{
		id: 'email',
		label: 'Email',
		url: 'mailto:axel.ignacio@aivertex.ca',
	},
	{
		id: 'github',
		label: 'GitHub',
		url: 'https://github.com/xel-a',
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		url: 'https://linkedin.com/in/axel-ignacio',
	},
] as const satisfies readonly SocialLink[];
