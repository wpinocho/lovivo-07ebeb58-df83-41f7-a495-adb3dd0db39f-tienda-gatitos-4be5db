import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { CartProvider } from '@/contexts/CartContext';
import KittenStore from '@/components/KittenStore';
import Cart from '@/components/Cart';

const Index = () => {
  console.log('Rendering Index page - Kitten Store');
  
  return (
    <CartProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-4 lg:p-6">
            <div className="flex justify-between items-center mb-6">
              <SidebarTrigger />
              <Cart />
            </div>
            <KittenStore />
          </main>
        </div>
      </SidebarProvider>
    </CartProvider>
  );
};

export default Index;