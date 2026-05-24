import { Product } from "../entity/Product";

export class ProductPricingDomainService{

    public precingProduct(product: Product):Product | undefined{

        if(product.preco !== undefined && product.preco <= 10){
            throw new Error("preco não poder ser menor que 10")
        }

        return product;
        
    }
}