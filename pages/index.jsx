import { useLayoutEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../Components/Footer';
import Project from '../Components/Project';
import projects from '../data/projects';

const backgroundColor = '#d7d0cb';
const Home = () => {
	useLayoutEffect(() => {
		if (!document) return;
		document.documentElement.style.setProperty('--background', backgroundColor);
	}, [])

	return (
		<div className={styles.container} style={{ '--background': backgroundColor }}>
			<Head>
				<title>3d browser</title>
				<meta name="description" content="my 3d models" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<span className={`${styles.cross} ${styles.topRight}`}/>
				<span className={`${styles.line} ${styles.topLeft}`}/>
				<span className={`${styles.cross} ${styles.centerLeft}`}/>
				<span className={`${styles.cross} ${styles.centerRight}`}/>
				<span className={`${styles.line} ${styles.bottomCenter}`}/>
				<h1 className={styles.title}>
					Hello 3D!
				</h1>
				<div className={styles.projects}>
					{projects.map(project => <Project {...project} key={project.id} colors={{ background: backgroundColor }} />)}
				</div>
			</main>

			<Footer />
		</div>
	)
}

export default Home
