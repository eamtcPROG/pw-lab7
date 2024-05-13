import { Model } from 'mongoose';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import Ischema from 'src/app/interfaces/ischema.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import Idto from './idto.interface';

export default interface IRepository {
  findCount(options: RequestListDTO): number | Promise<number>;
  delete(id: string): any;
  update(new_id: any, preparedObj: Idto): any;
  save(preparedObj: Idto): any;
  findAll(info?: RequestListDTO): Promise<any[]>;

  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any;
  processOptionForList(info?: RequestListDTO): object;

  populateObj(
    obj: any,
    populate?: RequestPopulateDTO,
    idLanguage?: string,
  ): Promise<any>;

  findById(
    id: string,
    populate?: RequestPopulateDTO,
    idLanguage?: string,
  ): Promise<any>;

  setModel(m: Model<Ischema>): void;

  setConfigService(c: ConfigService): void;

  getParsedId(value: any): any;

  getParsedIdStr(value: any): any;

  getParsedString(value: any): any;

  getParsedRegExp(value: any): any;
}
