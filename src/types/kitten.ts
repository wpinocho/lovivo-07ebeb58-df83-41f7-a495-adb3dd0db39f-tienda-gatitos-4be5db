export interface Kitten {
  id: string;
  name: string;
  breed: string;
  age: string;
  price: number;
  image: string;
  description: string;
  personality: string[];
  available: boolean;
}

export interface CartItem {
  kitten: Kitten;
  quantity: number;
}