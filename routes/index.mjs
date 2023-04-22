'use strict';
import principal from './principalRoute.mjs';

//Pegando todas as rotas
export default app =>{
    app.use(
        principal,
        )
};