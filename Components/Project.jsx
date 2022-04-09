import { useEffect } from 'react';
import styles from '../styles/Project.module.css';
import { Canvas, useThree } from '@react-three/fiber';
import { PresentationControls, PerspectiveCamera, Stage, Float } from '@react-three/drei';
import { OutlineEffect } from '../three/outlineRenderer';

const outlineParams = {
	defaultThickness: 0.005,
	defaultColor: [ 116, 116, 116 ].map(v => v / 256),
	defaultAlpha: 1,
};

const Scene = ({ geometries }) => {
	const { set, gl } = useThree(({ set, gl }) => ({ set, gl }));

	useEffect(() => {
		if (!set || !gl) return;
		set({ gl: new OutlineEffect(gl, outlineParams) });
	}, []);

	const colors = [
		'#c7aea3',
		'#9d9182'
	]
	return (
		<>

			<Stage
				contactShadow={false}
			>
				<PresentationControls
					global
					cursor={true}
					snap={{ mass: 4, tension: 1300 }}
					rotation={[0, 0, 0]}
					polar={[-Infinity, Infinity]}
					azimuth={[-Infinity, Infinity]}
					speed={0.8}
				>

					<Float rotationIntensity={3} floatIntensity={0}>
						{geometries.map((geometry, id) => (
							<mesh
								key={id}
								geometry={geometry}
							>
								<meshStandardMaterial color={colors[id]}/>
							</mesh>
						))}
					</Float>
				</PresentationControls>
			</Stage>
		</>
	);
}

const Report = ({ active, dimensions, date, parts }) => {
	if (((active ?? 0) <= 0) && (!dimensions) && (parts <= 1) && (!date)) return null;

	return (
		<section className={styles.report}>
			<h3>State report</h3>
			<div className={styles.reportContent}>
				{active > 0 && <div><span>Active cases:</span> <span>{active}</span></div>}
				{dimensions && <div><span>Dimensions:</span> <span>{dimensions.x}*{dimensions.y}*{dimensions.z}{dimensions.unit}</span></div>}
				{date && <div><span>Conception:</span> <span>{date.toLocaleDateString('nl-be', { day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '.')}</span></div>}
				{parts > 1 && <div><span>Parts:</span> <span>{parts}</span></div>}
			</div>
		</section>
	);
}
const Project = (props) => {
	return (
		<section className={styles.project}>
			<h2 className={styles.title}>{props.title} <span className={styles.id}>{props.id}</span></h2>
			<Report active={props.active} dimensions={props.dimensions} date={props.date} parts={props.parts} />
			<div className={styles.canvas}>
				<Canvas>
					<Scene geometries={props.geometries} />
					<PerspectiveCamera makeDefault />
				</Canvas>
			</div>
		</section>
	);
};

export default Project;
