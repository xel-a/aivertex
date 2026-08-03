import type { RawEdge, RawNode } from './graph-view-helper';

export interface Node {
	x: number;
	y: number;
	vx: number;
	vy: number;
	fx: number | null;
	fy: number | null;
	degree: number;
	r: number;
	id: string;
	label: string;
	path: string;
}

export function buildGraph(stage: HTMLElement, rawNodes: RawNode[], rawEdges: RawEdge[]) {
	const W = Number(stage.dataset.width);
	const H = Number(stage.dataset.height);

	const degreeCount = new Map<string, number>();

	rawEdges.forEach((e) => {
		degreeCount.set(e.source, (degreeCount.get(e.source) || 0) + 1);
		degreeCount.set(e.target, (degreeCount.get(e.target) || 0) + 1);
	});

	const nodes: Node[] = rawNodes.map((n, i) => {
		const angle = (i / rawNodes.length) * Math.PI * 2;
		const radius = Math.min(W, H) * 0.28;
		const degree = degreeCount.get(n.id) || 0;

		return {
			...n,
			x: W / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
			y: H / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 20,
			vx: 0,
			vy: 0,
			fx: null,
			fy: null,
			degree,
			r: 4 + Math.min(degree, 5) * 1.6,
		};
	});

	const nodeById = new Map(nodes.map((n) => [n.id, n]));

	const edges = rawEdges
		.map((e) => ({
			source: nodeById.get(e.source),
			target: nodeById.get(e.target),
		}))
		.filter(
			(
				e,
			): e is {
				source: Node;
				target: Node;
			} => Boolean(e.source && e.target),
		);

	const neighbors = new Map<string, Set<string>>();

	nodes.forEach((n) => {
		neighbors.set(n.id, new Set());
	});

	edges.forEach((e) => {
		neighbors.get(e.source.id)!.add(e.target.id);
		neighbors.get(e.target.id)!.add(e.source.id);
	});

	return {
		nodes,
		edges,
		neighbors,
		W,
		H,
	};
}
