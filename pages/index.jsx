import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Project from '../Components/Project';
import projects from '../data/projects';

const Home = () => {

	return (
		<div className={styles.container}>
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
					{projects.map(project => <Project {...project} key={project.id} />)}
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://github.com/Sam-Apostel"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>By <b>Sam Apostel</b></span>
				</a>
			</footer>
		</div>
	)
}

export default Home
