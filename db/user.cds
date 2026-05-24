using { managed } from '@sap/cds/common';

namespace app;

entity User : managed {
    key id:  UUID;
    nome: String not null;
    email: String not null;
    senha: String not null;

 }


    