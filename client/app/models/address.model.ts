export interface AddressConfig {
  city: string,
  state: string,
  zipCode: string,
  country: string,
  streetAddress: string, // House#, Street [Apt#], City, State Zipcode
}

export class AddressViewModel {
  city: string;
  state: string;
  zipCode: string;
  streetAddress: string;

  constructor(addressConfig: AddressConfig) {
    this.city = addressConfig.city;
    this.state = addressConfig.state;
    this.zipCode = addressConfig.zipCode;
    this.streetAddress = addressConfig.streetAddress;
  }
}
