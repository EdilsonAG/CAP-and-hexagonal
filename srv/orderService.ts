import  cds  from '@sap/cds';
import { OrderController } from './modules/order/instraestructure/web/controller/OrderController';
  

export default cds.service.impl((srv) => {
 
  
  const orderController = new OrderController()
  orderController.registerHandlers(srv);
  
 
});