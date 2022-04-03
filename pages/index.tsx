import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Project from '../Components/Project';
import projects from '../data/projects';
import { useRef } from "react";

const Home: NextPage = () => {
	const scrollRef = useRef();
	const scroll = useRef(0);

	return (
		<div
			className={styles.container}
			ref={scrollRef}
			onScroll={e => scroll.current = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)}
		>
			<Head>
				<title>3d browser</title>
				<meta name="description" content="my 3d models" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<span className={`${styles.cross} ${styles.topRight}`}/>
				<span className={`${styles.line} ${styles.topLeft}`}/>
				<h1 className={styles.title}>
					Hello 3D!
				</h1>
				<div className={styles.projects}>
					{projects.map(project => ({ ...project, key: project.id, scrollRef, scroll })).map(Project)}
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://sams.works"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by me
				</a>
			</footer>
		</div>
	)
}

export default Home
