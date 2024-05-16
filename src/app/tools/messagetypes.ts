import { MessageDto } from '../dto/message.dto';
interface Message {
  code: number;
  type: number;
  label: string;
}
export class MessageTypes {
  public static MESSAGE_SUCCESS = 1;
  public static MESSAGE_WARNING = 2;
  public static MESSAGE_ERROR = 3;
  public static MESSAGE_VALIDATION = 4;

  public static OBJECT_DELETE_SUCCESS = 201;

  public static ACTION_SUCCESS = 204;

  public static OBJECT_NOT_FOUND = 1000;
  public static OBJECT_FOUND = 1002;
  public static JWT_REQUIRED = 1001;
  public static OBJECT_PARENT_NOT_FOUND = 1003;
  public static OBJECT_WRONG_BODY = 1004;
  public static OBJECT_ERROR_LOGIN = 1005;

  public static OBJECT_ALREADY_IN_DATABASE = 2009;

  public static MESSAGES: { [key: number]: Message } = {
    201: {
      code: 201,
      type: MessageTypes.MESSAGE_SUCCESS,
      label: 'Object deleted with success',
    },

    204: {
      code: 204,
      type: MessageTypes.MESSAGE_SUCCESS,
      label: 'Action success',
    },
    1000: {
      code: 1000,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Object not found',
    },
    1001: {
      code: 1001,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'JWT required',
    },
    1002: {
      code: 1002,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Object already in database',
    },
    1003: {
      code: 1003,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Parent object not found in database',
    },
    1004: {
      code: 1004,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Wrong body structure',
    },
    2009: {
      code: 2009,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'Object is already in database',
    },
    1005: {
      code: 1005,
      type: MessageTypes.MESSAGE_ERROR,
      label: 'INVALID CREDENTIALS',
    },
  };

  public static processMessage(keys: number | number[]): MessageDto[] {
    const rez: MessageDto[] = [];

    if (Array.isArray(keys)) {
      for (const item of keys) {
        const t = MessageTypes.processMessageItem(item);
        if (t != null) rez[rez.length] = t;
      }
    } else {
      const t = MessageTypes.processMessageItem(keys);
      if (t != null) rez[rez.length] = t;
    }

    return rez;
  }

  public static processMessageItem(key: number): MessageDto | null {
    if (MessageTypes.MESSAGES[key] == undefined) return null;

    const item = MessageTypes.MESSAGES[key];

    const rez = new MessageDto();
    rez.code = item.code.toString();
    rez.message = item.label;
    rez.mestype = item.type;

    return rez;
  }
}
