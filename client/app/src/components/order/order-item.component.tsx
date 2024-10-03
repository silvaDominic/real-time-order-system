import { ORDER_STATUS } from "../../../models/order.model";

interface OrderItemProps {
  id: string,
  customer: string,
  itemName: string,
  status: ORDER_STATUS,
  price: number,
  destination: string,
}

export function OrderItem({id, customer, itemName, status, price, destination}: OrderItemProps) {
  function formatStatus(status: ORDER_STATUS): string {
    const str: string = status.toLowerCase()
    return str.charAt(0).toUpperCase() + str.slice(1).replace('_', ' ');
  }

  return (
    <tr key={id}>
      <td>{customer}</td>
      <td>{itemName}</td>
      <td>{formatStatus(status)}</td>
      <td>{price}</td>
      <td>{destination}</td>
    </tr>
  )
}
