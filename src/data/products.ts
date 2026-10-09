export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: "cc-mug-01",
    name: "Curiosity Corner Custom Mug",
    category: "Beard Oil",
    description: "Built for the bush. Made for the marriage.",
    price: 160.00,
    image: "/images/pic01.jpg"
  }
];