import { ORDER_STATUS, OrderModel } from "../../../application/models/order.model";

import './order.styles.css';
import { OrderItem } from "./order-item.component";

export function OrderTable({orders}: {orders: OrderModel[]}) {
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
          { orders.map((order: OrderModel) => (
            <tr key={order.id}>
              <OrderItem {...order} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
