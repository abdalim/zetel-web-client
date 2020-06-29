import fetch from 'isomorphic-unfetch'

import { Order } from '../interfaces'

const ORDERS_API_HOST = process.env.NEXT_PUBLIC_ORDERS_API_HOST

export const get = (): Promise<{
  body: Order[]
}> => {
  return fetch(`${ORDERS_API_HOST}`, {
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
