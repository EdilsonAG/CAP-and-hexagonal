import { ProductPersistencePort } from "../../../../../application/ports/outbound/ProductPersistencePort";
import { Product } from "../../../../../domain/product/entity/Product";
import cds  from '@sap/cds';

export class ProductRepositoryPostgres implements ProductPersistencePort {

    private db = cds.db;
    async create(produto: Product): Promise<String | undefined> {

        try {
        
            const result: Product = await this.db.run(
                cds.ql.INSERT.into('app.Product').entries({
                    id: produto.id,
                    descricaoProduto: produto.descricaoProduto,
                    nomeProduto: produto.nomeProduto,
                    preco: produto.preco
                })
            )
            return result.nomeProduto;
        } catch (error: any) {

            throw new Error(`Erro ao criar produto: ${error.message}`);
        }

    }

    public async findProductById(idProduct:String): Promise<Product | undefined>{
        try {
            const db = await cds.connect.to("db")
            const result = await db.run(
                cds.ql.SELECT.one.from("app.Product").where({ id: idProduct })
            )
            if (!result){
                throw new Error("produto não encontrado")
            }
            return result
        } catch (error) {
            
        }
    }


 

}