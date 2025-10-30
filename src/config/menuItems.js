import { Home, ShoppingBag, Package, Settings } from 'lucide-react';

export const menuItems = [
  {
    title: "Home",
    link: "/",
    icon: Home,
    allowedRoles: ["customer", "admin"]
  },
  {
    title: "My Order",
    link: "/my-order",
    icon: ShoppingBag,
    allowedRoles: ["customer", "admin"]
  },
  {
    title: "Orders",
    link: "/admin/orders",
    icon: Package,
    allowedRoles: ["admin"]
  },
  {
    title: "Products",
    link: "/admin/products",
    icon: Settings,
    allowedRoles: ["admin"]
  }
];
