/*
 * @Author: bucai
 * @Date: 2019-10-21 12:27:53
 * @LastEditors: bucai
 * @LastEditTime: 2019-10-21 15:28:50
 * @Description: 将控制器模块加载到内存
 */
import fs from 'fs';
import path from 'path';
// const controllerPath = path.join(__dirname, '../controller/');

const Controllers: Array<new () => {}> = [];

async function readyController(url: string) {
  const fileNames = fs.readdirSync(url);
  for (const name of fileNames) {
    const _url = path.join(url, name);
    if (fs.statSync(_url).isDirectory()) {
      await readyController(_url);
    } else {
      // 解析 导入
      try {
        const objClass = await import(_url);
        if (typeof objClass === "object" && Object.prototype.toString.call(objClass).toLowerCase() === '[object object]') {
          Controllers.push(objClass.default);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

}

// readyController(controllerPath);
const defaultPath = path.join(__dirname, '../controller/');
export default async (controllerPath = defaultPath) => {
  await readyController(controllerPath);
  return Controllers;
}