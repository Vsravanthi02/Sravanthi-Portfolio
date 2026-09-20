// Toolkit content is DERIVED, not hand-typed — every technology and its "used
// in" attribution comes directly from archivaProject.technology and each
// experienceState's technologies array. This guarantees nothing here can drift
// from, or invent beyond, what's already established as real (per the redesign
// brief's explicit "do not invent technologies I haven't used" rule): the
// PyTorch/Transformers/YOLO/OpenCV/pgvector/Docker examples suggested in that
// brief are deliberately excluded because they aren't confirmed anywhere in
// the existing project data.
import { archivaProject } from './projects'
import { experienceStates } from './geography'

const sources = [
	{ label: 'ARCHIVA', technologies: archivaProject.technology },
	...experienceStates.map((state) => ({ label: state.label, technologies: state.technologies })),
]

const byName = new Map()
for (const source of sources) {
	for (const tech of source.technologies) {
		if (!byName.has(tech)) byName.set(tech, new Set())
		byName.get(tech).add(source.label)
	}
}

export const toolkitEntries = Array.from(byName.entries())
	.map(([name, usedIn]) => ({ name, usedIn: Array.from(usedIn) }))
	.sort((a, b) => b.usedIn.length - a.usedIn.length || a.name.localeCompare(b.name))
