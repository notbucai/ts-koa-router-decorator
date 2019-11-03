import { Controller, GET, RequestBody, RequestParam, RequestQuery, POST, RequestHeader, RequestCtx } from '../core/RouterDecorator';
import { Context } from 'koa';

@Controller('/user')
export default class {

  private msg = 'This is the string of the test';

  @GET('/:id')
  public async greet(
    @RequestParam('id') id: string,
    @RequestQuery('id2') id2: string,
    @RequestQuery('id') b: string,
    @RequestBody s: object,
    @RequestHeader header: object
  ) {
    console.log(id, id2, b, s, this.msg, header);
    return {
      name: 123, code: -1, msg: "213", list: [{ xx: 123, name: 123 }],
    };
  }
  @POST('/:id')
  public async post(
    @RequestCtx ctx: Context,
    @RequestParam('id') id: string,
    @RequestQuery('id2') id2: string,
    @RequestQuery('id') b: string,
    @RequestBody s: {}
  ) {
    console.log(id, id2, b, s, this.msg);
    console.log(ctx);
    return this.msg;
  }
}