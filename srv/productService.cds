using { app } from '../db/product';

//service CatalogService {
//  entity Products as projection on app.Product;
//}

service CatalogService @(requires: 'any') {
  // Qualquer autenticado pode ler, só admin pode escrever
  entity Products @(restrict: [{ grant: 'READ',to: 'any' }, { grant: ['CREATE','UPDATE','DELETE'], to: 'admin' }]) as projection on app.Product;
}