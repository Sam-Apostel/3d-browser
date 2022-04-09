import * as THREE from 'three';
import toiletPaperHolder from './_toiletPaperHolder.json';
import adaptaboard from './_adaptaboard.json';
import knobHook from './_knobHook.json';
import cactusPot from './_cactusPot.json';
import polarTiger from './_polar-tiger.json';
import frameMount from './_metalPictureHolder.json';

const triangulate = ([v1, ...vertices]) => {
	return [
		...vertices.flatMap((vertex, i) => {
			if (i === vertices.length -1) return [];
			return [v1,vertex, vertices[i + 1]]
		})
	];
};

const getExtrema = vertices => vertices.reduce(({ max, min }, vertex) => (
	{
		max: max.map((max, i) => Math.max(max, vertex[i])),
		min: min.map((min, i) => Math.min(min, vertex[i])),
	}
), {
	max: [-Infinity, -Infinity, -Infinity],
	min: [Infinity, Infinity, Infinity]
});


const parseJSONGeometryData = json => {
	const OGVertices = json.flatMap(({ polygons }) => polygons.flatMap(({ vertices }) => vertices.map(vertex => vertex.map(Math.round))));
	const { max, min } = getExtrema(OGVertices);
	const size = max.map((max, i) => max - min[i]);
	const offCenter = size.map((size, i) => (size / 2) + min[i]);
	const radius = Math.sqrt(size.reduce((distance, length) => distance + (length * length)), 0) / 2;

	const geometries = json.map(({ polygons }) => {
		const geometry = new THREE.BufferGeometry();

		const vertices = new Float32Array(polygons
			.flatMap(({ vertices, plane }) => triangulate(vertices))
			.map(vertex => vertex.map((coord, i) => coord - offCenter[i])) // center object
			.flat());

		geometry
			.setAttribute( 'position', new THREE.BufferAttribute(vertices, 3) )
			.computeVertexNormals();
		return geometry;
	})

	return {
		size,
		radius,
		geometries,
	}
};

const makeProject = ({ title, id, iteration: { major, minor }, active, date, geometries, size, radius, rotator, scale }) => {
	const dimensions = [
		...['x', 'y', 'z'].map((axis, i) => [axis, size[i] * scale.amount]),
		['unit', scale.unit]
	];
	return {
		title,
			id: `${id.toString().padStart(3, '0')}.${major}-${minor}`,
		active,
		date: date && new Date(date),
		size,
		parts: geometries.length,
		dimensions: scale && Object.fromEntries(dimensions),
		geometries: geometries.map(rotator ?? (x => x)),
	}
};

const projects = [
	makeProject({
		title: 'Toilet paper holder',
		id: 2,
		iteration: {
			major: 0,
			minor: 1
		},
		active: 2,
		date: '21 july 2021 20:59:42',
		...parseJSONGeometryData(toiletPaperHolder),
		rotator: geom => geom
			.rotateX(- (90 - 20) / 180 * Math.PI)
			.rotateY(-35 / 180 * Math.PI)
			.rotateX(.2),
		scale: {
			amount: 1,
			unit: 'mm'
		}
	}),
	// {
	// 	title: 'Polar Printer',
	// 	id: '007.8-2',
	// 	geometries: getJSONGeometries(polarTiger).map(geom => geom
	// 		.rotateX(-Math.PI / 2)
	// 		.rotateY(-.3)
	// 	),
	// },
	makeProject({
		title: 'Adaptaboard',
		id: 3,
		iteration: {
			major: 2,
			minor: 0
		},
		active: 2,
		// date: '21 july 2021 20:59:42',
		...parseJSONGeometryData(adaptaboard),
		rotator: geom => geom
			.rotateX(- (90 - 20) / 180 * Math.PI)
			.rotateY(-25 / 180 * Math.PI)
			.rotateX(.2),
		scale: {
			amount: 1,
			unit: 'mm'
		}
	}),
	makeProject({
		title: 'Pegboard hook',
		id: 1,
		iteration: {
			major: 0,
			minor: 0
		},
		scale: {
			amount: 1,
			unit: 'mm'
		},
		active: 1,
		...parseJSONGeometryData(knobHook),
		rotator: geom => geom
			.rotateZ(Math.PI / 2)
			.rotateY(-.2),
	}),
	makeProject({
		title: 'frame wall mount',
		id: 7,
		iteration: {
			major: 0,
			minor: 0
		},
		scale: {
			amount: 1,
			unit: 'mm'
		},
		active: 2,
		date: '8 april 2022 21:36:42',
		...parseJSONGeometryData(frameMount),
		rotator: geom => geom
			.rotateX(-Math.PI / 2)
			.rotateY(.8),
	}),
	makeProject({
		title: 'Planter',
		id: 4,
		iteration: {
			major: 0,
			minor: 1
		},
		active: 3,
		scale: {
			amount: 1,
			unit: 'mm'
		},
		...parseJSONGeometryData(cactusPot),
		rotator: geom => geom
			.rotateX(-1.2),
	}),
	// makeProject({
	// 	title: 'Dry box',
	// 	id: 6,
	// 	iteration: {
	// 		major: 0,
	// 		minor: 0
	// 	},
	// 	geometries: [new THREE.DodecahedronGeometry(40)],
	//
	// }),
	// makeProject({
	// 	title: 'Parts tray',
	// 	id: 5,
	// 	iteration: {
	// 		major: 1,
	// 		minor: 0
	// 	},
	// 	geometries: [new THREE.DodecahedronGeometry(40)],
	//
	// }),
];

export default projects;
