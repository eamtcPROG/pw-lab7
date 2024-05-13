import RequestListDTO from '../dto/requestlist.dto';
import ResultDeleteDTO from '../dto/resultdelete.dto';
import ResultAddDTO from '../dto/resultadd.dto';
import * as crypto from 'crypto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';

export class CommonTools {
  public static headers: Record<string, string>;
  public static setHeaders(headers: Record<string, string>): void {
    CommonTools.headers = headers;
  }
  public static getHeader(key: string): string | null {
    if (CommonTools.headers.hasOwnProperty(key))
      return CommonTools.headers[key];

    return CommonTools.headers[key.toLowerCase()] || null;
  }

  public static setTotalPages(
    data?: RequestListDTO,
    totalObjects?: number,
  ): number {
    const onpage = data?.onpage ?? 0;
    let total = totalObjects ?? 0;
    total = onpage ? Math.ceil(total / onpage) : 1;
    return total;
  }

  public static toDeleteResult(value: boolean): ResultDeleteDTO {
    const result = new ResultDeleteDTO();
    result.deleted = value;
    return result;
  }
  public static toAddResult(value: boolean): ResultAddDTO {
    const result = new ResultAddDTO();
    result.added = value;
    return result;
  }

  public static generateRandomString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  public static generateRandomDigitString(length: number): string {
    const digits = '0123456789';
    const digitsLength = digits.length;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digitsLength));
    }

    return result;
  }
  public static generateMD5Hash(input: string): string {
    const hash = crypto.createHash('md5');
    hash.update(input);
    return hash.digest('hex');
  }

  public static generateMD5HashFromRandomDigitString(length: number): string {
    return CommonTools.generateMD5Hash(
      CommonTools.generateRandomDigitString(length),
    );
  }

  public static generateRandomStringWithMD5Hash(length: number): any {
    const randomString = CommonTools.generateRandomDigitString(length);
    const hash = CommonTools.generateMD5Hash(randomString);
    const obj = {
      randomString: randomString,
      hash: hash,
    };
    return obj;
  }

  public static isHashMatching(
    plainText: string,
    hashToCompare: string,
  ): boolean {
    const md5Hash = CommonTools.generateMD5Hash(plainText);
    console.log('md5Hash', md5Hash, hashToCompare);
    return md5Hash === hashToCompare;
  }

  private nameFromToStringRegexFunction = /^function\s?([^\s(]*)/;

  public functionName(object: any, defaultName: string): string {
    let result = '';

    if (typeof object === 'function') {
      result =
        object.name ||
        object.toString().match(this.nameFromToStringRegexFunction)[1];
    } else if (typeof object.constructor === 'function') {
      result = this.functionName(object.constructor, defaultName);
    }
    return result || defaultName;
  }

  public arrayIntersect(arr1: any[], arr2: any[]): any[] {
    const rez = [];

    for (const i of arr1) {
      if (arr2.indexOf(arr1[i]) == -1) continue;
      rez[rez.length] = arr1[i];
    }

    return rez;
  }

  public static populateObject(
    customPopulate?: Array<string>,
  ): RequestPopulateDTO {
    const populateArray = customPopulate ?? ['values', 'idlanguage', 'media'];
    const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
    requestPopulateDTO.populates = populateArray;
    return requestPopulateDTO;
  }

  public static rtrimSymbolWithRegex(
    originalString: string,
    symbolToRemove: string,
  ): string {
    const regex = new RegExp(`${symbolToRemove}$`);
    return originalString.replace(regex, '');
  }

  public static hasAtLeastOneKey(obj: object): boolean {
    return Object.keys(obj).length > 0;
  }
}
