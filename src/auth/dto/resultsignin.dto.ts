import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/app/dto/message.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { AccessTokenDto } from './accesstoken.dto';

@Injectable()
export default class ResultSignInDTO {
  @ApiProperty({
    example: true,
    description: 'Exist or no Error',
    type: 'boolean',
  })
  err: boolean;

  @ApiProperty({
    description: 'Access token',
    type: AccessTokenDto,
  })
  accesstoken: AccessTokenDto;

  @ApiProperty({
    description: 'Message List',
    type: MessageDto,
    isArray: true,
  })
  messages?: MessageDto[];

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
