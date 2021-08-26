export interface IProduct {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  formattedPrice: string;
}

export interface ICartProduct extends IProduct {
  quantity: number;
}
