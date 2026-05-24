import { Product } from "../../../domain/product/entity/Product";
import { ProductPricingDomainService } from "../../../domain/product/service/ProductPricingDomainService";
import { ProductHandler } from "../../../infrastructure/web/controller/ProductController";
import { CreateProductInput } from "../../dto/CreateProductInput";
import { CreateProductUseCase } from "../../ports/inbound/CreateProductUseCase";

export class createProductInteractor implements CreateProductUseCase{

    private productPricingDomainService: ProductPricingDomainService;

    constructor(){
        this.productPricingDomainService= new ProductPricingDomainService();
    }

    createProduct(createProductInput: CreateProductInput): CreateProductInput {

        let product = new Product();

        product.id = createProductInput.id;
        product.descricaoProduto = createProductInput.descricaoProduto
        product.nomeProduto = createProductInput.nomeProduto
        product.preco = createProductInput.preco;

        let productPrecificado  = this.productPricingDomainService.precingProduct(product);

        let createProduct = new CreateProductInput();
        createProduct.descricaoProduto = productPrecificado?.descricaoProduto;
        createProduct.id = productPrecificado?.id
        createProduct.nomeProduto = productPrecificado?.nomeProduto
        createProduct.preco = productPrecificado?.preco

        return createProduct;
    }

}