import type {
  Mark,
  OrderAdd,
  Usluga,
  UslugaPrice,
  UslugaPriceAdd,
  UslugasAdd,
} from './types/types';

export async function fetchOrdersLoad(): Promise<OrderAdd[]> {
  const res = await fetch('/api/order');
  return res.json();
}

export async function fetchOrderAdd(obj: {
  user_id: number;
  service_id: number;
  data: string;
  uslugaPrice_id: number;
}): Promise<OrderAdd> {
  const res = await (
    await fetch(`/api/order`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(obj),
    })
  ).json();

  console.log(res);

  return res;
}

export async function fetchUslugas(): Promise<Usluga[]> {
  const res = await fetch('/api/uslugas');
  return res.json();
}

export async function fetchMarks(): Promise<Mark[]> {
  const res = await fetch('/api/marks');
  return res.json();
}

export async function fetchAddUslugas(uslugaPrice: UslugaPriceAdd): Promise<UslugaPrice> {
  const res = await fetch('/api/uslugasPrice', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(uslugaPrice),
  });
  return res.json();
}
export async function fetchUslugasPrice(): Promise<UslugaPrice[]> {
  const res = await fetch('/api/uslugasPrice');
  return res.json();
}
export async function fetchUslugaPriceDelete(id: number): Promise<number> {
  const res = await fetch(`/api/uslugasPrice/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function fetchUpdUslugas(uslugaPrice: UslugaPriceAdd): Promise<UslugaPrice> {
  const res = await fetch(`/api/uslugasPrice/${uslugaPrice.id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(uslugaPrice),
  });
  return res.json();
}
