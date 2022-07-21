import Head from 'next/head';
import Project from '../../Components/Project';
import projects from '../../data/projects';
import Link from 'next/link';
import styles from '../../styles/Model.module.scss';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useLayoutEffect } from 'react';
import Footer from '../../Components/Footer';

type Props = {
	index: number;
};

type Params = {
	slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
	const { slug } = context.params!;
	const index = projects.map(({ title }) => title.replace(/ /g, '-')).indexOf(slug);

	return {
		props: {
			index
		}
	};
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const paths = projects.map(({ title }) => ({ params: { slug: title.replace(/ /g, '-') } }));

	return {
		paths,
		fallback: false
	};
};


const backgroundColor = '#6a6ad1';
const ModelPage = ({ index }: Props) => {
	useLayoutEffect(() => {
		if (!document) return;
		document.documentElement.style.setProperty('--background', backgroundColor);
	}, [])
	const project = projects[index];

	return (
		<div className={styles.container} style={{ '--background': backgroundColor }}>
			<Head>
				<title>{project.title}</title>
				<meta name="description" content={project.title} />
			</Head>

			<main className={styles.main}>
				<span className={`${styles.cross} ${styles.topRight}`}/>
				<Link href={'/'}><span className={`${styles.line} ${styles.topLeft}`} /></Link>
				<span className={`${styles.cross} ${styles.centerLeft}`}/>
				<span className={`${styles.cross} ${styles.centerRight}`}/>
				<span className={`${styles.line} ${styles.bottomCenter}`}/>
				<div className={styles.projects}>
					<Project {...project} colors={{ background: backgroundColor }} />
				</div>
				{/*<pre>*/}
				{/*	{JSON.stringify(project, null, ' ')}*/}
				{/*</pre>*/}
			</main>

			<Footer />
		</div>
	);

};

export default ModelPage;
