import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
  ChangeEvent,
} from "react";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";

import { Product } from "types";
import useInfiniteScroll from "utils/hooks/useInfiniteScroll";

import Layout from "components/Layout/Layout";
import ProductCard from "components/ProductCard/ProductCard";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [productsCount, setProductsCount] = useState<number>(0);

  const getProducts = (index?: number = startIndex) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products?start=${index}&count=8`)
      .then((res) => {
        setProducts((prev) => prev.concat(res.data.products));
        setProductsLoading(false);
        setProductsCount(res.data.count);
      });
  };

  const handleObserver = (entries) => {
    if (entries[0].isIntersecting) {
      setStartIndex((prev) => {
        getProducts(prev + 8);
        return prev + 8;
      });
    }
  };

  const searchProducts = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const loadingRef = useRef(null);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (loadingRef?.current?.lastChild) {
      const obsOptions = {
        root: null,
        threshold: [0, 1.0],
      };

      const observer = new IntersectionObserver(handleObserver, obsOptions);
      observer.observe(loadingRef?.current?.lastChild);
    }
  }, [loadingRef.current]);

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
            onChange={(e) => searchProducts}
            value={searchValue}
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
