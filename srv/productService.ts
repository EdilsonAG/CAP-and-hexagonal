import  cds  from '@sap/cds';
import { ProductHandler } from './infrastructure/web/controller/ProductController';
 

export default cds.service.impl((srv) => {
  console.log('🚀 Iniciando CatalogService...');
  
  const productHandler = new ProductHandler();
  productHandler.registerHandlers(srv);
  
  console.log('✅ CatalogService iniciado!');
});