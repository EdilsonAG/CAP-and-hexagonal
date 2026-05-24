import { CreateProductUseCase } from "../../../application/ports/inbound/CreateProductUseCase";
import { createProductInteractor } from "../../../application/use-cases/product/createProductInteractor";

export class ProductHandler {

    private createProductUseCase: CreateProductUseCase;

    constructor() {
        this.createProductUseCase = new createProductInteractor();
    }

    registerHandlers(srv: any): void {
        srv.on('CREATE', 'Products', async (req: any) => {

            try {
                // chamar use case
                const id = this.createProductUseCase.createProduct(req.data);
                return { ID: id, ...req.data };
            } catch (error: any) {
                req.error(400, error.message)
            }
        })
    }
}