import hilog from "@ohos:hilog";
const DOMAIN = 0x0001;
const PREFIX = 'StudyManager';
export class Logger {
    static info(msg: string): void {
        hilog.info(DOMAIN, PREFIX, msg);
    }
    static debug(msg: string): void {
        hilog.debug(DOMAIN, PREFIX, msg);
    }
    static warn(msg: string): void {
        hilog.warn(DOMAIN, PREFIX, msg);
    }
    static error(msg: string): void {
        hilog.error(DOMAIN, PREFIX, msg);
    }
}
