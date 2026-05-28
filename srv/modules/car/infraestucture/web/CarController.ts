import { AddItemCarUseCase } from "../../application/port/inbound/AddItemCarUseCase";
import { AddItemCarInteractor } from "../../application/use-case/addItemCarInteractor";

export class CarController {

    private addItemCarUseCase:AddItemCarUseCase;

    constructor(){
        this.addItemCarUseCase = new AddItemCarInteractor()
    }

    registerHandlers(srv: any): void {
        srv.on('AddItemCarUseCase', async (req: any) => {
            try {
                const { quantidade, idProduto } = req.data;
                const userId = req.user.attr.id;


                console.log(req.data)
                const id = await this.addItemCarUseCase.addItemCar(quantidade,idProduto, userId);
                return { ID: id, ...req.data };
            } catch (error: any) {
                req.error(400, error.message)
            }
        })
    }

}