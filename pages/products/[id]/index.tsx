import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { Product, Tag } from "types";
import styles from "styles/ProductPage.module.css";
import { getTagswithColors } from "utils";

import Layout from "components/Layout/Layout";
import Button from "components/Button/Button";
import ProductCard from "components/ProductCard/ProductCard";
import Link from "next/link";

const ProductPage: NextPage<{ similarProducts: Product[] }> = ({
  similarProducts,
}) => {
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    router.query.id &&
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${router.query.id}`)
        .then((res) => {
          setProduct(res.data.product);
        });
  }, [router.query.id]);

  const formattedTags = product && getTagswithColors(product.tags);
  const formattedPrice =
    product &&
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(product?.price);

  return (
    <Layout>
      <Head>
        <title>{product?.name}</title>
      </Head>
      <div className="flex justify-between">
        <img
          className={styles.productImage}
          alt={product?.description}
          src={product?.image}
        />
        <div className={styles.productDetails}>
          <div className="flex justify-between items-baseline">
            <h1 className={styles.productName}>{product?.name}</h1>
            <h2 className={styles.productPrice}>{formattedPrice}</h2>
          </div>
          <div className="flex flex-wrap gap-y-2">
            {formattedTags?.map((tag: Tag) => (
              <div
                className={styles.productTag}
                key={tag.name}
                style={{
                  color: tag.fontColor,
                  backgroundColor: tag.backgroundColor,
                }}
              >
                {tag.name}
              </div>
            ))}
          </div>
          <div className="text-2xl mt-6">
            <div className="font-bold">Description : </div>
            <div className={styles.productDescription}>
              {product?.description}
            </div>
          </div>
          <Link href={`${product?._id}/edit`}>
            <Button className={styles.editButton}>
              <FontAwesomeIcon icon={faPen} style={{ marginRight: "0.25em" }} />
              <span>Modifier</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <p className={styles.similarProductsTitle}>Articles similaires</p>
        <div className="flex mb-4">
          {similarProducts?.map((similarProduct: Product) => (
            <ProductCard
              product={similarProduct}
              loading={false}
              key={similarProduct._id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

ProductPage.getInitialProps = async (ctx) => {
  const product = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${ctx.query.id}`)
    .then((res) => res.data.product);
  const formattedTags = getTagswithColors(product?.tags);
  const similarProducts =
    formattedTags &&
    (await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?count=4${formattedTags
          .map((tag) => `&tags[]=${tag.name}`)
          .join("")}`
      )
      .then((res) =>
        res.data.products
          .filter((product: Product) => product._id !== ctx.query.id)
          .filter((_: never, ind: number) => ind < 3)
      ));

  return { similarProducts };
};

export default ProductPage;
