/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/prefer-default-export */

import type { Service } from '../LogReg/type';

export const fetchUpdatePhoto = async (
  obj: Service,
): Promise<{ message: string; service: Service }> => {
  const res = await fetch(`/api/service/person/${obj.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  return data;
};

export const fetchUpdateStatus = async (
  id: number,
): Promise<{ message: string; service: Service }> => {
  const res = await fetch(`/api/service/person/status/${id}`, {
    method: 'put',
  });
  const data = await res.json();
  return data;
};
export const fetchDeleteOne = async (id: number): Promise<{ message: string; id: number }> => {
  const res = await fetch(`/api/service/person/delete/${id}`, {
    method: 'delete',
  });

  const data = await res.json();
  console.log(data);

  return data;
};
