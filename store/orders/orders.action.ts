import { Dispatch } from 'redux'

import * as ordersApi from '../../api/orders.api'
import { Order } from '../../interfaces'

export enum Action {
  GetOrdersRequest = 'GetOrdersRequest',
  GetOrdersSuccessful = 'GetOrdersSuccessful',
  GetOrdersFailed = 'GetOrdersFailed',
}

/**
 *
 * ACTION CREATORS
 *
 */

const getOrdersRequest = (isPoll = false) => ({
  type: Action.GetOrdersRequest,
  data: isPoll
    ? {
        isPoll,
        error: undefined,
      }
    : {
        isPoll,
        orders: undefined,
        error: undefined,
      },
})

const getOrdersSuccessful = (orders: Order[]) => ({
  type: Action.GetOrdersSuccessful,
  data: {
    orders,
  },
})

const getOrdersFailure = (error: Error) => ({
  type: Action.GetOrdersFailed,
  data: {
    error,
  },
})

/**
 *
 * ACTIONS
 *
 */

export const getOrders = (isPoll = false) => (dispatch: Dispatch) => {
  dispatch(getOrdersRequest(isPoll))

  ordersApi
    .get()
    .then((result) => {
      console.debug('get orders successful', result)
      dispatch(getOrdersSuccessful(result.body))
    })
    .catch((error) => {
      console.error(error)
      dispatch(getOrdersFailure(error))
    })
}
