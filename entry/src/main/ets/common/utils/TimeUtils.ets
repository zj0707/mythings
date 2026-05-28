import { CommonConstants } from '../constants/CommonConstants';

export class TimeUtils {
  static pad(n: number): string {
    if (n < 10) return '0' + n.toString();
    return n.toString();
  }

  static formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const month = TimeUtils.pad(date.getMonth() + 1);
    const day = TimeUtils.pad(date.getDate());
    const hours = TimeUtils.pad(date.getHours());
    const minutes = TimeUtils.pad(date.getMinutes());
    return `${month}-${day} ${hours}:${minutes}`;
  }

  static formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const month = TimeUtils.pad(date.getMonth() + 1);
    const day = TimeUtils.pad(date.getDate());
    return `${month}月${day}日`;
  }

  static formatMinutes(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}分钟`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours}小时`;
    }
    return `${hours}小时${mins}分钟`;
  }

  static getToday(): number {
    const now = new Date();
    const d = now.getDay();
    if (d === 0) return 6;
    return d - 1;
  }

  static getCurrentHour(): number {
    return new Date().getHours();
  }

  static getCurrentDayName(): string {
    return CommonConstants.WEEKDAYS[TimeUtils.getToday()];
  }

  static isWeekend(day: number): boolean {
    return day >= 5;
  }

  static getEndOfDay(timestamp: number): number {
    const date = new Date(timestamp);
    date.setHours(23, 59, 59, 999);
    return date.getTime();
  }

  static daysBetween(from: number, to: number): number {
    const fromDate = new Date(from);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(to);
    toDate.setHours(0, 0, 0, 0);
    return Math.floor((toDate.getTime() - fromDate.getTime()) / (24 * 60 * 60 * 1000));
  }

  static getTimeShort(timestamp: number): string {
    const date = new Date(timestamp);
    const month = TimeUtils.pad(date.getMonth() + 1);
    const day = TimeUtils.pad(date.getDate());
    return `${month}-${day}`;
  }
}
