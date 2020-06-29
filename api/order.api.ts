import fetch from 'isomorphic-unfetch'

import { Order } from '../interfaces'

const ORDERS_API_HOST = process.env.NEXT_PUBLIC_ORDERS_API_HOST

export const get = (
  id: number
): Promise<{
  body: Order
}> => {
  return fetch(`${ORDERS_API_HOST}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      return {
        body: data,
      }
    })
}

export interface CreateOrderDto {
  item: string
  price: number
}

export const create = (params: CreateOrderDto) => {
  return fetch(`${ORDERS_API_HOST}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      return {
        body: data,
      }
    })
}

export const cancel = (id: number) => {
  return fetch(`${ORDERS_API_HOST}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      return {
        body: data,
      }
    })
}
