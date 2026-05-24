using { app } from '../db/user';

service userService @(requires: 'any') {
  entity User @(restrict: [{ grant: 'CREATE',to: 'any' }, { grant: ['UPDATE','DELETE', 'READ'], to: 'user' }]) as projection on app.User;
}