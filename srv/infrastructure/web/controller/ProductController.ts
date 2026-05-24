import { CreateProductUseCase } from "../../../application/ports/inbound/CreateProductUseCase";
import { ProductPersistencePort } from "../../../application/ports/outbound/ProductPersistencePort";
import { CreateProductInteractor } from "../../../application/use-cases/product/createProductInteractor";
import { ProductRepositoryPostgres } from "../database/postgres/repository/ProductRepositoryPostgres";

export class ProductHandler {

    private createProductUseCase: CreateProductUseCase;
 
    constructor() {
        let productRepositoryPostgres = new ProductRepositoryPostgres();
        this.createProductUseCase = new CreateProductInteractor(productRepositoryPostgres);
      
    }

    registerHandlers(srv: any): void {
        srv.on('CREATE', 'Products', async (req: any) => {
            try {
                // chamar use case
                const id = await this.createProductUseCase.createProduct(req.data);
                return { ID: id, ...req.data };
            } catch (error: any) {
                req.error(400, error.message)
            }
        })
    }
}