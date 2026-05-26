import  cds  from '@sap/cds';
import { UserController } from './modules/user/infrastructure/web/controller/UserController';
 

export default cds.service.impl((srv: any) => {
  console.log('🚀 Iniciando CatalogService...');
  
  const userController = new UserController();
  userController.registerHandlers(srv);
  
  console.log('✅ CatalogService iniciado!');
});