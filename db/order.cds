namespace app;
using { managed } from '@sap/cds/common';
using { app.User }   from './user';  


entity Order : managed {
  key  id: UUID;
  nomeOrdem: String;
  usuario : Association to User; 
 }