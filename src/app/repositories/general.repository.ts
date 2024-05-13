import { Injectable } from '@nestjs/common';

import { Model, Types } from 'mongoose';
import Ischema from '../interfaces/ischema.interface';
import RequestPopulateDTO from '../dto/requestpopulate.dto';
import RequestListDTO from '../dto/requestlist.dto';
import RequestSortCriteriaDTO from '../dto/requestsortcriteria.dto';

import RequestFilterDTO from '../dto/requestfilter.dto';
import IRepository from '../interfaces/irepository.interface';
import { ConfigService } from '@nestjs/config';
import { CommonTools } from '../tools/commontools';

@Injectable()
export abstract class GeneralRepository {
  protected _model: Model<Ischema>;
  protected configService: ConfigService;
  protected mainPart: string;

  constructor() {}

  setModel(m: Model<Ischema>) {
    this._model = m;
  }
  setMainPart(m: string) {
    this.mainPart = m;
  }
  setConfigService(c: ConfigService) {
    this.configService = c;
  }

  abstract processOptionForList(info?: RequestListDTO): object;
  abstract populateObj(
    obj: any,
    populate?: RequestPopulateDTO,
    idLanguage?: string,
  ): Promise<any>;

  getParsedId(value: any): any {
    const v =
      typeof value == 'object' && value !== null && value !== undefined
        ? value.toHexString()
        : value;
    return Types.ObjectId.createFromHexString(v);
  }

  getParsedIdObjectOrStr(value: any): string {
    if (value instanceof Types.ObjectId) {
      return value.toHexString();
    }

    if (typeof value === 'string') {
      return value;
    }
    return '';
  }

  getParsedIdStr(value: any): any {
    return typeof value == 'object' && value !== null && value !== undefined
      ? value.toHexString()
      : value;
  }

  getParsedString(value: any): any {
    return typeof value == 'object' && value !== null && value !== undefined
      ? value.toString()
      : value;
  }

  getParsedRegExp(value: any): any {
    let v =
      typeof value == 'object' && value !== null && value !== undefined
        ? value.toString()
        : value;
    v = v.trim();
    return new RegExp(v, 'i');
  }

  async findListByField(
    field: string,
    value: any,
    populate?: RequestPopulateDTO,
    filter?: RequestFilterDTO[],
  ): Promise<any[]> {
    const tF = new RequestFilterDTO();
    tF.field = field;
    tF.values = [value];
    let filters = new Array<RequestFilterDTO>();
    filters = filter != undefined ? filter : [];
    filters.push(tF);

    const tInfoUR = new RequestListDTO();
    tInfoUR.filters = filters;
    tInfoUR.populate = populate;
    tInfoUR.page = 1;
    tInfoUR.onpage = 99999999;

    return await this.findAll(tInfoUR);
  }

  protected async populateObjValues(
    valueRepo: IRepository,
    obj: any,
    populate?: RequestPopulateDTO,
    field?: string,
    expectedIdLanguage?: string,
  ): Promise<any> {
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    field = field ?? 'idtype';

    if (populate.populates.indexOf('allvalues') !== -1) {
      const tF = new RequestFilterDTO();
      tF.field = field;
      tF.values = [obj._id];
      const tInfoUR = new RequestListDTO();
      tInfoUR.filters = [tF];
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 99999999;

      obj.allvalues = await valueRepo.findAll(tInfoUR);
    }

    if (
      populate.populates.indexOf('values') !== -1 ||
      populate.populates.indexOf('_full') !== -1
    ) {
      let idLanguage = null;
      if (expectedIdLanguage == undefined)
        idLanguage = CommonTools.getHeader('idLanguage');
      else idLanguage = expectedIdLanguage;

      idLanguage =
        idLanguage ?? this.configService.get('config.default_language_id');

      let tInfoUR = new RequestListDTO();
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 1;
      tInfoUR.filters = [];

      let tF = new RequestFilterDTO();
      tF.field = field;
      tF.values = [obj._id];
      tInfoUR.filters.push(tF);

      tF = new RequestFilterDTO();
      tF.field = 'idlanguage';
      tF.values = [idLanguage];
      tInfoUR.filters.push(tF);

      let tall = await valueRepo.findAll(tInfoUR);

      if (tall && tall.length) {
        obj._values = tall[0];
        if (obj._values.hasOwnProperty('name')) obj.name = obj._values.name;
      } else if (tall.length == 0 && expectedIdLanguage !== undefined) {
        obj._values = [{}];
      } else {
        tInfoUR = new RequestListDTO();
        tInfoUR.populate = populate;
        tInfoUR.page = 1;
        tInfoUR.onpage = 1;
        tInfoUR.filters = [];

        tF = new RequestFilterDTO();
        tF.field = field;
        tF.values = [obj._id];
        tInfoUR.filters.push(tF);

        tall = await valueRepo.findAll(tInfoUR);

        if (tall && tall.length) {
          obj._values = tall[0];
          if (obj._values.hasOwnProperty('name')) obj.name = obj._values.name;
        }
      }
    }

    return obj;
  }

  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any {
    const tAgregate = [];

    tAgregate.push({
      $match: options,
    });

    if (forCount) {
      tAgregate.push({
        $count: 'total',
      });
    }

    return _model.aggregate(tAgregate);
  }

  processAgregateForListValues(
    info?: RequestListDTO,
    field?: string,
    fromTableName?: string,
  ): any {
    const tAgregate = [];

    field = field ?? 'id' + this.mainPart.toLowerCase();

    const filters = info && info.filters ? info.filters : [];
    fromTableName = fromTableName ?? this.mainPart.toLowerCase() + 'values';

    for (const filter of filters) {
      if (filter.field == 'searchvalue') {
        tAgregate.push({
          $lookup: {
            from: fromTableName,
            localField: '_id',
            foreignField: field,
            as: 'values',
          },
        });
      }
    }

    return tAgregate;
  }

  async findById(
    id: string,
    populate?: RequestPopulateDTO,
    idLanguage?: string,
  ): Promise<any> {
    const rez = this._model.findById(id);
    let obj = await rez.exec();

    obj = JSON.parse(JSON.stringify(obj));
    if (idLanguage == undefined) return await this.populateObj(obj, populate);
    else return await this.populateObj(obj, populate, idLanguage);
  }

  async findAll(info?: RequestListDTO): Promise<any[]> {
    const options = this.processOptionForList(info);

    let rez = this.processAgregateForList(this._model, options, info);

    rez = this.parseAdminMongoQuery(rez, info);

    const data = await rez.exec();

    const objects = [];

    for (const i in data) {
      const t = await this.populateObj(data[i], info?.populate);
      objects.push(t);
    }

    return objects;
  }

  async findCount(info?: RequestListDTO): Promise<any> {
    const options = this.processOptionForList(info);
    const rez = this.processAgregateForList(this._model, options, info, true);

    let t = await rez.exec();
    t = t && t.length ? t[0] : {};
    const r = t && t.total ? t.total : 0;

    return r;
  }

  async save(obj: Ischema): Promise<any> {
    return await new this._model(obj).save();
  }

  async delete(id: string, cb?: any): Promise<any> {
    if (cb) {
      return await this._model.deleteOne({ _id: id }, () => {
        cb();
      });
    }
    return await this._model.deleteOne({ _id: id });
  }

  async deleteByFielter(filter: object, cb?: any): Promise<any> {
    if (cb) {
      return await this._model.deleteMany(filter, () => {
        cb();
      });
    }
    return await this._model.deleteMany(filter);
  }

  async update(id: string, obj: Ischema): Promise<any> {
    return await this._model.updateOne({ _id: id }, obj).exec();
  }

  async execQuery(promise: any): Promise<any[]> {
    return await promise.exec();
  }

  parseAdminMongoQuery(rez: any, data?: RequestListDTO): any {
    if (!data) return rez;

    if (data.sortcriteria != null) {
      const t: any = {};
      for (const i in data.sortcriteria) {
        const sc: RequestSortCriteriaDTO = data.sortcriteria[i];
        t[sc.field] = sc.asc ? 1 : -1;
      }
      rez = rez.sort(t);
    }
    if (data.page != null && data.onpage != null) {
      const s = (data.page - 1) * data.onpage;
      rez = rez.skip(s);
      rez = rez.limit(data.onpage);
    }
    return rez;
  }
}
