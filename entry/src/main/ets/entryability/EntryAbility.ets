import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';
import { alertController } from '../controller/AlertController';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(0x0000, 'StudyManager', 'Ability onCreate');
    alertController.checkAll();
  }

  onDestroy(): void {
    hilog.info(0x0000, 'StudyManager', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    hilog.info(0x0000, 'StudyManager', 'onWindowStageCreate');
    windowStage.loadContent('pages/MainPage', (err) => {
      if (err.code) {
        hilog.error(0x0000, 'StudyManager', `Failed to load content: ${JSON.stringify(err)}`);
        return;
      }
      hilog.info(0x0000, 'StudyManager', 'Content loaded');
    });
  }

  onWindowStageDestroy(): void {
    hilog.info(0x0000, 'StudyManager', 'onWindowStageDestroy');
  }

  onForeground(): void {
    hilog.info(0x0000, 'StudyManager', 'onForeground');
    alertController.checkAll();
  }

  onBackground(): void {
    hilog.info(0x0000, 'StudyManager', 'onBackground');
  }
}
