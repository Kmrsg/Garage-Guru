/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { ServiceCard } from '../../service/types/type';
import type { Service, User } from '../type';

export const fetchLogOut = async (): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/logout');
  const data: { message: string } = await res.json();
  return data;
};

export const fetchSignIn = async (user: User): Promise<{ message: string; user: User }> => {
  const res = await fetch('/api/auth/sign-in', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const fetchSignInService = async (
  service: Service,
): Promise<{ message: string; service: ServiceCard }> => {
  const res = await fetch('/api/auth/sign-in/service', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(service),
  });

  return res.json();
};

export const fetchSignUp = async (user: User): Promise<User> => {
  const res = await fetch('/api/auth/sign-up', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  // Добавляем setTimeout на 1 секунду

  return res.json();
};

export const fetchSignUpService = async (service: Service): Promise<ServiceCard> => {
  const res = await fetch('/api/auth/sign-up/service', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(service),
  });
  return res.json();
};

export const fetchCheckUser = async (): Promise<{ message: string; user: User }> => {
  const res = await fetch('/api/auth/check');
  if (res.status > 399) {
    throw new Error('Такого сервиса не существует или пароль неверный');
  }
  const data = await res.json();

  return data;
};

export const fetchCheckService = async (): Promise<{ message: string; service: ServiceCard }> => {
  const res = await fetch('/api/auth/check/service');
  if (res.status > 399) {
    throw new Error('Такого сервиса не существует или пароль неверный');
  }

  const data = await res.json();
  return data;
};
