import { Order } from "../../dto/Order"

export interface OrderPersistencePort{
     createOrder(ordem: Order):Promise<Order | undefined>
     selectOrderById(idOrdem: string)
}