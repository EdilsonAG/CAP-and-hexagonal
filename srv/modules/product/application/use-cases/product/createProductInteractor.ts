import { Product } from "../../../domain/product/entity/Product";
import { ProductPricingDomainService } from "../../../domain/product/service/ProductPricingDomainService";
import { ProductHandler } from "../../../infrastructure/web/controller/ProductController";
import { ProductRepositoryPostgres } from "../../../infrastructure/web/database/postgres/repository/ProductRepositoryPostgres";
import { CreateProductInput } from "../../dto/CreateProductInput";
import { CreateProductUseCase } from "../../ports/inbound/CreateProductUseCase";
import { ProductPersistencePort } from "../../ports/outbound/ProductPersistencePort";

export class CreateProductInteractor implements CreateProductUseCase{

    private productPricingDomainService: ProductPricingDomainService;
    private productPersistencePort:ProductPersistencePort

    constructor(productRepositoryPostgres:ProductRepositoryPostgres){
        this.productPersistencePort = productRepositoryPostgres;
        this.productPricingDomainService= new ProductPricingDomainService();
        
    }

    async createProduct(createProductInput: CreateProductInput): Promise<CreateProductInput>  {

        let product = new Product();

        product.id = createProductInput.id;
        product.descricaoProduto = createProductInput.descricaoProduto
        product.nomeProduto = createProductInput.nomeProduto
        product.preco = createProductInput.preco;

        console.log("createProductInput "+createProductInput)

        let productPrecificado  =  this.productPricingDomainService.precingProduct(product);

        let createProduct = new CreateProductInput();
        createProduct.descricaoProduto = productPrecificado?.descricaoProduto;
        createProduct.id = productPrecificado?.id
        createProduct.nomeProduto = productPrecificado?.nomeProduto
        createProduct.preco = productPrecificado?.preco


        await this.productPersistencePort.create(product);


        return createProduct;
    }

}