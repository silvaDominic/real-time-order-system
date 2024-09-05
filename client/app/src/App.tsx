import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

import { SocketService } from "../../core/socket.service";
import { mapOrder } from "../utils/mapper.util";
import { OrderViewModel } from "../models/order.model";
import { OrderTable } from "../components/order/order-table.component";
import { Utils } from "../utils/utils";

function App() {
  const [orders, setOrders] = useState<OrderViewModel[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderViewModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalOrderCount, setTotalOrderCount] = useState<number>(0);
  const [filteredOrderCount, setFilteredOrderCount] = useState<number>(0);

  useEffect(() => {
    SocketService.connect();

    SocketService.on('order_event', (data: any) => {
      setOrders((prevState: OrderViewModel[]) => Utils.mergeArrays(prevState, data.map((item: any) => mapOrder(item))));
    });

    return () => {
      SocketService.off('order_event', () => {
        console.log('Unsubscribing...');
      });
      SocketService.disconnect();
    }
  }, []);

  useEffect(() => {
    const filtered = orders.filter((item: OrderViewModel) => item.price.toString().includes(searchQuery));
    setFilteredOrders(filtered);
    setFilteredOrderCount(filtered.length)
    setTotalOrderCount(orders.length);
  }, [searchQuery, orders]);

  function onSearch(event: ChangeEvent<HTMLInputElement>): void {
    setSearchQuery(event.target.value.replace(/[^0-9.]/g, '')); // Restricts input to numbers and decimals
  }

  return (
    <div className="App">
      <input id='search-field' placeholder="Search by price..." type="text" value={searchQuery} onChange={onSearch}/>

      <div className='order-counter-container'>
        <h2>Total Orders: {totalOrderCount}</h2>
        <h2>Filtered Orders: {filteredOrderCount}</h2>
      </div>

      <OrderTable orders={filteredOrders}/>
    </div>
  );
}

export default App;
