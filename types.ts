export type Product = {
  _id: string;
  createdAt: string;
  description: string;
  image: string;
  name: string;
  price: number;
  tags: string[];
  updatedAt: string;
};

export type Tag = {
  name: string;
  backgroundColor: string;
  fontColor: string;
};
