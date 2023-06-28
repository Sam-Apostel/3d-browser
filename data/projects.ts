import * as THREE from 'three';
const toiletPaperHolder: ModelData = require('./_toiletPaperHolder.json');
const adaptaboard: ModelData = require('./_adaptaboard.json');
const knobHook: ModelData = require('./_knobHook.json');
const cactusPot: ModelData = require('./_cactusPot.json');
const polarTiger: ModelData = require('./_polar-tiger.json');
const frameMount: ModelData = require('./_metalPictureHolder.json');
import { BufferGeometry } from 'three';

type Vertex = [x: number, y: number, z: number];
type Face = [v1: Vertex, v2: Vertex, v3: Vertex];
type ModelData = { polygons: { vertices: Vertex[] }[] }[];

const triangulate = ([v1, ...vertices]: Vertex[]): Face[] => {
	const middle = vertices.slice(0, -1);
	return middle.map((vertex, i) => {
		return [v1, vertex, vertices[i + 1]];
	});
};

const getExtrema = (vertices: Vertex[]) => vertices.reduce(({ max, min }, vertex) => (
	{
		max: max.map((max, i) => Math.max(max, vertex[i])),
		min: min.map((min, i) => Math.min(min, vertex[i])),
	}
), {
	max: [-Infinity, -Infinity, -Infinity],
	min: [Infinity, Infinity, Infinity]
});


const parseJSONGeometryData = (json: ModelData ) => {
	const OGVertices = json.flatMap(({ polygons }) => polygons.flatMap(({ vertices }) => vertices.map(vertex => vertex.map(Math.round) as Vertex)));
	const { max, min } = getExtrema(OGVertices);
	const size = max.map((max, i) => max - min[i]) as Vertex;
	const offCenter = size.map((size, i) => (size / 2) + min[i]);
	const radius = Math.sqrt(size.reduce((distance, length) => distance + (length * length))) / 2;

	const geometries = json.map(({ polygons }) => {
		const geometry = new THREE.BufferGeometry();

		const vertices = new Float32Array(polygons
			.flatMap(({ vertices }) => triangulate(vertices).flat())
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

type ProjectFactoryArgs = {
	title: string,
	id: number,
	iteration: {
		major: number,
		minor: number
	},
	active?: number,
	date?: string,
	geometries: BufferGeometry[],
	size: Vertex,
	radius: number,
	rotator: (geom: BufferGeometry) => BufferGeometry,
	scale: {
		amount: number,
		unit: string
	}
};
const makeProject = ({
     title,
     id,
     iteration: { major, minor },
     active,
     date,
     geometries,
     size,
     rotator,
     scale
}: ProjectFactoryArgs) => {
	const dimensions = [
		...['x', 'y', 'z'].map((axis, i) => [axis, Math.round(size[i] * scale.amount)]),
		['unit', scale.unit]
	];
	return {
		title,
		id: `${id.toString().padStart(3, '0')}.${major}-${minor}`,
		active,
		date: (date !== '' ? (date && new Date(date)) : undefined) as Date | undefined,
		size,
		parts: geometries.length,
		dimensions: scale && Object.fromEntries(dimensions),
		geometries: geometries,
		rotator: rotator ?? (x => x),
	}
};

const projects = [
	{
		title: 'Toilet paper holder',
		id: 2,
		iteration: {
			major: 0,
			minor: 1
		},
		active: 2,
		date: '21 july 2021 20:59:42',
		...parseJSONGeometryData(toiletPaperHolder),
		rotator: (geom: BufferGeometry) => geom
			.rotateX(- (90 - 20) / 180 * Math.PI)
			.rotateY(-35 / 180 * Math.PI)
			.rotateX(.2),
		scale: {
			amount: 1,
			unit: 'mm'
		}
	},

	{
		title: 'Polar Printer',
		id: 8,
		iteration: {
		   major: 7,
		   minor: 2
	   },
	   ...parseJSONGeometryData(polarTiger),
	   rotator: (geom: BufferGeometry) => geom
		   .rotateX(-Math.PI / 2)
		   .rotateY(-.3),
	   scale: {
		   amount: 0.1,
		   unit: 'cm'
	   }
   },

	{
		title: 'Split keyboard',
		id: 3,
		iteration: {
			major: 2,
			minor: 0
		},
		active: 2,
		// date: '21 july 2021 20:59:42',
		...parseJSONGeometryData(adaptaboard),
		rotator: (geom: BufferGeometry) => geom
			.rotateX(- (90 - 20) / 180 * Math.PI)
			.rotateY(-25 / 180 * Math.PI)
			.rotateX(.2),
		scale: {
			amount: 1,
			unit: 'mm'
		}
	},

	{
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
		rotator: (geom: BufferGeometry) => geom
			.rotateZ(Math.PI / 2)
			.rotateY(-.2),
	},

{
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
		active: 4,
		date: '8 april 2022 21:36:42',
		...parseJSONGeometryData(frameMount),
		rotator: (geom: BufferGeometry) => geom
			.rotateX(-Math.PI / 2)
			.rotateY(.8),
	},

	{
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
		rotator: (geom: BufferGeometry) => geom
			.rotateX(-1.2),
	},

	// {
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
	// },
].map(makeProject);

export default projects;
