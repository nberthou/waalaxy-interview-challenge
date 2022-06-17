import { NextPage } from "next";
import axios from "axios";

import Layout from "components/Layout/Layout";
import AddOrEditProductCard from "components/AddOrEditProductCard/AddOrEditProductCard";
import { Tag } from "types";
import { getTagswithColors } from "utils";

const CreateProduct: NextPage<{ allTags: Tag[] }> = ({ allTags }) => {
  return (
    <Layout>
      <div>
        <AddOrEditProductCard allTags={allTags} />
      </div>
    </Layout>
  );
};

CreateProduct.getInitialProps = async (ctx) => {
  const allTags = await getTagswithColors();
  return { allTags };
};

export default CreateProduct;
