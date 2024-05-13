import Idto from '../interfaces/idto.interface';
import ResultMetaAlternateDTO from 'src/app/dto/resultmetaalternate.dto';

export default class ResultMetaDTO implements Idto {
  title?: string;
  description?: string;
  author?: string;
  languageCode?: string;
  revisitAfter?: string;
  rating?: string;
  canonical?: string;
  image?: string;
  alternates?: ResultMetaAlternateDTO[];
}
