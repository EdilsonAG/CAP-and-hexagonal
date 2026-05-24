using { app } from '../db/schema';

service CatalogService {
  entity Products as projection on app.Product;

}