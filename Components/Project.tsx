import { useEffect } from 'react';
import styles from '../styles/Project.module.scss';
import { Canvas, useThree } from '@react-three/fiber';
import { PresentationControls, PerspectiveCamera, Stage, Float } from '@react-three/drei';
import { OutlineEffect } from '../three/outlineRenderer';
import Link from 'next/link';
import { BufferGeometry } from 'three';

type SceneProps = {
	geometries: BufferGeometry[];
	colors: {
		background: string
	};
	rotator: (geometry: BufferGeometry) => BufferGeometry;
};

const Scene = ({ geometries, colors, rotator }: SceneProps) => {
	const { set, gl } = useThree(({ set, gl }) => ({ set, gl }));

	const outlineParams = {
		defaultThickness: 0.005,
		defaultColor: [ 116, 116, 116 ].map(v => v / 256),
		defaultAlpha: 1,
	};


	useEffect(() => {
		if (!set || !gl) return;
		// @ts-ignore
		set({ gl: new OutlineEffect(gl, outlineParams) });
	}, []);

	return (
		<>
			<Stage
				shadows={false}
				// adjustCamera={true}
				center={{
					top: true,
					right: true,
					bottom: true,
					left: true,
					front: true,
					back: true,
				}}
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
						{geometries.map((geometry, id) => {
							const geom = rotator(geometry.clone());
							return (
								<mesh
									key={id}
									geometry={geom}
								>
									<meshStandardMaterial color={colors.background}/>
								</mesh>
							);
						})}
					</Float>
				</PresentationControls>
			</Stage>
		</>
	);
}

type ReportProps = {
	active?: number;
	dimensions?: {
		x: number,
		y: number,
		z: number,
		unit: string
	};
	date?: Date;
	parts: number;
};

const Report = ({ active, dimensions, date, parts }: ReportProps) => {
	if (((active ?? 0) <= 0) && (!dimensions) && (parts <= 1) && (!date)) return null;

	return (
		<section className={styles.report}>
			<h3>State report</h3>
			<div className={styles.reportContent}>
				{active ? <div><span>Active cases:</span> <span>{active}</span></div> : null}
				{dimensions && <div><span>Dimensions:</span> <span>{dimensions.x}*{dimensions.y}*{dimensions.z}{dimensions.unit}</span></div>}
				{date && <div><span>Conception:</span> <span>{date.toLocaleDateString('nl-be', { day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '.')}</span></div>}
				{parts > 1 && <div><span>Parts:</span> <span>{parts}</span></div>}
			</div>
		</section>
	);
}

type Props = {
	title: string;
	id: string;
	active?: number;
	dimensions?: {
		x: number,
		y: number,
		z: number,
		unit: string
	};
	date?: Date;
	parts: number;
	geometries: BufferGeometry[];
	colors: {
		background: `#${string}`
	};
	rotator: (geometry: BufferGeometry) => BufferGeometry;
};

const Project = ({ title, id, active, dimensions, date, parts, geometries, colors, rotator }: Props) => {
	return (
		<section className={styles.project}>
			<Link href={`/model/${title.replace(/ /g, '-')}`}><h2 className={styles.title}>{title} <span className={styles.id}>{id}</span></h2></Link>
			<Report active={active} dimensions={dimensions} date={date} parts={parts} />
			<div className={styles.canvas}>
				<Canvas>
					<Scene geometries={geometries} colors={colors} rotator={rotator} />
					<PerspectiveCamera makeDefault />
				</Canvas>
			</div>
		</section>
	);
};

export default Project;
