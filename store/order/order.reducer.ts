import { AnyAction } from 'redux'

import { Order } from '../../interfaces'

import { Action } from './order.action'

export interface OrderState {
  type?: Action
  isPoll: boolean
  order?: Order
  error?: Error
}

const initialState: OrderState = {
  type: undefined,
  isPoll: false,
  order: undefined,
  error: undefined,
}

const orderReducer = (state: OrderState = initialState, action: AnyAction) => {
  switch (action.type) {
    case Action.GetOrderRequest:
    case Action.GetOrderSuccessful:
    case Action.GetOrderFailed:
    case Action.CreateOrderRequest:
    case Action.CreateOrderSuccessful:
    case Action.CreateOrderFailed:
      return {
        ...state,
        type: action.type,
        ...action.data,
      }
    default:
      return state
  }
}

export default orderReducer
