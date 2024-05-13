import { Injectable } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class RequestPopulateDTO implements Idto {
  @ApiProperty({
    description: 'Populate elements',
    type: 'string',
    isArray: true,
  })
  populates?: string[];

  addToPopulates(data: any) {
    this.populates = this.populates ?? [];
    if (Array.isArray(data)) {
      this.populates = [...this.populates, ...data];
      return;
    }
    this.populates.push(data);
  }
}
