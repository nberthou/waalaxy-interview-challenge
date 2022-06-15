import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import { Product } from "types";
import styles from "styles/ProductPage.module.css";

import Layout from "components/Layout/Layout";

const ProductPage: NextPage = () => {
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    console.log("allo ?"), `${process.env.API_URL}/products/${router.query.id}`;
    router.query.id &&
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${router.query.id}`)
        .then((res) => {
          console.log("res.data", res.data);
          setProduct(res.data.product);
        });
  }, [router.query.id]);

  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(product?.price);
  console.log("test", product);
  return (
    <Layout>
      <div className={styles.productContainer}>
        <img
          className={styles.productImage}
          alt={product?.description}
          src={product?.image}
        />
        <div className={styles.productDetails}>
          <div className={styles.nameAndPrice}>
            <h1 className={styles.productName}>{product?.name}</h1>
            <h2 className={styles.productPrice}>{formattedPrice}</h2>
          </div>
          <div className={styles.tagsContainer}>
            {product?.tags.map((tag) => (
              <div className={styles.productTag} key={tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
