import { ChangeEvent, FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import styles from "styles/AddOrEditProductCard.module.css";
import { Product, Tag } from "types";
import Button from "components/Button/Button";
import { getRandomColor } from "utils";
import axios from "axios";

const AddOrEditProductCard: FC<{ product?: Product; allTags: Tag[] }> = ({
  product,
  allTags,
}) => {
  const formattedTags =
    product &&
    allTags.filter((tag: Tag) => (product?.tags || [])?.indexOf(tag.name) > -1);

  const [tags, setTags] = useState<Tag[]>(formattedTags || []);
  const [tagInput, setTagInput] = useState<string>("");
  const { push } = useRouter();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: product?.name || "",
      price: product?.price || 0,
      description: product?.description || "",
      image: product?.image || "",
      tags: tags.map((tag) => tag.name),
    },
    onSubmit: (values) => {
      const parameters = { ...values, tags: tags.map((tag) => tag.name) };
      if (product) {
        axios
          .put(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${product?._id}`,
            parameters
          )
          .then((res) => {
            push(`/products/${res.data.product._id}`);
          });
      } else {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/products/`, parameters)
          .then((res) => {
            push(`/products/${res.data.product._id}`);
          });
      }
    },
  });
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
      <form onSubmit={handleSubmit} className={` ${styles.formContainer}`}>
        <div className={`flex w-full justify-between mt-5 mb-2.5`}>
          <div className="w-8/12">
            <p className={styles.label}>Nom du produit</p>
            <input
              type="text"
              name="name"
              className={styles.input}
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className={styles.label}>Prix</p>
            <input
              type="number"
              name="price"
              className={styles.input}
              value={values.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full my-2.5">
          <p className={styles.label}>Description</p>
          <textarea
            className={styles.textArea}
            name="description"
            rows={3}
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-2.5">
          <p className={styles.label}>Image</p>
          <input
            className={styles.input}
            name="image"
            value={values.image}
            onChange={handleChange}
          />
        </div>
        <div className="w-full my-2.5">
          <p className={styles.label}>Tags</p>
          <input
            placeholder="Write a tag and hit enter to add it."
            className={styles.input}
            name="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const { backgroundColor, fontColor } = getRandomColor();
                setTags((prev) => [
                  ...prev,
                  {
                    name: (e as unknown as ChangeEvent<HTMLInputElement>).target
                      .value,
                    backgroundColor,
                    fontColor,
                  },
                ]);
                setTagInput("");
              }
            }}
          />
          <div className={styles.tagsContainer}>
            {tags.map((tag: Tag) => (
              <div
                className={styles.productTag}
                key={tag.name}
                style={{
                  color: tag.fontColor,
                  backgroundColor: tag.backgroundColor,
                }}
                onClick={() =>
                  setTags((prev) => prev.filter((t) => t.name !== tag.name))
                }
              >
                <p>{tag.name}</p>
                <FontAwesomeIcon icon={faXmark} size="sm" fontWeight="bold" />
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="mt-5">
          Update
        </Button>
      </form>
    </div>
  );
};

export default AddOrEditProductCard;
