import { Injectable } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';

import { ApiProperty } from '@nestjs/swagger';
import RequestFilterDTO from './requestfilter.dto';
import RequestSortCriteriaDTO from './requestsortcriteria.dto';
import RequestPopulateDTO from './requestpopulate.dto';
import RequestCriteriaDTO from 'src/app/dto/requestcriteria.dto';

@Injectable()
export default class RequestListDTO implements Idto {
  @ApiProperty({
    description: 'Filter List',
    type: RequestFilterDTO,
    isArray: true,
  })
  filters?: RequestFilterDTO[];

  @ApiProperty({
    description: 'Criteria List',
    type: RequestCriteriaDTO,
    isArray: true,
  })
  criteria?: RequestCriteriaDTO[];

  @ApiProperty({
    description: 'Criteria List',
    type: RequestCriteriaDTO,
    isArray: true,
  })
  range?: RequestCriteriaDTO[];

  @ApiProperty({
    description: 'page number for list',
    type: 'number',
    required: false,
  })
  page?: number;

  @ApiProperty({
    description: 'elements on page',
    type: 'number',
    required: false,
  })
  onpage?: number;

  @ApiProperty({
    description: 'OrderCriteria',
    type: RequestSortCriteriaDTO,
    isArray: true,
  })
  sortcriteria?: RequestSortCriteriaDTO[];

  @ApiProperty({
    description: 'populate information',
    type: RequestPopulateDTO,
    required: false,
  })
  populate?: RequestPopulateDTO;

  addToSortCriteria(data: RequestSortCriteriaDTO | RequestSortCriteriaDTO[]) {
    if (this.sortcriteria == undefined) this.sortcriteria = [];
    if (Array.isArray(data)) {
      for (const item of data) {
        const obj = new RequestSortCriteriaDTO();
        this.sortcriteria.push(
          obj.getRequestSortCriteria(item.field, item.asc ?? true),
        );
      }
    } else {
      const obj = new RequestSortCriteriaDTO();
      this.sortcriteria.push(
        obj.getRequestSortCriteria(data.field, data.asc ?? true),
      );
    }
  }

  addToFilters(data: RequestFilterDTO | RequestFilterDTO[]) {
    this.filters = this.filters ?? [];
    if (Array.isArray(data)) {
      this.filters = [...this.filters, ...data];
      return;
    }
    this.filters.push(data);
  }
}
