import Head from "next/head";
import { ListNewsOutput, newsService } from "../services/News.service";
import styles from "../styles/Home.module.css";

type Props = {
  allPostsData: ListNewsOutput[];
};

export async function getStaticProps() {
  const allPostsData = await newsService.listNews();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Real News</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Live<a href="#">News</a>
        </h1>

        <p className={styles.description}>
          Your <code className={styles.code}>code</code> portal
        </p>

        <div className={styles.grid}>
          {allPostsData.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="blank"
              className={styles.card}
            >
              <h2>{post.title} &rarr;</h2>
              <p>{post.description}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/johnsmera"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered with ♥
        </a>
      </footer>
    </div>
  );
}