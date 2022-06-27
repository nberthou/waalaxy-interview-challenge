import { ChangeEvent, FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import styles from "styles/AddOrEditProductCard.module.css";
import { Product, Tag } from "types";
import Button from "components/Button/Button";
import { getRandomColor, getTagswithColors } from "utils";
import axios from "axios";

type FormValues = Omit<Product, "_id" | "createdAt" | "updatedAt" | "tags"> & {
  tags: string;
};

type FormErrors = {
  [Property in keyof FormValues]: string;
};

const AddOrEditProductCard: FC<{ product?: Product }> = ({ product }) => {
  const formattedTags = product && getTagswithColors(product.tags);

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormErrors> = {};

    if (values.name.length < 3) {
      errors.name = "Name must be 3 characters or more.";
    } else if (values.name.length > 50) {
      errors.name = "Name must be 50 characters or less.";
    }

    if (values.description.length < 3) {
      errors.description = "Description must be 3 characters or more.";
    } else if (values.description.length > 500) {
      errors.description = "Description must be 500 characters or less.";
    }

    console.log("tags", values.tags, tags);

    if (values.tags.length > 0 && values.tags.length < 3) {
      errors.tags = "Tag must be 3 characters or more.";
    } else if (values.tags.length > 0 && values.tags.length > 50) {
      errors.tags = "Tag must be 50 characters or less.";
    } else if (tags.find((tag) => tag.name === values.tags)) {
      errors.tags = "Tag already exists.";
    }
    Object.keys(values)
      .filter((value) => value !== "tags" && value !== "price")
      .map((value) => {
        console.log(values[value as keyof Omit<FormValues, "tags" | "price">]);
        if (!values[value as keyof Omit<FormValues, "tags" | "price">]) {
          errors[value as keyof Omit<FormValues, "tags" | "price">] =
            "Field is required";
        }
      });

    if (!tags.length && !values.tags.length) {
      errors.tags = "There must be at least one tag";
    }

    return errors;
  };

  const [tags, setTags] = useState<Tag[]>(formattedTags || []);
  const { push } = useRouter();
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    setErrors,
  } = useFormik({
    initialValues: {
      name: product?.name || "",
      price: product?.price || 0,
      description: product?.description || "",
      image: product?.image || "",
      tags: "",
    },
    validate: validateForm,
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
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <div className={styles.errorMessage}>{errors.name}</div>
            ) : null}
          </div>
          <div>
            <p className={styles.label}>Prix</p>
            <input
              type="number"
              name="price"
              className={styles.input}
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price ? (
              <div className={styles.errorMessage}>{errors.price}</div>
            ) : null}
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
            onBlur={handleBlur}
          />
          {errors.description && touched.description ? (
            <div className={styles.errorMessage}>{errors.description}</div>
          ) : null}
        </div>
        <div className="w-full my-2.5">
          <p className={styles.label}>Image</p>
          <input
            className={styles.input}
            name="image"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.image && errors.image ? (
            <div className={styles.errorMessage}>{errors.image}</div>
          ) : null}
        </div>
        <div className="w-full my-2.5">
          <p className={styles.label}>Tags</p>
          <input
            placeholder="Write a tag and hit enter to add it."
            className={styles.input}
            name="tags"
            value={values.tags}
            onChange={handleChange}
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
                !errors.tags && setFieldValue("tags", "", true);
              }
            }}
            // onBlur={handleBlur}
          />
          {errors.tags ? (
            <div className={styles.errorMessage}>{errors.tags}</div>
          ) : null}
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
