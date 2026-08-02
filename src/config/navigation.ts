
type NavigationId = 'about' | 'blogs' | 'lab' | 'projects';

interface Navigation {
	id: NavigationId;
	label: string;
	path: string;
}

export const navigation = [
	{ id: 'about', label: 'About', path: '/about' },
	{ id: 'blogs', label: 'Blogs', path: '/blogs' },
	{ id: 'lab', label: 'Lab', path: '/lab' },
	{ id: 'projects', label: 'Projects', path: '/projects' },
] as const satisfies readonly Navigation[];

export type { NavigationId };
