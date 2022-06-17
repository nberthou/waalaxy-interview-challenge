import { NextPage } from "next";
import axios from "axios";

import Layout from "components/Layout/Layout";
import AddOrEditProductCard from "components/AddOrEditProductCard/AddOrEditProductCard";
import { Product, Tag } from "types";
import { getTagswithColors } from "utils";

const EditProduct: NextPage<{product: Product, allTags: Tag[]}> = ({
  product,
  allTags,
}) => {
  return (
    <Layout>
      <div>
        <AddOrEditProductCard product={product} allTags={allTags} />
      </div>
    </Layout>
  );
};

EditProduct.getInitialProps = async (ctx) => {
  const product = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${ctx.query.id}`)
    .then((res) => res.data.product);
  const allTags = await getTagswithColors();
  return { product, allTags };
};

export default EditProduct;
