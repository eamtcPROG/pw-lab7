import { Injectable } from '@nestjs/common';

import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { AccessTokenDto } from './accesstoken.dto';

@Injectable()
export default class ResultSignInDTO {
  @ApiProperty({
    description: 'Access token',
    type: AccessTokenDto,
  })
  accesstoken: AccessTokenDto;

  @ApiProperty({
    description: 'Specific Object DTO',
    type: UserDto,
  })
  obj?: UserDto;

  @ApiProperty({
    description: 'Specific Object DTO',
    type: [],
  })
  roles: string[];
}
