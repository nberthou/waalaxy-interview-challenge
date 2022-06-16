import { useState } from "react";
import axios from "axios";

import { Tag } from "types";

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomColorBis = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
    fontColor: `rgba(${r}, ${g}, ${b})`,
  };
};

export const getTagswithColors = async () => {
  let tags: Tag[] = [];
  tags = axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/products?count=144`)
    .then((res) => {
      const tagsArray = [
        ...new Set(res.data.products.map((p) => p.tags).flat()),
      ];
      return tagsArray.map((tag: string) => {
        const { backgroundColor, fontColor } = getRandomColorBis();
        return {
          name: tag,
          backgroundColor: backgroundColor,
          fontColor: fontColor,
        };
      });
    });
  return tags;
};