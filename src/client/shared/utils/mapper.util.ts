import { ORDER_STATUS, OrderConfig, OrderModel } from "../../application/models/order.model";
import { AddressConfig, AddressView } from "../models/address.model";
import { CurrencyUtil } from "./currency.util";

export function mapOrder(orderDTO: any): OrderModel {
  return new OrderModel({
    id: orderDTO.id,
    status: ORDER_STATUS[orderDTO.event_name] || ORDER_STATUS.UNKNOWN,
    price: CurrencyUtil.centsToDollars(orderDTO.price),
    itemName: orderDTO.item,
    customer: orderDTO.customer,
    destination: orderDTO.destination,
    sentAtSecond: orderDTO.sent_at_second,
  } as OrderConfig)
}
