import  cds  from '@sap/cds';
import { ProductHandler } from './infrastructure/web/controller/product.handler';
 

export default cds.service.impl((srv) => {
 
  
  const productHandler = new ProductHandler();
  productHandler.registerHandlers(srv);
 
});