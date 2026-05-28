import { AddItemCarUseCase } from "../../application/port/inbound/AddItemCarUseCase";
import { AddItemCarInteractor } from "../../application/use-case/addItemCarInteractor";
const jwt = require('jsonwebtoken');

export class CarController {

    private addItemCarUseCase:AddItemCarUseCase;

    constructor(){
        this.addItemCarUseCase = new AddItemCarInteractor()
    }

    registerHandlers(srv: any): void {
        srv.on('addItemCarrinho', async (req: any) => {
            try {
                const { quantidade, idProduto } = req.data;
                const accestoken = req.headers.authorization?.split(' ')[1]
                const decoded = jwt.decode(accestoken);
              
               
                const idUser = decoded.id
               
                const id = await this.addItemCarUseCase.addItemCar(quantidade,idProduto, idUser);
                //return { ID: id, ...req.data };
            } catch (error: any) {
                req.error(400, error.message)
            }
        })
    }

}