import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dish, Order, OrderStatus } from '@/types/menu';

interface AppState {
  dishes: Dish[];
  orders: Order[];
  addDish: (dish: Dish) => void;
  updateDish: (id: string, updates: Partial<Dish>) => void;
  removeDish: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  getTodayOrders: () => Order[];
  getTodayRevenue: () => number;
}

const SAMPLE_DISHES: Dish[] = [
  {
    id: '1', name: 'Masala Dosa', category: 'Breakfast', price: 80,
    available: true, timeSlots: ['morning'], createdAt: new Date().toISOString(),
  },
  {
    id: '2', name: 'Butter Chicken', category: 'Main Course', price: 280,
    available: true, offer: '10% off', offerPercent: 10, timeSlots: ['evening', 'night'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3', name: 'Gulab Jamun', category: 'Desserts', price: 60,
    available: true, timeSlots: ['evening', 'night'], createdAt: new Date().toISOString(),
  },
  {
    id: '4', name: 'Mango Lassi', category: 'Beverages', price: 50,
    available: true, timeSlots: ['morning', 'evening', 'night'], createdAt: new Date().toISOString(),
  },
  {
    id: '5', name: 'Chicken Biryani', category: 'Biryani & Rice', price: 220,
    available: true, timeSlots: ['evening', 'night'], createdAt: new Date().toISOString(),
  },
];

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-001', tableNumber: 3,
    items: [{ dishId: '1', dishName: 'Masala Dosa', quantity: 2, price: 80 }],
    totalPrice: 160, status: 'pending', createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-002', tableNumber: 7,
    items: [
      { dishId: '2', dishName: 'Butter Chicken', quantity: 1, price: 252 },
      { dishId: '4', dishName: 'Mango Lassi', quantity: 2, price: 50 },
    ],
    totalPrice: 352, status: 'preparing', createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-003', tableNumber: 1,
    items: [{ dishId: '5', dishName: 'Chicken Biryani', quantity: 1, price: 220 }],
    totalPrice: 220, status: 'completed', createdAt: new Date().toISOString(),
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      dishes: SAMPLE_DISHES,
      orders: SAMPLE_ORDERS,
      addDish: (dish) => set((s) => ({ dishes: [...s.dishes, dish] })),
      updateDish: (id, updates) =>
        set((s) => ({
          dishes: s.dishes.map((d) => (d.id === id ? { ...d, ...updates } : d)),
        })),
      removeDish: (id) => set((s) => ({ dishes: s.dishes.filter((d) => d.id !== id) })),
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      getTodayOrders: () => {
        const today = new Date().toDateString();
        return get().orders.filter((o) => new Date(o.createdAt).toDateString() === today);
      },
      getTodayRevenue: () => {
        const today = new Date().toDateString();
        return get()
          .orders.filter((o) => new Date(o.createdAt).toDateString() === today && o.status !== 'pending')
          .reduce((sum, o) => sum + o.totalPrice, 0);
      },
    }),
    { name: 'hotel-admin-store' }
  )
);
