import "reflect-metadata";
import consola from 'consola';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import body from 'koa-body';

const app: Koa = new Koa();
const router = new KoaRouter();
const PROT = 5426;

import ControllersToRoutes from './core/ControllersToRoutes';

ControllersToRoutes(router);

router.get('/', async (ctx, next) => {

});

app
  .use(body())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PROT, () => { consola.success(`http://0.0.0.0:${PROT}`); });
