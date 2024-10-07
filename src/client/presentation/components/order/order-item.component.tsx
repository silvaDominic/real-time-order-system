import { ORDER_STATUS } from "../../../application/models/order.model";
import { Fragment } from "react";

interface OrderItemProps {
  customer: string,
  itemName: string,
  status: ORDER_STATUS,
  price: number,
  destination: string,
}

const COLORS = {
  [ORDER_STATUS.CREATED]: "blue",
  [ORDER_STATUS.COOKED]: "orange",
  [ORDER_STATUS.DRIVER_RECEIVED]: "yellow",
  [ORDER_STATUS.DELIVERED]: "green",
  [ORDER_STATUS.CANCELLED]: 'red',
  [ORDER_STATUS.UNKNOWN]: 'black',
}

export function OrderItem({customer, itemName, status, price, destination}: OrderItemProps) {
  function formatStatus(status: ORDER_STATUS): string {
    const str: string = status.toLowerCase()
    return str.charAt(0).toUpperCase() + str.slice(1).replace('_', ' ');
  }

  return (
    <>
      <td className={`status-bar ${COLORS[status]}`}></td>
      <td>{customer}</td>
      <td>{itemName}</td>
      <td>{formatStatus(status)}</td>
      <td>{price}</td>
      <td>{destination}</td>
    </>
  )
}
