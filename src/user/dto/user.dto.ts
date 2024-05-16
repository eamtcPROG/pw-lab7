import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class UserDto implements Idto {
  @ApiProperty({
    example: '123423412341234123',
    description: 'Unique ID',
    type: 'string',
  })
  id: string;

  @ApiProperty({
    example: 'examplde@example.com',
    description: 'User email - unique in system',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: '*****',
    description: 'User password (Hashed)',
    type: 'string',
  })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'User name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User surname',
    type: 'string',
  })
  surname: string;

  @ApiProperty({
    example: ['ADMIN', 'BASIC'],
    description: 'User roles',
    type: 'array',
    items: {
      type: 'string',
    },
  })
  roles: string[];
}

export class PostUserDto implements Idto {
  @ApiProperty({
    example: 'examplde@example.com',
    description: 'User email - unique in system',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: '*****',
    description: 'User password (Hashed)',
    type: 'string',
  })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'User name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User surname',
    type: 'string',
  })
  surname: string;

  @ApiProperty({
    example: ['ADMIN', 'BASIC'],
    description: 'User roles',
    type: 'array',
    items: {
      type: 'string',
    },
  })
  roles: string[];
}

export class LoginDto implements Idto {
  @ApiProperty({
    example: 'examplde@example.com',
    description: 'User email - unique in system',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: '*****',
    description: 'User password (Hashed)',
    type: 'string',
  })
  password: string;
}
