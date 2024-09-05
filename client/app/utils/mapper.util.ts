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
  // Normalize tokens -- this would be more robust in a production app
  const [streetAddress, city, stateZip] = addressDTO.trim().split(",");
  const [state, zipCode] = stateZip.trim().split(" ");

  return new AddressViewModel({
    city: city.trim(),
    state,
    zipCode,
    streetAddress,
  } as AddressConfig);
}
