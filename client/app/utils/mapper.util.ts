import { ORDER_STATUS, OrderConfig, OrderModel } from "../models/order.model";
import { AddressConfig, AddressView } from "../models/address.model";
import { CurrencyUtil } from "./currency.util";

export function mapOrder(orderDTO: any): OrderModel {
  return new OrderModel({
    id: orderDTO.id,
    status: ORDER_STATUS[orderDTO.event_name] || ORDER_STATUS.UNKNOWN,
    price: CurrencyUtil.centsToDollars(orderDTO.price),
    itemName: orderDTO.item,
    customer: orderDTO.customer,
    destination: new mapAddress(orderDTO.destination),
    sentAtSecond: orderDTO.sent_at_second,
  } as OrderConfig)
}

/**
 * Converts from the format:
 * House#, Street [Apt#], City, State Zipcode
 * to the client side defined AddressConfig format.
 * @param addressDTO
 */
export function mapAddress(addressDTO: string): AddressView {
  // Normalize tokens -- this would be more robust in a production app
  const [streetAddress, city, stateZip] = addressDTO.trim().split(",");
  const [state, zipCode] = stateZip.trim().split(" ");

  return new AddressView({
    city: city.trim(),
    state,
    zipCode,
    streetAddress,
  } as AddressConfig);
}
