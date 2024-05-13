import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const headers = request.headers;
    const authorization = headers.authorization;

    if (authorization == undefined) return null;
    if (!authorization) return null;

    const t = authorization.split(' ');
    if (t.length != 2) return null;

    const token = t[1];

    return token;
  },
);
