import type { User } from '../../LogReg/type';
import type { UslugaPrice } from '../../usluga/types/types';

export type ServiceCard = {
  id: number;
  title: string;
  email: string;
  adress: string;
  phone: string;
  img: string;
  Sales: Sale[];
  UslugaPrices: UslugaPrice[];
  Comments: Comment[];
  Rates: Rate[];
  isChecked: boolean;
};
export type Comment = {
  id: number;
  user_id: number;
  service_id: number;
  text: string;
  User: User;
  updatedAt: Date;
};
export type CommentData = {
  user_id: number;
  service_id: number;
  text: string;
  rate?: number;
};
export type CommentRes = {
  comment: Comment;
  rate?: Rate;
};
export type Rate = {
  id: number;
  user_id: number;
  service_id: number;
  score: number;
};
export type CommentDelete = {
  comment_id: number;
  service_id: number;
  rate_id: number;
};
export type CommentDeleteData = {
  comment_id: number;
  rate_id: number;
};
export type ServicesState = {
  services: ServiceCard[];
  error: string | null;
  loading: boolean;
  city: string;
};
export type Sale = {
  id: number;
  service_id: number;
  img: string;
  text: string;
};
export type SaleId = Sale['id'];
