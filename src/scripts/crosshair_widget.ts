const stage = document.getElementById('stage')!;
const svg = stage.querySelector('svg')!;

// --- intro animation ---
const axis = document.querySelector<SVGLineElement>('.axis')!;
const axisLength = axis.getTotalLength();
axis.style.strokeDasharray = `${axisLength}`;
axis.style.strokeDashoffset = `${axisLength}`;

const diags = [
	{ el: document.getElementById('d1'), delay: 0 },
	{ el: document.getElementById('d2'), delay: 150 },
];

requestAnimationFrame(() => {
	diags.forEach(({ el, delay }) => {
		setTimeout(() => {
			el!.style.transform = `rotate(${el!.dataset.angle}deg)`;
		}, delay);
	});
	setTimeout(() => {
		axis.style.strokeDashoffset = `0`;
	}, 300);
	setTimeout(() => {
		svg.classList.add('loaded');
	}, 1000);
});

// --- cursor parallax ---
stage.addEventListener('mousemove', (e) => {
	const rect = stage.getBoundingClientRect();
	const x = (e.clientX - rect.left) / rect.width - 0.5;
	const y = (e.clientY - rect.top) / rect.height - 0.5;
	svg.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
});
stage.addEventListener('mouseleave', () => {
	svg.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

// --- dot position helper ---
type Point = { x: number; y: number };

const glow = document.querySelector<SVGCircleElement>('.glow')!;
const dotCore = document.querySelector<SVGCircleElement>('.dot-core')!;
const CENTER: Point = { x: 180, y: 150 };

function setDotPosition(p: Point) {
	glow.setAttribute('cx', `${p.x}`);
	glow.setAttribute('cy', `${p.y}`);
	dotCore.setAttribute('cx', `${p.x}`);
	dotCore.setAttribute('cy', `${p.y}`);
}

// --- hover-to-highlight + dot travels to that label's corner ---
function link(labelId: string, lineId: string, target: Point) {
	const label = document.getElementById(labelId);
	if (!label) return;
	const line = document.getElementById(lineId);
	const hit = label.nextElementSibling;
	const elements: Element[] = hit ? [label, hit] : [label];

	elements.forEach((el: Element) => {
		el.addEventListener('mouseenter', () => {
			label.classList.add('active');
			line?.classList.add('active');
			setDotPosition(target);
		});
		el.addEventListener('mouseleave', () => {
			label.classList.remove('active');
			line?.classList.remove('active');
			setDotPosition(CENTER);
		});
	});
}

link('lAbout', 'd1', { x: 30, y: 30 });
link('lBlog', 'd2', { x: 330, y: 30 });
link('lContact', 'd1', { x: 330, y: 270 });
link('lLab', 'd2', { x: 30, y: 270 });