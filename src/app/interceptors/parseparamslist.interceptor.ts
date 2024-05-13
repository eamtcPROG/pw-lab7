import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestSortCriteriaDTO from 'src/app/dto/requestsortcriteria.dto';
import RequestPopulateDTO from '../dto/requestpopulate.dto';
import RequestCriteriaDTO from 'src/app/dto/requestcriteria.dto';
@Injectable()
export class ParseParamsList implements NestInterceptor {
  constructor(protected readonly configService: ConfigService) {}

  prepareRequestFilterDTO(query: any): Array<RequestFilterDTO> | null {
    const arrayRequestFilterDTO = new Array<RequestFilterDTO>();
    const filter = query['filters'] != undefined ? query['filters'] : null;
    if (filter === null) return null;
    const filters = filter.split('|');
    filters.map((item: any) => {
      const filterTmp = item.split(',');
      const requestFilterDTO = new RequestFilterDTO();
      requestFilterDTO.field = filterTmp[0];
      filterTmp.shift();
      requestFilterDTO.values = filterTmp;
      arrayRequestFilterDTO.push(requestFilterDTO);
    });

    return arrayRequestFilterDTO;
  }

  prepareRequestCriteriaDTO(query: any): Array<RequestCriteriaDTO> | null {
    const arrayRequestCriteriaDTO = new Array<RequestCriteriaDTO>();
    const criteria = query['criteria'] != undefined ? query['criteria'] : null;
    if (criteria === null) return null;
    const criterias = criteria.split('|');
    criterias.map((item: any) => {
      const criteriaTmp = item.split(',');
      const requestCriteriaDTO = new RequestCriteriaDTO();
      requestCriteriaDTO.id = criteriaTmp[0];
      criteriaTmp.shift();
      requestCriteriaDTO.values = criteriaTmp;
      arrayRequestCriteriaDTO.push(requestCriteriaDTO);
    });

    return arrayRequestCriteriaDTO;
  }

  prepareRequestRangeDTO(query: any): Array<RequestCriteriaDTO> | null {
    const arrayRequestRangeDTO = new Array<RequestCriteriaDTO>();
    const range = query['range'] != undefined ? query['range'] : null;
    if (range === null) return null;
    const ranges = range.split('|');
    ranges.map((item: any) => {
      const rangeTmp = item.split(',');
      const requestRangeDTO = new RequestCriteriaDTO();
      requestRangeDTO.id = rangeTmp[0];
      rangeTmp.shift();
      requestRangeDTO.values = rangeTmp;
      arrayRequestRangeDTO.push(requestRangeDTO);
    });

    return arrayRequestRangeDTO;
  }

  prepareRequestPopulateDTO(query: any): RequestPopulateDTO {
    const requestPopulateDTO = new RequestPopulateDTO();
    requestPopulateDTO.populates = [];

    const populates =
      query['populates'] != undefined ? query['populates'] : null;
    if (populates === null) return requestPopulateDTO;

    requestPopulateDTO.populates = populates.split(',');

    return requestPopulateDTO;
  }

  prepareRequestSortCriteriaDTO(
    query: any,
  ): Array<RequestSortCriteriaDTO> | null {
    const arrayRequestSortCriteriaDTO = new Array<RequestSortCriteriaDTO>();

    const sortCriteria = query['order'] != undefined ? query['order'] : null;
    if (sortCriteria === null) return null;
    const sortCriterias = sortCriteria.split('|');

    sortCriterias.map((item: string) => {
      const sortCriteriaTmp = item.split(',');
      const requestSortCriteriaDTO = new RequestSortCriteriaDTO();
      requestSortCriteriaDTO.field = sortCriteriaTmp[0];
      requestSortCriteriaDTO.asc = sortCriteriaTmp[1] == 'asc' ? true : false;
      arrayRequestSortCriteriaDTO.push(requestSortCriteriaDTO);
    });

    return arrayRequestSortCriteriaDTO;
  }

  prepareRequestListDTO(query: any): RequestListDTO {
    const requestListDTO = new RequestListDTO();
    const defaultOnPage = parseInt(
      this.configService.get('config.default_on_page') ?? '10',
    );

    let page: number = query.page ? parseInt(query.page) : 1;
    page = isNaN(page) || page < 1 ? 1 : page;

    let onpage: number = query.onpage ? parseInt(query.onpage) : defaultOnPage;
    onpage = isNaN(onpage) || onpage < 1 ? defaultOnPage : onpage;

    requestListDTO.page = page;
    requestListDTO.onpage = onpage;
    requestListDTO.filters = this.prepareRequestFilterDTO(query) ?? [];
    requestListDTO.sortcriteria =
      this.prepareRequestSortCriteriaDTO(query) ?? [];
    requestListDTO.populate = this.prepareRequestPopulateDTO(query);
    requestListDTO.criteria = this.prepareRequestCriteriaDTO(query) ?? [];
    requestListDTO.range = this.prepareRequestRangeDTO(query) ?? [];

    return requestListDTO;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;
    const requestListDTO = this.prepareRequestListDTO(query);
    context.switchToHttp().getRequest().requestList = requestListDTO;

    return next.handle();
  }
}
