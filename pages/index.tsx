import type { NextPage } from "next";
import Head from "next/head";
import Layout from 'components/Layout/Layout';
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>FOODAWAA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div></div>
      </Layout>
    </>
  );
};

export default Home;
