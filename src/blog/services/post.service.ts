import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostRepository } from '../repositories/post.repository';
import { PostDto } from 'src/blog/dto/post.dto';

import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class PostService
  extends GeneralService<PostRepository, null>
  implements IService
{
  constructor(
    private readonly postRepository: PostRepository,
    protected readonly configService: ConfigService,
  ) {
    super(postRepository);
  }

  getKeys(): any[] {
    const rez: string[] = [];

    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new PostDto();

    rez.id = this.postRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('iduser') && obj.iduser)
      rez.iduser = this.postRepository.getParsedIdStr(obj.iduser);
    if (obj.hasOwnProperty('title')) rez.title = obj.title;
    if (obj.hasOwnProperty('content')) rez.content = obj.content;
    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    const obj: PostDto = new PostDto();

    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('iduser')) obj.iduser = postObj.iduser;
    if (postObj.hasOwnProperty('title')) obj.title = postObj.title;
    if (postObj.hasOwnProperty('content')) obj.content = postObj.content;

    return obj;
  }
}
