import styles from "../styles/Project.module.css";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei'
import { useRef, useState } from "react";

function Box({ text, color, ...props }) {
	const [hovered, set] = useState(false)
	return (
		<mesh {...props} onPointerOver={(e) => set(true)} onPointerOut={(e) => set(false)}>
			<boxGeometry args={[2, 2, 2]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : color} />
		</mesh>
	)
}

const ScrollContainer = ({ scroll, children }) => {
	const { viewport } = useThree();
	const group = useRef();
	useFrame((state, delta) => {
		group.current.position.y = THREE.MathUtils.damp(group.current.position.y, viewport.height * scroll.current, 4, delta)
	});

	return <group ref={group}>{children}</group>;
};

const Scene = () => {
	const viewport = useThree((state) => state.viewport);

	return (
		<>
			<Box color="aquamarine" />
			<Box color="lightblue" position={[0, -100, 0]} />
		</>
	);
}


const Project = (props) => {
	return (
		<section className={styles.project}>
			<h2 className={styles.title}>{props.title} <span className={styles.id}>{props.id}</span></h2>
			<h3>State report</h3>
			{props.state?.active && <div><span>Active cases:</span> <span>{props.state.active}</span></div>}
			{props.state?.revisions && <div><span>Revision:</span> <span>{props.state.revisions}</span></div>}
			{props.state?.date && <div><span>Creation:</span> <span>{props.state.date.toISOString()}</span></div>}
			<Canvas
				onCreated={state => state.events.connect(props.scrollRef.current)}
				raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}
			>
				<ambientLight />
				<pointLight position={[10, 0, 10]} />
				<ScrollContainer scroll={props.scroll}>
					<Scene />
				</ScrollContainer>
			</Canvas>
		</section>
	);
};

export default Project;
