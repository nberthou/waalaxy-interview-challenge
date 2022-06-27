import { NextPage } from "next";
import axios from "axios";

import Layout from "components/Layout/Layout";
import AddOrEditProductCard from "components/AddOrEditProductCard/AddOrEditProductCard";
import { Product } from "types";

const EditProduct: NextPage<{product: Product}> = ({
  product,
}) => {
  return (
    <Layout>
      <div>
        <AddOrEditProductCard product={product} />
      </div>
    </Layout>
  );
};

EditProduct.getInitialProps = async (ctx) => {
  const product = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${ctx.query.id}`)
    .then((res) => res.data.product);
  // const allTags = await getTagswithColors();
  return { product };
};

export default EditProduct;
