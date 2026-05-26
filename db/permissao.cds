namespace app;
using { managed } from '@sap/cds/common';


type Permissao : String enum {
    admin = 'admin';
    user  = 'user';
}