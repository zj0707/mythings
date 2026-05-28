import { Homework } from '../model/Homework';
import { homeworkController } from './HomeworkController';
import { planController } from './PlanController';
import { TimeUtils } from '../common/utils/TimeUtils';

export enum QuestionType {
  CONFIRM_TIME = 0,
  ADJUST_PLAN = 1,
  FEEDBACK = 2,
}

export class StudentQuestion {
  id: number = 0;
  question: string = '';
  type: QuestionType = QuestionType.CONFIRM_TIME;
  options: string[] = [];
  homeworkId: number = -1;

  static createConfirmTime(homeworkId: number, question: string, options: string[]): StudentQuestion {
    const q = new StudentQuestion();
    q.id = Date.now();
    q.homeworkId = homeworkId;
    q.type = QuestionType.CONFIRM_TIME;
    q.question = question;
    q.options = options;
    return q;
  }

  static createAdjustPlan(question: string, options: string[]): StudentQuestion {
    const q = new StudentQuestion();
    q.id = Date.now();
    q.homeworkId = -1;
    q.type = QuestionType.ADJUST_PLAN;
    q.question = question;
    q.options = options;
    return q;
  }
}

@Observed
export class StudentQuestionsController {
  @Track currentQuestion: StudentQuestion | null = null;
  questionHistory: StudentQuestion[] = [];

  checkAndAsk(): StudentQuestion | null {
    const urgentHw = homeworkController.getUrgentHomeworks();
    if (urgentHw.length > 0 && this.currentQuestion === null) {
      const question = this.generateTimeWarning(urgentHw);
      this.currentQuestion = question;
      this.questionHistory.push(question);
      return question;
    }

    const plan = planController.currentPlan;
    if (plan.slots.length > 0 && this.currentQuestion === null) {
      const overload = this.checkOverload();
      if (overload !== null) {
        this.currentQuestion = overload;
        this.questionHistory.push(overload);
        return overload;
      }
    }

    return null;
  }

  private generateTimeWarning(homeworks: Homework[]): StudentQuestion {
    const hw = homeworks[0];
    const remainingHours = hw.getRemainingHours();
    const estimatedHours = (hw.estimatedMinutes - hw.actualMinutes) / 60;

    if (remainingHours < estimatedHours) {
      return StudentQuestion.createConfirmTime(
        hw.id,
        `时间不够了！${hw.title} 预计还需 ${TimeUtils.formatMinutes(hw.estimatedMinutes - hw.actualMinutes)}，但只剩 ${remainingHours.toFixed(1)} 小时。是否调整计划？`,
        ['减少预计时间', '推迟截止时间', '以后再说']
      );
    }
    return StudentQuestion.createConfirmTime(
      hw.id,
      `提醒：${hw.title} 还剩 ${remainingHours.toFixed(0)} 小时截止，现在开始吗？`,
      ['现在开始', '稍后提醒', '已完成']
    );
  }

  private checkOverload(): StudentQuestion | null {
    const today = TimeUtils.getToday();
    const totalHours = planController.getTotalStudyHours(today);
    const profile = planController.profile;

    if (totalHours > profile.maxStudyHoursPerDay) {
      return StudentQuestion.createAdjustPlan(
        `今天安排了 ${totalHours.toFixed(1)} 小时学习任务，超过每日上限 ${profile.maxStudyHoursPerDay} 小时。需要调整吗？`,
        ['减少任务', '延长学习时间', '保持不变']
      );
    }
    return null;
  }

  answerQuestion(questionId: number, answerIndex: number): string {
    const questions = this.questionHistory;
    let question: StudentQuestion | null = null;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === questionId) {
        question = questions[i];
        break;
      }
    }
    if (question === null) return '';

    this.currentQuestion = null;

    if (question.type === QuestionType.CONFIRM_TIME) {
      return this.handleTimeConfirm(question, answerIndex);
    }
    if (question.type === QuestionType.ADJUST_PLAN) {
      return this.handlePlanAdjust(question, answerIndex);
    }
    return '';
  }

  private handleTimeConfirm(question: StudentQuestion, answerIndex: number): string {
    const hwList = homeworkController.homeworks;
    let hw: Homework | null = null;
    for (let i = 0; i < hwList.length; i++) {
      if (hwList[i].id === question.homeworkId) {
        hw = hwList[i];
        break;
      }
    }
    if (hw === null) return '';

    if (answerIndex === 0) {
      return `好的，现在开始处理 ${hw.title} 吧！`;
    }
    if (answerIndex === 1) {
      hw.deadline = Date.now() + 3600000;
      homeworkController.updateHomework(hw);
      return `已将 ${hw.title} 的截止时间推迟1小时。`;
    }
    return `已标记 ${hw.title} 为完成。`;
  }

  private handlePlanAdjust(question: StudentQuestion, answerIndex: number): string {
    planController.generatePlan();
    if (answerIndex === 0) {
      return '已重新调整计划，减少了部分任务。';
    }
    if (answerIndex === 1) {
      return '已延长今日学习时间上限。';
    }
    return '计划保持不变。';
  }
}

export const studentQuestionsController = new StudentQuestionsController();
