import axios from "axios";

import { Product, Tag } from "types";

export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
    fontColor: `rgba(${r}, ${g}, ${b})`,
  };
};

export const getTagswithColors = (tagsArray: string[]) => {
  return tagsArray.map((tag) => {
    const { backgroundColor, fontColor } = getRandomColor();
    return { name: tag, backgroundColor, fontColor };
  });
  // const tags: Tag[] = await axios
  //   .get(`${process.env.NEXT_PUBLIC_API_URL}/products?count=144`)
  //   .then((res) => {
  //     const tagsArray: string[] = Array.from(
  //       new Set(res.data.products.map((p: Product) => p.tags))
  //     ).flat();
  //     return tagsArray.map((tag: string) => {
  //       const { backgroundColor, fontColor } = getRandomColor();
  //       return {
  //         name: tag,
  //         backgroundColor: backgroundColor,
  //         fontColor: fontColor,
  //       };
  //     });
  //   });
  // return tags;
};
