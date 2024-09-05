import { AddressConfig } from "./address.model";

export enum ORDER_STATUS {
  CREATED = "CREATED",
  COOKED = "COOKED",
  DRIVER_RECEIVED = "DRIVER_RECEIVED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  UNKNOWN = "UNKNOWN",
}

export interface OrderConfig {
  id: string,
  status: string,
  price: number, // In cents
  itemName: string,
  customer: string,
  destination: AddressConfig,
  sentAtSecond: number
}

export class OrderViewModel {
  id: string;
  status: ORDER_STATUS;
  price: number; // In cents
  itemName: string;
  customer: string;
  destination: AddressConfig;
  sentAtSecond: number;

  constructor(config: OrderConfig) {
    this.id = config.id;
    this.status = ORDER_STATUS[config.status] || ORDER_STATUS.UNKNOWN;
    this.price = config.price;
    this.itemName = config.itemName;
    this.customer = config.customer;
    this.destination = config.destination;
    this.sentAtSecond = config. sentAtSecond;
  }
}
