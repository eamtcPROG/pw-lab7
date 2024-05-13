import { HttpStatus, Res } from '@nestjs/common';
import ResultObjectDTO from '../dto/resultobject.dto';
import ResultListDTO from '../dto/resultlist.dto';
import Idto from '../interfaces/idto.interface';
import { MessageTypes } from './messagetypes';
import RequestListDTO from '../dto/requestlist.dto';
import { CommonTools } from './commontools';
// import { RoleDto } from 'src/user/dto/role.dto';

export class ToolsGenerateResponse {
  public static getOk(@Res() res: any, rez: object): any {
    return this.getErr(res, HttpStatus.OK, rez);
  }
  public static getErr(@Res() res: any, errType: number, rez: object): any {
    return res.status(errType).json(rez);
  }

  public static async getOkObject(@Res() res: any, obj: Idto): Promise<any> {
    const rez = new ResultObjectDTO();
    rez.err = false;
    rez.obj = obj;
    return this.getOk(res, rez);
  }

  public static async getOkList(
    @Res() res: any,
    objs: Array<Idto>,
    requestinfo: RequestListDTO,
    total: number,
  ): Promise<any> {
    const rez = new ResultListDTO();
    rez.err = false;
    rez.objects = objs;
    rez.requestinfo = requestinfo;
    rez.total = total;
    rez.totalpages = CommonTools.setTotalPages(requestinfo, total);
    return this.getOk(res, rez);
  }

  public static async getErrObject(
    @Res() res: any,
    errType: number,
    messages: number | Array<number>,
  ): Promise<any> {
    const rez = new ResultObjectDTO();
    rez.err = true;
    rez.messages = MessageTypes.processMessage(messages);

    return this.getErr(res, errType, rez);
  }

  public static async getSuccessObject(
    @Res() res: any,
    type: number,
    messages: number | Array<number>,
  ): Promise<any> {
    const rez = new ResultObjectDTO();
    rez.err = false;
    rez.messages = MessageTypes.processMessage(messages);

    return this.getErr(res, type, rez);
  }
}
