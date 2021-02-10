import Head from 'next/head'
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
    </MainLayout>
  )
}


export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=10&apiKey=a8bdc169bdcd495a8e0857f012c974e0`
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