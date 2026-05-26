namespace app;
using { managed } from '@sap/cds/common';
using { app.Permissao } from './permissao';
using { app.User } from './user';

entity Perfil : managed {
    key id       : UUID;
    descricao    : String(100);
    permissao    : Permissao; //  enum, não Association
    user         : Association to User; //  FK para User
}