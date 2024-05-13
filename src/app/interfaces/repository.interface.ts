import RequestListDTO from 'src/app/dto/requestlist.dto';
import { Model } from 'mongoose';
import Ischema from 'src/app/interfaces/ischema.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';

export interface RepositoryInterface {
  findById(
    id: string,
    populate?: RequestPopulateDTO,
    idLanguage?: string,
  ): Promise<any>;
  findAll(options: RequestListDTO): Promise<any[]>;
  findCount(options: RequestListDTO): Promise<number>;
  save(postObj: object): Promise<any>;
  delete(id: string): Promise<{ deletedCount: number }>;
  update(id: string, putObj: object): Promise<{ matchedCount: number }>;
  setModel(m: Model<Ischema>): void;
  setConfigService(c: ConfigService): void;
  getParsedId(value: any): any;
  getParsedIdStr(value: any): any;
  getParsedString(value: any): any;
  getParsedRegExp(value: any): any;
}
