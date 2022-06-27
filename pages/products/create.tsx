import { NextPage } from "next";

import Layout from "components/Layout/Layout";
import AddOrEditProductCard from "components/AddOrEditProductCard/AddOrEditProductCard";

const CreateProduct: NextPage = () => {
  return (
    <Layout>
      <div>
        <AddOrEditProductCard />
      </div>
    </Layout>
  );
};

export default CreateProduct;
