/*
 * @Author: bucai
 * @Date: 2019-10-21 12:27:53
 * @LastEditors: bucai
 * @LastEditTime: 2019-10-23 21:50:13
 * @Description: 装饰器列表
 */

import consola from 'consola';

export interface IRoute {
  method: 'get' | 'post' | 'delete';
  path: string
}
export type IController = new () => {};
export interface IRouteConfig {
  query?: {
    [key: string]: string;
  };
  param?: {
    [key: string]: string;
  };
  body?: {
    index: number;
  };
  header?: {
    index: number;
  };
  route: IRoute,
}

export interface IRouteFn extends IRouteConfig {
  (...ages: Array<number | string | object>): object | string;
}

/**
 * 控制器 - 装饰器
 * @param path 路径
 */
export function Controller(path: string) {
  return (target: IController) => {
    Reflect.set(target, '_path', path);
  }
}


/**
 * 路由方法 - 工厂
 * @param param0 
 */
export function route({ method, path }: IRoute) {

  return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const routeFn = Reflect.get(target, propertyKey);
    Reflect.set(routeFn, 'route', { path, method });
  }
}
/**
 * GET - 路由
 * @param path 路径
 */
export function GET(path: string) {
  return route({ path, method: 'get' });
}
/**
 * POST - 路由
 * @param path 路径
 */
export function POST(path: string) {
  return route({ path, method: 'post' });
}
/**
 * DELETE - 路由
 * @param path 路径
 */
export function DELETE(path: string) {
  return route({ path, method: 'delete' });
}
/**
 * 解析 query
 * @param key key
 */
export function RequestQuery(key: string) {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    const routeFn = Reflect.get(target, propertyKey);

    Reflect.set(routeFn, 'query', {
      ...routeFn.query,
      [parameterIndex]: key
    });

  }
}

/**
 * 解析 body
 * @param key index
 */
export function RequestBody(target: object, propertyKey: string, parameterIndex: number) {
  const routeFn = Reflect.get(target, propertyKey);

  Reflect.set(routeFn, 'body', {
    ...routeFn.body,
    index: parameterIndex
  });
}
/**
 * 解析 header
 * @param key index
 */
export function RequestHeader(target: object, propertyKey: string, parameterIndex: number) {
  const routeFn = Reflect.get(target, propertyKey);
  
  Reflect.set(routeFn, 'header', {
    index: parameterIndex
  });
}
/**
 * 解析 param
 * @param key key
 */
export function RequestParam(key: string) {
  return function (target: object, propertyKey: string, parameterIndex: number) {
    const routeFn = Reflect.get(target, propertyKey);

    Reflect.set(routeFn, 'param', {
      ...routeFn.param,
      [parameterIndex]: key
    });

  }
}

