type NodeId = 'home' | 'about' | 'blogs' | 'lab' | 'projects';

type CollectionId = 'blog' | 'lab' | 'project';

interface SiteNode {
	id: NodeId;
	label: string;
	path: string;
	parent?: NodeId;
	collection?: CollectionId;
	showInNav: boolean;
}

const siteNodes: SiteNode[] = [
	{
		id: 'home',
		label: 'aivertex.ca',
		path: '/',
		showInNav: false,
	},
	{
		id: 'about',
		label: 'About',
		path: '/about',
		parent: 'home',
		showInNav: true,
	},
	{
		id: 'blogs',
		label: 'Blogs',
		path: '/blogs',
		parent: 'home',
		collection: 'blog',
		showInNav: true,
	},
	{
		id: 'lab',
		label: 'Lab',
		path: '/lab',
		parent: 'home',
		collection: 'lab',
		showInNav: true,
	},
	{
		id: 'projects',
		label: 'Projects',
		path: '/projects',
		parent: 'home',
		collection: 'project',
		showInNav: true,
	},
];

const navigation = siteNodes.filter((node) => node.showInNav);

export { type NodeId, siteNodes, navigation };
