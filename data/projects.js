import * as THREE from 'three';
import toiletPaperHolder from './_toiletPaperHolder.json';
import adaptaboard from './_adaptaboard.json';
import knobHook from './_knobHook.json';
import cactusPot from './_cactusPot.json';
import polarTiger from './_polar-tiger.json';


const triangulateQuad = ([v1, v2, v3, v4]) => {
	return [v1, v2, v3, v3, v4, v1].flat();
};

const triangulate = ([v1, ...vertices]) => {
	return [
		...vertices.flatMap((vertex, i) => {
			if (i === vertices.length -1) return [];
			return [v1,vertex, vertices[i + 1]]
		})
	].flat();
};

const getJSONGeometries = (json) => {
	return json.map(({ polygons }) => {
		const geometry = new THREE.BufferGeometry();
		const vertices = new Float32Array(polygons.flatMap(({ vertices, plane }) => triangulate(vertices)));

		geometry
			.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) )
			.computeVertexNormals();
		return geometry;
	})
};

const projects = [
	{
		title: 'Toilet paper holder',
		id: '002.0-1',
		state: {
			active: 2,
			revisions: 1,
			date: new Date('21 july 2021 20:59:42'),
		},
		geometries: getJSONGeometries(toiletPaperHolder).map(geom => geom
			.rotateX(- (90 - 20) / 180 * Math.PI)
			.rotateY(-35 / 180 * Math.PI)
			.rotateX(.2)
		),
		shadow: {
			scale: 1024,
			position: [0, 0, -10],
			blur: 2
		},
	},
	{
		title: 'Polar Printer',
		id: '007.8-2',
		geometries: getJSONGeometries(polarTiger).map(geom => geom
			.rotateX(-Math.PI / 2)
			.rotateY(-.3)
		),
		shadow: {
			scale: 3024,
			position: [0, 0, -30],
			blur: 3,
			opacity: 0.5,
		},
	},
	{
		title: 'Adaptaboard',
		id: '003.2-0',
		geometries: getJSONGeometries(adaptaboard).map(geom => geom
			.rotateX(- (90 - 20) / 180 * Math.PI)
			.rotateY(-25 / 180 * Math.PI)
			.rotateX(.2)
		),
		shadow: {
			scale: 1024,
			position: [0, 0, -6],
			blur: 2
		},
	},
	{
		title: 'Pegboard hook',
		id: '001.0-0',
		geometries: getJSONGeometries(knobHook).map(geom => geom
			.rotateZ(1.5)
			.rotateY(-.3)
		),
		shadow: {
			scale: 524,
			position: [0, 0, -2],
			blur: 2
		},
	},
	{
		title: 'Planter',
		id: '004.0-1',
		geometries: getJSONGeometries(cactusPot).map(geom => geom
			.rotateX(-1.2)
		),
		shadow: {
			scale: 912,
			position: [0, 0, -8],
			blur: 2
		},
	},
	{
		title: 'Dry box',
		id: '006.0-0',
		geometries: [new THREE.DodecahedronGeometry(40)],
		shadow: {
			scale: 1000,
			position: [0, 0, -7],
			blur: 2
		},
	},
	{
		title: 'Parts tray',
		id: '005.1-0',
		geometries: [new THREE.DodecahedronGeometry(40)],
		shadow: {
		scale: 1000,
			position: [0, 0, -7],
			blur: 2
		}
	},
];

export default projects;
