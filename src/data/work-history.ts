interface Experience {
	title: string;
	company: string;
	location: string;
	period: string;
	description: string[];
}

export const workHistory = [
	{
		title: 'Back of House (Part-time)',
		company: 'KFC & Taco Bell',
		location: 'Toronto, CA',
		period: 'May 20, 2026 — Present',
		description: [
			'Operate and maintain commercial kitchen equipment while following oil filtration and maintenance procedures to ensure consistent food quality.',
			'Follow food safety and sanitation standards during food preparation and cooking to prevent cross-contamination.',
			'Maintain composure and perform effectively in high-pressure, fast-paced environments.',
		],
	},
	{
		title: 'Infrastructure, Security & Operations (Intern)',
		company: 'Ramon Aboitiz Foundation, Inc.',
		location: 'Cebu, PH',
		period: 'Feb 2024 — Jul 2024',
		description: [
			'Monitored and resolved IT service tickets using SolarWinds, providing technical support and troubleshooting assistance to end users.',
			'Spearheaded the automation of new hire onboarding processes using Microsoft Power Apps and Power Automate, streamlining efficiency and reducing manual workload.',
			'Utilized Microsoft Intune to assess device compliance, identify non-compliant assets, and implement corrective actions to meet organizational standards.',
		],
	},
	{
		title: 'Full stack Developer (Intern)',
		company: 'JobTarget Philippines',
		location: 'Cebu, PH',
		period: 'Aug 2023 — Feb 2024',
		description: [
			'Developed React applications with Next.js, leveraging server-side rendering, static site generation, API routes, and built-in optimizations for enhanced performance and SEO.',
			'Built RESTful APIs using Go and Gin Web Framework.',
			'Reviewed and validated entity-relationship diagrams (ERDs) to ensure data accuracy, consistency, and efficient database design.'
		]
	}
] as Experience[];
