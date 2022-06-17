import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";

import { Product } from "types";

import Layout from "components/Layout/Layout";
import ProductCard from "components/ProductCard/ProductCard";

import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [_, setStartIndex] = useState<number>(0);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [productsCount, setProductsCount] = useState<number>(0);

  const getProducts = useCallback((index: number, search?: string) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?start=${index}&count=8${
          search ? `&search=${search}` : ""
        }`
      )
      .then((res) => {
        setProducts((prev) =>
          index === 0 ? res.data.products : [...prev, ...res.data.products]
        );
        setProductsLoading(false);
        setProductsCount(res.data.count);
      });
  }, []);

  const handleObserver = useCallback(
    (entries: any[], test: string) => {
      if (entries[0].isIntersecting) {
        setStartIndex((prev) => {
          getProducts(prev + 8, searchValue);
          return prev + 8;
        });
      }
    },
    [searchValue, getProducts]
  );

  const searchProducts = (event) => {
    setSearchValue(event.target.value);
    getProducts(0, event.target.value);
  };

  const loadingRef = useRef(null);

  useEffect(() => {
    getProducts(0);
  }, []);

  const testFunction = useCallback(() => {
    const obsOptions = {
      root: null,
      threshold: [0, 1.0],
    };
    const observer = new IntersectionObserver(
      (entries) => handleObserver(entries, searchValue),
      obsOptions
    );
    if (loadingRef?.current?.lastChild) {
      observer.observe(loadingRef?.current?.lastChild);
    }
  }, [searchValue, handleObserver]);

  useEffect(() => {
    testFunction();
  }, [loadingRef?.current, searchValue]);

  const loadingCards = [];
  for (let i = 0; i < 8; i++) {
    loadingCards.push(<ProductCard key={i} loading={productsLoading} />);
  }

  return (
    <>
      <Head>
        <title>FOODAWAA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={styles.searchContainer}>
          <h1 className="font-bold text-5xl">Welcome!</h1>
          <input
            className={styles.searchInput}
            placeholder="Recherchez un produit"
            onChange={searchProducts}
            // value={searchValue}
          />
        </div>
        <div
          className={styles.productsContainer}
          id="productsContainer"
          ref={loadingRef}
        >
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              loading={productsLoading}
            />
          ))}
          {products.length < productsCount && loadingCards.map((card) => card)}
        </div>
      </Layout>
    </>
  );
};

export default Home;
