import fetch from 'isomorphic-unfetch'

import { Order } from '../interfaces'

export const get = (): Promise<{
  body: Order[]
}> => {
  return fetch(`http://localhost:3001/order`, {
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
