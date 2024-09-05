import { ORDER_STATUS, OrderViewModel } from "../../models/order.model";

import './order.styles.css';

export function OrderTable({orders}: {orders: OrderViewModel[]}) {
  return (
    <div className='table-wrapper'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Item</th>
            <th>Status</th>
            <th>Price($)</th>
            <th>Destination</th>
          </tr>
        </thead>

        <tbody>
        {
          orders.map((order: OrderViewModel) => {
            return (
              <tr key={order.id}>
                <td>{order.customer}</td>
                <td>{order.itemName}</td>
                <td>{order.status}</td>
                <td>{order.price}</td>
                <td>{order.destination.streetAddress}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}