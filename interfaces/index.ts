export enum OrderStatus {
  Created = 'created',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Delivered = 'delivered',
}

export type Order = {
  id: number
  item: string
  price: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}
