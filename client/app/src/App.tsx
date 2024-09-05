import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

import { SocketService } from "../../core/socket.service";
import { mapOrder } from "../utils/mapper.util";
import { OrderViewModel } from "../models/order.model";
import { OrderTable } from "../components/order/order-table.component";

function App() {
  const [orders, setOrders] = useState<OrderViewModel[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderViewModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    SocketService.connect();

    SocketService.on('order_event', (data: any) => {
      const incomingOrders = data.map((item: any) => ({[item.id]: item})); // Mapping by id gives O(1) look up times
      setOrders(data.map((item: any) => {
        // If order already exists, update it
        if (incomingOrders[item.id] !== undefined) {
          return mapOrder(incomingOrders[item]);
        }
        // Otherwise return item
        return mapOrder(item);
      }));
    });

    return () => {
      SocketService.off('order_event', () =>{
        console.log('Unsubscribing...');
      });
      SocketService.disconnect();
    }
  }, []);

  useEffect(() => {
    setFilteredOrders(orders.filter((item: OrderViewModel) => item.price.toString().includes(searchQuery)));
  }, [searchQuery, orders]);

  function onSearch(event: ChangeEvent<HTMLInputElement>): void {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="App">
      <input id='search-field' placeholder="Search by price..." type="text" value={searchQuery} onChange={onSearch}/>
      <OrderTable orders={filteredOrders} />
    </div>
  );
}

export default App;
