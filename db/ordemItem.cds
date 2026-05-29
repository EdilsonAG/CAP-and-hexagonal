namespace app;
using { managed } from '@sap/cds/common';

using { app.Product } from './product';
using { app.Order }   from './order';

entity OrderItem : managed {
      key ID         : UUID;
      order_id       : Association to Order;    // referencia app.Order importado
      product_id     : Association to Product;
      quantidade     : Integer;
      preco          : Decimal(10, 2);
      
}

