import Head from "next/head";
import MainLayout from "../layouts";
import styles from "../styles/Home.module.scss";
import Article from "../components/article";
import Nav from "../components/nav";

export default function Home(props) {
  console.log(props.topArticles);
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.nav}>
        <nav>
          <Nav />
        </nav>
      </div>
      <div className={styles.blank} />
      <div className={styles.main}>
        <Article title="headlines" articles={props.topArticles} />
      </div>
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  return {
    props: {
      topArticles,
    },
    revalidate: 60,
  };
};