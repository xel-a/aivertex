type NodeId = 'home' | 'about' | 'blogs' | 'lab' | 'projects' | '404';

type CollectionId = 'blog' | 'lab' | 'project';

interface SiteNode {
	id: NodeId;
	label: string;
	path?: string;
	parent?: NodeId;
	collection?: CollectionId;
	showInNav: boolean;
	kind: 'page' | 'fallback';
}

const siteNodes: SiteNode[] = [
	{
		id: 'home',
		label: 'AI Vertex',
		path: '/',
		showInNav: true,
		kind: 'page',
	},
	{
		id: 'about',
		label: 'About',
		path: '/about',
		parent: 'home',
		showInNav: true,
		kind: 'page',
	},
	{
		id: 'blogs',
		label: 'Blogs',
		path: '/blogs',
		parent: 'home',
		collection: 'blog',
		showInNav: true,
		kind: 'page',
	},
	{
		id: 'lab',
		label: 'Lab',
		path: '/lab',
		parent: 'home',
		collection: 'lab',
		showInNav: true,
		kind: 'page',
	},
	{
		id: 'projects',
		label: 'Projects',
		path: '/projects',
		parent: 'home',
		collection: 'project',
		showInNav: true,
		kind: 'page',
	},
	{
		id: '404',
		label: 'Vertex not found',
		showInNav: false,
		kind: 'fallback',
	},
];

const navigation = siteNodes.filter((node) => node.kind === 'page' && node.showInNav );

export { type NodeId, siteNodes, navigation };
