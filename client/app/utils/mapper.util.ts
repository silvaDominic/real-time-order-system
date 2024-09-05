import { ORDER_STATUS, OrderConfig, OrderViewModel } from "../models/order.model";
import { AddressConfig, AddressViewModel } from "../models/address.model";
import { CurrencyUtil } from "./currency.util";

export function mapOrder(orderDTO: any): OrderViewModel {
  return new OrderViewModel({
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
export function mapAddress(addressDTO: string): AddressViewModel {
  const [streetAddress, city, stateZip] = addressDTO.trim().split(",");
  const [state, zipCode] = stateZip;

  return new AddressViewModel({
    city,
    state,
    zipCode,
    streetAddress,
  } as AddressConfig);
}
