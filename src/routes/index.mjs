'use strict';
import principal from "./principalRoute.mjs";
import cliente from "./clienteRoute.mjs"
//Pegando todas as rotas
export default app =>{
    app.use(
        principal,
        cliente
    );
};