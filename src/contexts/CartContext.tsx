import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Kitten } from '@/types/kitten';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (kitten: Kitten) => void;
  removeFromCart: (kittenId: string) => void;
  updateQuantity: (kittenId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (kitten: Kitten) => {
    console.log('Adding kitten to cart:', kitten.name);
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.kitten.id === kitten.id);
      if (existingItem) {
        toast({
          title: "Gatito ya en el carrito",
          description: `${kitten.name} ya está en tu carrito.`,
        });
        return prevItems;
      }
      toast({
        title: "¡Gatito agregado!",
        description: `${kitten.name} ha sido agregado al carrito.`,
      });
      return [...prevItems, { kitten, quantity: 1 }];
    });
  };

  const removeFromCart = (kittenId: string) => {
    console.log('Removing kitten from cart:', kittenId);
    setItems(prevItems => {
      const item = prevItems.find(item => item.kitten.id === kittenId);
      if (item) {
        toast({
          title: "Gatito removido",
          description: `${item.kitten.name} ha sido removido del carrito.`,
        });
      }
      return prevItems.filter(item => item.kitten.id !== kittenId);
    });
  };

  const updateQuantity = (kittenId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(kittenId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.kitten.id === kittenId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    console.log('Clearing cart');
    setItems([]);
    toast({
      title: "Carrito vaciado",
      description: "Todos los gatitos han sido removidos del carrito.",
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.kitten.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};