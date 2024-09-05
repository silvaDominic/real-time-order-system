import React, { useEffect, useState } from 'react';
import './App.css';

import { SocketService } from "../../core/socket.service";
import { mapOrder } from "../utils/mapper.util";
import { OrderViewModel } from "../models/order.model";
import { OrderTable } from "../components/order/order-table.component";

function App() {
  const [orders, setOrders] = useState<OrderViewModel[]>([]);

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

  return (
    <div className="App">
      <OrderTable orders={orders} />
    </div>
  );
}

export default App;
