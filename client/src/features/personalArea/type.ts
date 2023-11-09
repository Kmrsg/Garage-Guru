export type UslugaPrice = {
  id: number;
  usluga_id: number;
  service_id: number;
  cost: number;
  mark_id: number;
  carModel_id: number;
  CarModel: CarModel;
  Mark: Mark;
  Usluga: Usluga;
};

export type OrderItemID = Order['id'];
export type UslugaPriceOrder = {
  id: number;
  usluga_id: number;
  service_id: number;
  cost: number;
  mark_id: number;
  carModel_id: number;
  CarModel: CarModel;
  Mark: Mark;
  Usluga: Usluga;
  OrderItems: OrderItems[];
};

export type Usluga = {
  id: number;
  title: string;
};
export type CarModel = {
  id: number;
  mark_id: number;
  title: string;
};
export type Mark = {
  id: number;
  title: string;
  CarModels: CarModel[];
};
export type User = {
  id?: number;
  name?: string;
  email: string;
  phone?: string;
  password: string;
  isAdmin?: boolean;
};
export type OrderItems = {
  id: number;
  isClosed: boolean;
  date: string;
  Order: Order;
};
export type Order = {
  id: number;
  user_id: number;
  User: User;
};
export type UpdateStatus = {
  orderItem_id: number;
  uslugaPrice_id: number;
};
