export type Client = {
  id: string
  name: string
  phone: string
	email: string
  website: string
  admin?: Boolean
  birthday: string
  description: string
  contracts: Contract[]
  customers: Customer[]
  transactions: Transaction[]
}
export type Contract = {
  id: string
  address: string
  baseuri: string
  timestamp: number
  mintPrice: number
  minted: number
  name: string
  owner: string
  supply: number
  client: Client
  customers: Customer[]
  transactions: Transaction[]
}

export type Customer = {
  id: string
  initiated?: Boolean
  complete: Boolean
  created: number
  created_at?: number
  timestamp?: number
  email: string
  name: string
  phone: string
  client: Client
  contract: Contract
  transactions: Transaction[]
}

export type Transaction = {
  id: string
  fee: number
  price: number
  timestamp: number
  client: Client
  contract: Contract
  customer: Customer
}
