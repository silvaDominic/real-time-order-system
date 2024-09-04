import React, { useEffect } from 'react';
import './App.css';

import { SocketService } from "../../core/socket.service";

function App() {

  useEffect(() => {
    SocketService.connect();

    SocketService.on('order_event', (data: unknown) => {
      console.log('Received order event', data);
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
