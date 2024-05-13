export class ToolsDate {
  public static getTimeStamp(): number {
    let t = new Date().getTime();
    t = t / 1000;
    t = Math.round(t);
    return t;
  }

  public static convertTimestampToDate(timestamp?: number): Date {
    if (timestamp === undefined) return new Date();

    const t = timestamp * 1000;
    return new Date(t);
  }
}
