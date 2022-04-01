import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>3d browser</title>
        <meta name="description" content="my 3d models" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello 3d world!
        </h1>
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
