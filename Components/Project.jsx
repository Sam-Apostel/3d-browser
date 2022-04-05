import styles from "../styles/Project.module.css";
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from "react";
import { Edges, OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei"


const Scene = ({ geometries, shadow }) => {
	return (
		<>

			<Stage
				contactShadow={{ resolution: 1024, ...shadow }}
			>
				{geometries.map((geometry, id) => (
					<mesh
						key={id}
						geometry={geometry}
					>
						<meshStandardMaterial color={'#cebaad'}/>
						{/*<Edges />*/}
					</mesh>
				))}
			</Stage>
		</>
	);
}


const Project = (props) => {
	return (
		<section className={styles.project}>
			<h2 className={styles.title}>{props.title} <span className={styles.id}>{props.id}</span></h2>
			{props.state && (
				<section className={styles.report}>
					<h3>State report</h3>
					<div className={styles.reportContent}>
						{props.state?.active && <div><span>Active cases:</span> <span>{props.state.active}</span></div>}
						{props.state?.revisions && <div><span>Revision:</span> <span>{props.state.revisions}</span></div>}
						{props.state?.date && <div><span>Creation:</span> <span>{props.state.date.toISOString().split('T').join(' ')}</span></div>}
					</div>
				</section>
			)}
			<div className={styles.canvas}>
				<Canvas dpr={[1, 2]} camera={{ fov: 50}}>
					<Scene geometries={props.geometries} shadow={props.shadow} />
					<OrbitControls
						enableZoom={false}
						makeDefault
					/>
					<PerspectiveCamera makeDefault />
				</Canvas>
			</div>
		</section>
	);
};

export default Project;
