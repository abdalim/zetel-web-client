import { Dispatch } from 'redux'

import * as orderApi from '../../api/order.api'
import { Order } from '../../interfaces'

export enum Action {
  GetOrderRequest = 'GetOrderRequest',
  GetOrderSuccessful = 'GetOrderSuccessful',
  GetOrderFailed = 'GetOrderFailed',
}

/**
 *
 * ACTION CREATORS
 *
 */

const getOrderRequest = (isPoll = false) => ({
  type: Action.GetOrderRequest,
  data: isPoll
    ? {
        isPoll,
        error: undefined,
      }
    : {
        isPoll,
        order: undefined,
        error: undefined,
      },
})

const getOrderSuccessful = (order: Order) => ({
  type: Action.GetOrderSuccessful,
  data: {
    order,
  },
})

const getOrderFailure = (error: Error) => ({
  type: Action.GetOrderFailed,
  data: {
    error,
  },
})

/**
 *
 * ACTIONS
 *
 */

export const getOrder = (id: number, isPoll = false) => (
  dispatch: Dispatch
) => {
  dispatch(getOrderRequest(isPoll))

  orderApi
    .get(id)
    .then((result) => {
      console.debug('get order successful', result)
      dispatch(getOrderSuccessful(result.body))
    })
    .catch((error) => {
      console.error(error)
      dispatch(getOrderFailure(error))
    })
}
