import Head from "next/head";
import MainLayout from "../layouts";
import styles from "../styles/Home.module.scss";
import Article from "../components/article";
import Nav from "../components/nav";

export default function Home(props) {
  return (
    <MainLayout>
      <Head>
        <title>Simple News</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main}>
          <Article title="headline" articles={props.topArticles} />
        </div>
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

  // OpenWeatherMapの天気の情報を取得
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=35.4122&lon=139.4130&units=metric&exclude=hourly,minutely&appid=9b8962e92bfba5b1dc4eaa368acdf666`
  );
  const weatherJson = await weatherRes.json();
  const weatherNews = weatherJson;

  return {
    props: {
      topArticles,
    },
    revalidate: 60,
  };
};