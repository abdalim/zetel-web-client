import fetch from 'isomorphic-unfetch'

import { Order } from '../interfaces'

export const get = (
  id: number
): Promise<{
  body: Order
}> => {
  return fetch(`http://localhost:3001/order/${id}`, {
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
  return fetch(`http://localhost:3001/order`, {
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
