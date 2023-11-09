/* eslint-disable @typescript-eslint/consistent-type-imports */
import { OrderItems, UslugaPriceOrder } from '../personalArea/type';
import { ServiceCard } from '../service/types/type';

export type User = {
  id?: number;
  name?: string;
  email: string;
  phone?: string;
  password: string;
  isAdmin?: boolean;
};
export type Service = {
  id?: number;
  title?: string;
  email?: string;
  adress?: string;
  phone?: string;
  password?: string;
  tarif?: string;
  img?: string;
  isChecked?: boolean;
};

export type AuthState = {
  uslugas: UslugaPriceOrder[];
  user: User | undefined;
  service: ServiceCard | undefined;
  orderItems: OrderItems[];
  error: string | null;
};
export type Auth2 = {
  user: User | undefined;
  service: ServiceCard | undefined;
  error: string | null;
};
export type UslugaPrice = {
  OrderItems: any;
  Usluga: any;
  Mark: any;
  CarModel: any;
  id: number;
  usluga_id: number;
  service_id: number;
  cost: number;
  mark_id: number;
  model_id: number;
  OrderItem: OrderItem;
  Order: Order;
};

export type OrderItem = {
  id: number;
  order_id: number;
  UslugaPrice_id: number;
  Date: string;
};
export type OrderItemUpdate = {
  id: number;
  order_id: number;
  UslugaPrice_id: number;
};
export type Order = {
  user_id: number;
};
