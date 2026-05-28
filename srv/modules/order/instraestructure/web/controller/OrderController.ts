import { CreateOrderUseCase } from "../../../application/ports/inbound/CreateOrderUseCase";
import { CreateOrderInteractor } from "../../../application/use-case/CreateOrderInteractor";

export class OrderController{
    private createOrderUseCase:CreateOrderUseCase;
    constructor(){
        this.createOrderUseCase = new CreateOrderInteractor();
    }

    registerHandlers(srv: any): void {
        srv.on('CREATE', 'User', async (req: any) => {
            try {
                // chamar use case
                console.log("\n\n\n\n")
                console.log("chegou no ordem")
                const userId = req.user?.attr?.id;
                console.log("\n\n\n\n")
                console.log(userId)
                console.log(req.data)
                const id = await this.createOrderUseCase.createOrder();
                 return { ID: id, ...req.data };
            } catch (error: any) {
                req.error(400, error.message)
            }
        })
    }
}