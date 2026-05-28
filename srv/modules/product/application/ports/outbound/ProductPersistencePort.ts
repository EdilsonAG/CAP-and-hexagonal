import { Product } from "../../../domain/product/entity/Product";

export interface ProductPersistencePort {
    create(produto: Product): Promise<String | undefined>;
     findProductById(idProduct:String): Promise<Product | undefined>;
}