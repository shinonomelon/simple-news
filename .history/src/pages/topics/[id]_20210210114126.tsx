import Head from "next/head";
import fetch from "node-fetch";
import { useRouter } from "next/router";
import Article from '../../components/article'
import Nav from '../../components/nav'
import MainLayout from "../../layouts/index";
import styles from "../../styles/Home.module.scss";

function Topic(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <Head>
        <title>Simple News - {props.title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav} >
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main}>
          <Article title={props.title} articles={props.topicArticles} />
        </div>
      </div>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {

  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=software&language=jp&sortBy=popularity&pageSize=5&apiKey=a8bdc169bdcd495a8e0857f012c974e0`
  );
  const pickupJson = await pickupRes.json();
  const pickupArticles = pickupJson?.articles;

  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&country=jp&apiKey=a8bdc169bdcd495a8e0857f012c974e0`
  );
  const topicJson = await topicRes.json();
  const topicArticles = await topicJson.articles;

  const title = params.id;

  return {
    props: { weatherNews, pickupArticles, topicArticles, title },
    revalidate: 60 * 60,
  };
}

export default Topic;