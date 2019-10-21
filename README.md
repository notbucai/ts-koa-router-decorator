# typescript 装饰器实现 koa 路由 （工程模板）
使用 `TypeScript` 的装饰器 实现类似于 `Spring boot` 注解  
用于方便的编写路由   
如在使用过程中碰到问题可提交 `issues`  或者 通过Email: `1450941858@qq.com`

## 原理  
1. 首先需要知道 ts 装饰器的执行顺序
2. 然后一步一步的对相关的装饰器进行反射
3. 然后动态加载模块
3. 解析相关的模块
4. 将模块中的方法进行解析
5. 将解析的方法 打包成一个路由函数
6. 将函数加载到koa-router

## 实现的‘注解’

名称 | 用法 | 说明 | 参数必要   
-|-|-|-  
Controller | @Controller('\user') | 用于class的注解 | 是 
GET | @GET('\:id') | 创建一个GET方式的路由。用于方法的注解 | 是 
POST | @POST('\:id') | 创建一个GET方式的路由。用于方法的注解 | 是 
RequestQuery | @RequestQuery('id') | 将query的指定属性绑定到当前的参数。用于函数的参数的注解 | 是 
RequestBody | @RequestBody | 将body的指定属性绑定到当前的参数。用于函数的参数的注解 | 否 
RequestParam | @RequestParam('id') | 将param的指定属性绑定到当前的参数。用于函数的参数的注解 | 是 

## 使用
### `初始化`
```shell
// 1. 将本仓库clone下来  
$ git clone https://github.com/wuxinweb/ts-koa-router-decorator.git
// 2. 安装依赖
$ npm install 
// or
$ yarn
// 3. 启动
$ yarn dev 
// or 
$ npm run dev
```
### `编码规范`
> `src/controller` 目录为控制器目录 统一编写后会异步加载到路由  

> 每个控制器都需要创建一个文件且须放在 `src/controller` 目录下  `可建二级目录`

## 示例
> 文件： `src/controller/User.ts` 中可作为模板
