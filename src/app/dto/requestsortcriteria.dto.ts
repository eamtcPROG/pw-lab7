import { Injectable } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';

import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class RequestSortCriteriaDTO implements Idto {
  @ApiProperty({ description: 'field key', type: 'string', required: true })
  field: string;

  @ApiProperty({
    description: 'direction',
    type: 'boolean',
    required: false,
  })
  asc?: boolean;

  getRequestSortCriteria(field: string, asc: boolean) {
    this.field = field;
    this.asc = asc;
    return this;
  }
}
