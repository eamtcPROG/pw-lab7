import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../repositories/user.repository';
import { UserDto } from 'src/user/dto/user.dto';

import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UserService
  extends GeneralService<UserRepository, null>
  implements IService
{
  constructor(
    private readonly userRepository: UserRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    super(userRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['email']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new UserDto();

    rez.id = this.userRepository.getParsedIdStr(obj._id);

    if (obj.hasOwnProperty('email')) rez.email = obj.email;
    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('surname')) rez.surname = obj.surname;
    if (obj.hasOwnProperty('roles')) rez.roles = obj.roles;

    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    let obj: UserDto = new UserDto();

    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('email')) obj.email = postObj.email;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('surname')) obj.surname = postObj.surname;
    if (postObj.hasOwnProperty('roles')) obj.roles = postObj.roles;
    if (postObj.hasOwnProperty('password')) {
      obj.password = postObj.password;
      obj = (await this.authService.processPassword(obj)) as UserDto;
    }

    return obj;
  }
}
