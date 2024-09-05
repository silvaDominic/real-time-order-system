import React, { ChangeEvent, ReactHTMLElement, useEffect, useState } from 'react';
import './App.css';

import { SocketService } from "../../core/socket.service";
import { mapOrder } from "../utils/mapper.util";
import { OrderViewModel } from "../models/order.model";
import { OrderTable } from "../components/order/order-table.component";

function App() {
  const [orders, setOrders] = useState<OrderViewModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    SocketService.connect();

    SocketService.on('order_event', (data: any) => {
      setOrders([...orders, ...data.map((item: any) => mapOrder(item))]);
    });

    return () => {
      SocketService.off('order_event', () =>{
        console.log('Unsubscribing...');
      });
      SocketService.disconnect();
    }
  }, []);

  function onSearch(event: ChangeEvent<HTMLInputElement>): void {
    setSearchQuery(event.target.value);
    setOrders([...orders].filter((item: OrderViewModel) => item.price.toString().includes(searchQuery)));
  }

  return (
    <div className="App">
      <input id='search-field' placeholder="Search by price..." type="text" value={searchQuery} onChange={onSearch}/>
      <OrderTable orders={orders} />
    </div>
  );
}

export default App;
