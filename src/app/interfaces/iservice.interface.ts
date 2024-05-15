import RequestListDTO from '../dto/requestlist.dto';
import RequestPopulateDTO from '../dto/requestpopulate.dto';
import ResultDeleteDTO from '../dto/resultdelete.dto';
import Idto from './idto.interface';

export default interface IService {
  toDto(obj: any): Idto;
  toDtoArray(objs: any[]): Idto[];
  getById(
    id: string,
    populate?: RequestPopulateDTO,
    idLanguage?: string,
  ): Promise<Idto | null>;
  getAll(options: RequestListDTO): Promise<Idto[] | null>;
  getCount(options: RequestListDTO): Promise<number>;
  parseForSave(postObj: any): Promise<Idto>;
  parseForSaveValue(postObj: any, id: string): Idto;
  delete(id: string): Promise<ResultDeleteDTO>;
  save(postObj: Idto, id?: string): Promise<Idto | null>;
}
