namespace app;
using { managed } from '@sap/cds/common';
using { app.User }   from './user';  


entity Order : managed {
  key  id: Integer;
  nomeOrdem: String;
  usuario : Association to User; 
 }