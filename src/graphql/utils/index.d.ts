export interface IClient {
  name: String
  phone: String
  email: String
  website: String
  admin?: Boolean
  birthday: String
  description: String
  timestamp: Number
}
export interface IContract {
  address: String
  baseuri: String
  timestamp: Number
  mintPrice: Number
  minted: Number
  name: String
  owner: String
  supply: Number
  client_id: String
}
export interface ICustomer {
  initiated: Boolean
  complete: Boolean
  timestamp: Number
  email: String
  name: String
  phone: String
  client_id: String
  contract_id: String
}
export interface ITransaction {
  start: Number
  finish: Number
  fee: Number
  price: Number
  client_id: String
  contract_id: String
  customer_id: String
}