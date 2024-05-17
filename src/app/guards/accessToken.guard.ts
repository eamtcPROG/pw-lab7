import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import ResultErrorDTO from 'src/app/dto/resulterror.dto';
import { MessageTypes } from 'src/app/tools/messagetypes';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private role?: string[]) {
    super();
  }
  canActivate(context: ExecutionContext) {
    // add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.

    return super.canActivate(context);
  }

  // eslint-disable-next-line
  handleRequest(err: any, user: any, info: any) {
    // console.log('err', err, user, info);
    if (err || !user) {
      const r = new ResultErrorDTO();
      r.err = true;
      r.messages = MessageTypes.processMessage(MessageTypes.JWT_REQUIRED);
      throw err || new UnauthorizedException(r);
    }
    if (this.role && this.role.length > 0) {
      if (!user.roles.includes(...this.role)) {
        const r = new ResultErrorDTO();
        r.err = true;
        r.messages = MessageTypes.processMessage(MessageTypes.INVALID_ROLE);
        throw new UnauthorizedException(r);
      }
    }
    return user;
  }
}
