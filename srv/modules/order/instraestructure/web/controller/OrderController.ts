import { CreateOrderUseCase } from "../../../application/ports/inbound/CreateOrderUseCase";
import { CreateOrderInteractor } from "../../../application/use-case/CreateOrderInteractor";
const jwt = require('jsonwebtoken');


export class OrderController{
    private createOrderUseCase:CreateOrderUseCase;
    constructor(){
        this.createOrderUseCase = new CreateOrderInteractor();
    }

    registerHandlers(srv: any): void {
        srv.on('CREATE', 'Order', async (req: any) => {
            try {

                 
                const accestoken = req.headers.authorization?.split(' ')[1]
                const decoded = jwt.decode(accestoken);
              
               
                const idUser = decoded.id
                // chamar use case
               
                const id = await this.createOrderUseCase.createOrder(idUser);
                 return { ID: id, ...req.data };
            } catch (error: any) {
                req.error(400, error.message)
            }
        })
    }
}