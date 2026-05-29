import type { Homework } from '../model/Homework';
import { homeworkController } from "@bundle:com.studymanager.app/entry/ets/controller/HomeworkController";
import { CommonConstants } from "@bundle:com.studymanager.app/entry/ets/common/constants/CommonConstants";
import { Logger } from "@bundle:com.studymanager.app/entry/ets/common/utils/Logger";
export enum AlertLevel {
    NORMAL = 0,
    WARNING = 1,
    URGENT = 2
}
export class AlertInfo {
    level: AlertLevel = AlertLevel.NORMAL;
    message: string = '';
    homeworkId: number = -1;
    timestamp: number = Date.now();
}
@Observed
export class AlertController {
    @Track
    alerts: AlertInfo[] = [];
    checkAll(): void {
        const homeworks = homeworkController.homeworks;
        for (let i = 0; i < homeworks.length; i++) {
            const hw = homeworks[i];
            if (hw.completed)
                continue;
            const remainingHours = hw.getRemainingHours();
            const alertThreshold = CommonConstants.ALERT_THRESHOLD_HOURS;
            if (hw.isOverdue()) {
                this.triggerAlert(hw, AlertLevel.URGENT, `作业已逾期：${hw.title}`, false);
            }
            else if (remainingHours < 4) {
                this.triggerAlert(hw, AlertLevel.URGENT, `紧急：${hw.title} 还有 ${remainingHours.toFixed(1)} 小时截止！`, false);
            }
            else if (remainingHours < alertThreshold) {
                if (!this.isDuplicateAlert(hw, AlertLevel.WARNING)) {
                    this.triggerAlert(hw, AlertLevel.WARNING, `提醒：${hw.title} 还有 ${remainingHours.toFixed(0)} 小时截止`, false);
                }
            }
        }
    }
    private triggerAlert(hw: Homework, level: AlertLevel, msg: string, duplicate: boolean): void {
        if (!duplicate) {
            const alerts = this.alerts;
            let existing: AlertInfo | undefined = undefined;
            for (let i = 0; i < alerts.length; i++) {
                if (alerts[i].homeworkId === hw.id && alerts[i].level === level) {
                    existing = alerts[i];
                    break;
                }
            }
            if (existing !== undefined)
                return;
        }
        const alert = new AlertInfo();
        alert.level = level;
        alert.message = msg;
        alert.homeworkId = hw.id;
        alert.timestamp = Date.now();
        this.alerts.unshift(alert);
        if (this.alerts.length > 50) {
            this.alerts.pop();
        }
        Logger.warn(`Alert: ${msg}`);
    }
    private isDuplicateAlert(hw: Homework, level: AlertLevel): boolean {
        const alerts = this.alerts;
        for (let i = 0; i < alerts.length; i++) {
            if (alerts[i].homeworkId === hw.id &&
                alerts[i].level === level &&
                Date.now() - alerts[i].timestamp < 60000 * 30) {
                return true;
            }
        }
        return false;
    }
    clearAlerts(): void {
        this.alerts = [];
        Logger.info('Alerts cleared');
    }
    dismissAlert(timestamp: number): void {
        const alerts = this.alerts;
        for (let i = alerts.length - 1; i >= 0; i--) {
            if (alerts[i].timestamp === timestamp) {
                alerts.splice(i, 1);
            }
        }
    }
    getActiveAlerts(): AlertInfo[] {
        const result: AlertInfo[] = [];
        const alerts = this.alerts;
        for (let i = 0; i < alerts.length; i++) {
            if (Date.now() - alerts[i].timestamp < 60000 * 60) {
                result.push(alerts[i]);
            }
        }
        return result;
    }
    hasUrgentAlerts(): boolean {
        const alerts = this.alerts;
        for (let i = 0; i < alerts.length; i++) {
            if (alerts[i].level === AlertLevel.URGENT &&
                Date.now() - alerts[i].timestamp < 60000 * 10) {
                return true;
            }
        }
        return false;
    }
}
export const alertController = new AlertController();
