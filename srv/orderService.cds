using { app } from '../db/order';

service orderService @(requires: 'any') {
  entity Order @(restrict: [{ grant: 'CREATE',to: 'user' }, { grant: ['UPDATE','DELETE', 'READ'], to: 'user' }]) as projection on app.Order;
}