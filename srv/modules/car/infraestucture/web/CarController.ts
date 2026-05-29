import { AddItemCarUseCase } from "../../application/port/inbound/AddItemCarUseCase";
import { SelectCarUseCase } from "../../application/port/inbound/SelectCarUseCase";
import { CarPersistencePort } from "../../application/port/outbound/CarPersistencePort";
import { AddItemCarInteractor } from "../../application/use-case/addItemCarInteractor";
import { SelectCarInteractor } from "../../application/use-case/SelectCarInteractor";
import { CarRepositoryPostgres } from "../database/CarRepositoryPostgres";
const jwt = require('jsonwebtoken');

export class CarController {

    private addItemCarUseCase:AddItemCarUseCase;
    private carPersistencePort:CarPersistencePort;

    constructor(){
        this.addItemCarUseCase = new AddItemCarInteractor()
        this.carPersistencePort = new CarRepositoryPostgres();
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
        },
        
    ),
    srv.on('READ', async(req:any)=>{
            try {

                const accestoken = req.headers.authorization?.split(' ')[1]
                const decoded = jwt.decode(accestoken);
              
               
                const idUser = decoded.id
             

                this.carPersistencePort.findCarByUser(idUser)
                    console.log("testen possiblidade")
            } catch (error) {
                
            }
        })
    }

}