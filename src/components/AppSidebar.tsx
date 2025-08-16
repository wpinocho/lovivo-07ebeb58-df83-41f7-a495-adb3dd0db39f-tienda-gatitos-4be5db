import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Home, Heart, ShoppingCart, Info, Phone, Cat } from 'lucide-react';

const menuItems = [
  {
    title: "Inicio",
    url: "#",
    icon: Home,
  },
  {
    title: "Gatitos Disponibles",
    url: "#kittens",
    icon: Cat,
  },
  {
    title: "Favoritos",
    url: "#favorites",
    icon: Heart,
  },
  {
    title: "Mi Carrito",
    url: "#cart",
    icon: ShoppingCart,
  },
];

const infoItems = [
  {
    title: "Sobre Nosotros",
    url: "#about",
    icon: Info,
  },
  {
    title: "Contacto",
    url: "#contact",
    icon: Phone,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Cat className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-bold">Gatitos Felices</h2>
            <p className="text-sm text-muted-foreground">Tu tienda de adopción</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Información</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {infoItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground text-center">
          <p>🐱 Encuentra tu compañero perfecto</p>
          <p className="mt-1">© 2024 Gatitos Felices</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}