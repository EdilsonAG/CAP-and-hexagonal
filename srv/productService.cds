using { app } from '../db/product';

service CatalogService {
  entity Products as projection on app.Product;

}