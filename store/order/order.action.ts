import { Dispatch } from 'redux'

import * as orderApi from '../../api/order.api'
import { Order } from '../../interfaces'

export enum Action {
  GetOrderRequest = 'GetOrderRequest',
  GetOrderSuccessful = 'GetOrderSuccessful',
  GetOrderFailed = 'GetOrderFailed',
  CreateOrderRequest = 'CreateOrderRequest',
  CreateOrderSuccessful = 'CreateOrderSuccessful',
  CreateOrderFailed = 'CreateOrderFailed',
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

const createOrderRequest = () => ({
  type: Action.CreateOrderRequest,
  data: {
    isPoll: false,
    order: undefined,
    error: undefined,
  },
})

const createOrderSuccessful = (order: Order) => ({
  type: Action.CreateOrderSuccessful,
  data: {
    order,
  },
})

const CreateOrderFailed = (error: Error) => ({
  type: Action.CreateOrderFailed,
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
      console.error('Failed to fetch order', error)
      dispatch(getOrderFailure(error))
    })
}

export const createOrder = (param: orderApi.CreateOrderDto) => (
  dispatch: Dispatch
) => {
  dispatch(createOrderRequest())

  orderApi
    .create(param)
    .then((result) => {
      console.debug('create order successful', result)
      dispatch(createOrderSuccessful(result.body))
    })
    .catch((error) => {
      console.error('Failed to create order', error)
      dispatch(CreateOrderFailed(error))
    })
}
