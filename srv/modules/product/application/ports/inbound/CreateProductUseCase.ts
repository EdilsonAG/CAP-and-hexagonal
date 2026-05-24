import { CreateProductInput } from "../../dto/CreateProductInput";

 
export interface CreateProductUseCase {
 
     createProduct(product: CreateProductInput): Promise<CreateProductInput> ;
   
}