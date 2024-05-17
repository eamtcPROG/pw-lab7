import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { LoginDto, PostUserDto, UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/services/user.service';

import ResultSignInDTO from '../dto/resultsignin.dto';

import { JwtPayload } from '../dto/jwtpayload.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from '../dto/accesstoken.dto';
import { ToolsDate } from 'src/app/tools/tooldate';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    protected readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async processPassword(
    obj: UserDto | PostUserDto,
  ): Promise<UserDto | PostUserDto> {
    if (obj.password == undefined) return obj;
    if (obj.password == null) return obj;
    if (obj.password == '-1') return obj;

    obj.password = await this.hashPass(obj.password);

    return obj;
  }

  async hashPass(pass: string): Promise<string> {
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(pass, salt);
    return hash;
  }

  async isCorrectPass(pass: string, h: string): Promise<boolean> {
    const match: boolean = await bcrypt.compare(pass, h);
    return match;
  }

  checkUserRole(roles: string[], role: string): boolean {
    if (!roles) return false;
    if (!roles.length) return false;
    if (!role) return false;
    const rez = roles.includes(role);
    return rez;
  }

  async singIn_processAccessToken(
    rez: ResultSignInDTO,
  ): Promise<ResultSignInDTO> {
    const accessToken: AccessTokenDto = await this.getToken(rez);
    rez.accesstoken = accessToken;
    return rez;
  }

  public getPayLoad(obj: ResultSignInDTO): JwtPayload {
    const user = obj.obj ? obj.obj : null;
    if (!user) return { id: '', email: '', roles: [], name: '', surname: '' };
    const rez: JwtPayload = {
      id: user.id ? user.id : '',
      email: user.email ? user.email : '',
      roles: user.roles ? user.roles : [],
      name: user.name ? user.name : '',
      surname: user.surname ? user.surname : '',
    };
    return rez;
  }

  async getToken(obj: ResultSignInDTO): Promise<AccessTokenDto> {
    const rez = new AccessTokenDto();

    const payLoadObj: JwtPayload = this.getPayLoad(obj);

    const expVal =
      this.configService.get<string>('jwt.access_lifetime') || '10000';
    const expSec = parseInt(expVal) / 1000;

    rez.accesstoken = await this.jwtService.signAsync(payLoadObj, {
      secret: this.configService.get<string>('jwt.access_secret'),
      expiresIn: expVal,
    });

    rez.tokentype = 'Bearer';
    rez.expiresin = expSec;
    rez.untildate = ToolsDate.getTimeStamp() + expSec;

    return rez;
  }

  parseToken(token: string): JwtPayload | any {
    token = token.replace('Bearer ', '');
    const decodedJwtAccessToken: any = this.jwtService.decode(token);
    return decodedJwtAccessToken;
  }

  async getEncryptedPass(pass: string): Promise<string> {
    const hash = await this.hashPass(pass);

    return hash;
  }

  async login(obj: LoginDto): Promise<ResultSignInDTO | null> {
    let rez = new ResultSignInDTO();
    const user = (await this.userService.getByField(
      'email',
      obj.email,
    )) as UserDto;
    if (!user) return null;
    const isCorrect = await this.isCorrectPass(obj.password, user.password);
    if (!isCorrect) return null;
    rez.obj = user;
    rez.roles = user.roles;
    rez = await this.singIn_processAccessToken(rez);
    return rez;
  }
}
