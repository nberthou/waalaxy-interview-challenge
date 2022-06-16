import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "styles/AddOrEditProductCard.module.css";
import { Product } from "types";

const AddOrEditProductCard: FC<{ product: Product }> = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className="flex items-center">
        <div className={styles.headerLogo}>
          <FontAwesomeIcon icon={product ? faPen : faPlus} color="white" />
        </div>
        <div className="ml-3">
          <h1 className={styles.headerTitle}>
            {product ? "Edit product information" : "Add a new product"}
          </h1>
          <h2>Lorem ipsum</h2>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditProductCard;
