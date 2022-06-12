import { useState, useEffect } from "react";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";

import Layout from "components/Layout/Layout";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`).then((res) => {
      setProducts((prev: any) => [...prev, ...res.data.products]);
      setProductsLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>FOODAWAA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={styles.searchContainer}>
          <h1 className="font-bold text-5xl">Welcome!</h1>
          <input />
        </div>
      </Layout>
    </>
  );
};

export default Home;
