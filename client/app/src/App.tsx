import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

import { SocketService } from "../../core/socket.service";
import { mapOrder } from "../utils/mapper.util";
import { OrderModel } from "../models/order.model";
import { OrderTable } from "./components/order/order-table.component";
import { Utils } from "../utils/utils";

function App() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalOrderCount, setTotalOrderCount] = useState<number>(0);
  const [filteredOrderCount, setFilteredOrderCount] = useState<number>(0);

  useEffect(() => {
    SocketService.connect();

    SocketService.on('order_event', (data: any) => {
      // Use the merge array util to update existing items while adding new ones
      setOrders((prevState: OrderModel[]) => Utils.mergeArrays(prevState, data.map((item: any) => mapOrder(item))));
    });

    return () => {
      SocketService.off('order_event', () => {
        console.log('Unsubscribing...');
      });
      SocketService.disconnect();
    }
  }, []);

  // Controls updates with respect to search and order changes
  useEffect(() => {
    const filtered = orders.filter((item: OrderModel) => item.price.toString().includes(searchQuery));
    setFilteredOrders(filtered);
    setFilteredOrderCount(filtered.length)
    setTotalOrderCount(orders.length);
  }, [searchQuery, orders]);

  function onSearch(event: ChangeEvent<HTMLInputElement>): void {
    setSearchQuery(event.target.value.replace(/[^0-9.]/g, '')); // Restricts input to numbers and decimals
  }

  return (
    <div className="App">
      <div id="header">
        <div>
          <input id='search-field' placeholder="Search by price..." type="text" value={searchQuery}
                 onChange={onSearch}/>
          <div><span>Numbers and decimals only</span></div>
        </div>

        <div className='order-counter-container'>
          <h2>Total Orders: {totalOrderCount}</h2>
          <h2>Filtered Orders: {filteredOrderCount}</h2>
        </div>
      </div>


      <OrderTable orders={filteredOrders}/>
    </div>
  );
}

export default App;
