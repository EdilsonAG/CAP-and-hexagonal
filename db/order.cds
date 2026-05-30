namespace app;
using { managed } from '@sap/cds/common';
using { app.User }   from './user';  
using { app.OrderItem } from './ordemItem';

entity Order : managed {
  key  id: UUID;
  nomeOrdem: String;
  precoTotal    : Decimal(10, 2);
  usuario : Association to User; 
  itens : Composition of many OrderItem on itens.order_id = $self;
 }