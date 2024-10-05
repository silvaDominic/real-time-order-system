import { ORDER_STATUS } from "../../../application/models/order.model";
import { Fragment } from "react";

interface OrderItemProps {
  customer: string,
  itemName: string,
  status: ORDER_STATUS,
  price: number,
  destination: string,
}

export function OrderItem({customer, itemName, status, price, destination}: OrderItemProps) {
  function formatStatus(status: ORDER_STATUS): string {
    const str: string = status.toLowerCase()
    return str.charAt(0).toUpperCase() + str.slice(1).replace('_', ' ');
  }

  return (
    <>
      <td>{customer}</td>
      <td>{itemName}</td>
      <td>{formatStatus(status)}</td>
      <td>{price}</td>
      <td>{destination}</td>
    </>
  )
}
