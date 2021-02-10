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
  // OpenWeatherMapの天気の情報を取得
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=35.4122&lon=139.4130&units=metric&exclude=hourly,minutely&appid=9b8962e92bfba5b1dc4eaa368acdf666`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  // NewsAPIのトップ記事の情報を取得
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=10&apiKey=a8bdc169bdcd495a8e0857f012c974e0`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  // NewsAPIのコロナウイルス記事の情報を取得


  return {
    props: {
      topArticles,
    },
    revalidate: 60,
  };
};
