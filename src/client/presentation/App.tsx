import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

import { SocketService } from "../application/services/socket.service";
import { mapOrder } from "../shared/utils/mapper.util";
import { OrderModel } from "../application/models/order.model";
import { OrderTable } from "./components/order/order-table.component";
import { Utils } from "../shared/utils/utils";

function App() {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalOrderCount, setTotalOrderCount] = useState<number>(0);
  const [filteredOrderCount, setFilteredOrderCount] = useState<number>(0);

  const [pageSize, setPageSize] = useState<number>(20);
  const [currPageIndex, setCurrPageIndex] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [canGoNext, setCanGoNext] = useState<boolean>(false);
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

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

  // Controls updates with respect to search, pagination, and order changes
  useEffect(() => {
    setLastPage(Math.ceil(totalOrderCount / pageSize));

    const start = currPageIndex * pageSize;
    const end = start + pageSize + 1;
    const pageItems = orders.slice(start, end);
    const filtered = pageItems.filter((item: OrderModel) => item.price.toString().includes(searchQuery));

    setFilteredOrders(filtered);
    setFilteredOrderCount(filtered.length)
    setTotalOrderCount(orders.length);
  }, [searchQuery, orders, pageSize, currPageIndex]);

  useEffect(() => {
  }, []);

  // Disable previous and next buttons in the first and last page respectively
  useEffect(() => {
    if (currPageIndex <= 0) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
    if (currPageIndex >= lastPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
  }, [currPageIndex, lastPage]);

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
          <h2>Current Page: {currPageIndex + 1}</h2>
          <h2>Last Page: {lastPage + 1}</h2>
        </div>
      </div>

      <OrderTable orders={filteredOrders}/>

      <div className='pagination-container'>
        <div className="button-wrapper">
          <button disabled={!canGoBack} onClick={() => setCurrPageIndex(0)}>Start</button>
          <button disabled={!canGoBack} onClick={() => setCurrPageIndex((prev: number) => prev - 1)}>Prev</button>
          <button disabled={!canGoNext} onClick={() => setCurrPageIndex((prev: number) => prev + 1)}>Next</button>
          <button disabled={!canGoNext} onClick={() => setCurrPageIndex(lastPage)}>Last</button>

          <select name="" id="" onChange={(e: ChangeEvent<HTMLSelectElement>) => setPageSize(Number(e.target.value))}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
