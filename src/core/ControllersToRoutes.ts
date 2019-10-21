/*
 * @Author: bucai
 * @Date: 2019-10-21 13:30:43
 * @LastEditors: bucai
 * @LastEditTime: 2019-10-21 16:06:19
 * @Description: 将控制器解析成路由
 */
import ParseController from './ParseController';
import KoaRouter from 'koa-router';
import { IController, IRouteConfig, IRouteFn } from './RouterDecorator';
import "reflect-metadata";
import consola from 'consola';

function packagingRoute(fn: IRouteFn, routeConfig: IRouteConfig) {
  return async (ctx: KoaRouter.RouterContext) => {

    const query = ctx.query;
    const body = ctx.request.body;
    const params = ctx.params;
    // 参数列表
    const args: Array<number | string | object> = [];

    // 处理params参数
    const paramsArgs = routeConfig.param || {};
    const paramsIndex = Object.keys(paramsArgs);
    paramsIndex.forEach((key: string) => {
      args[parseInt(key, 10)] = params[paramsArgs[key]];
    });

    // 处理query参数
    const queryArgs = routeConfig.query || {};
    const queryIndex = Object.keys(queryArgs);
    queryIndex.forEach((key: string) => {
      args[parseInt(key, 10)] = query[queryArgs[key]];
    });

    // 处理body参数 
    const bodyArgs = routeConfig.body || { index: NaN };
    const bodyIndex = bodyArgs.index;

    if (Number.isInteger(bodyIndex)) {
      args[bodyIndex] = body;
    }

    const resBody = fn(...args);
    ctx.body = resBody;
  }
}

function RouteFnToRouteFactory(Controller: IController) {
  const controller = Reflect.construct(Controller, []);
  return (RouteFn: IRouteFn) => {

    // 抽离 Fn
    const Fn = RouteFn.bind(controller);
    // 抽离 Route confg
    const { route, param, query, body } = RouteFn;
    const RouteCofnig: IRouteConfig = { route, param, query, body };

    return packagingRoute(Fn, RouteCofnig);
  }
}

function toRoutePath(ControllerPath: string, RoutePath: string) {
  return ControllerPath + RoutePath;
}

function ControllerToRouteFactory(router: KoaRouter) {
  return (Controller: IController) => {

    const cPath = Reflect.get(Controller, '_path');
    if (!cPath) {
      return;
    }
    consola.success(`START Controller=> { ${cPath} }`);

    const routeFnKeys: (string | number | symbol)[] = Reflect.ownKeys(Controller.prototype);
    const RouteFnToRoute = RouteFnToRouteFactory(Controller);

    routeFnKeys.forEach(key => {
      if (key === 'constructor') return;

      const RouteFn: IRouteFn = Reflect.get(Controller.prototype, key);
      const { path: rPath, method } = RouteFn.route;
      const route = RouteFnToRoute(RouteFn);
      const url = toRoutePath(cPath, rPath);
      consola.success(`      Route => [ ${url} ]`);
      router[method](url, route);
      
    });
  }
}

export default async (routesr: KoaRouter, path: string | undefined = undefined) => {
  ParseController(path).then((Controllers: IController[]) => {
    const ControllerToRoute = ControllerToRouteFactory(routesr);
    Controllers.forEach(Controller => {
      ControllerToRoute(Controller);
    });
  });
}
