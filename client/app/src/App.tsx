import React, { useEffect } from 'react';
import './App.css';

import { SocketService } from "../../core/socket.service";
import { mapOrder } from "../utils/mapper.util";

function App() {

  useEffect(() => {
    SocketService.connect();

    SocketService.on('order_event', (data: any) => {
      data.map((item: any) => console.log(mapOrder(item)));
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
      TESTING
    </div>
  );
}

export default App;
