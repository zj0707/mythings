import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(0x0000, 'tl-card', 'Ability onCreate');
    }
    onDestroy(): void {
        hilog.info(0x0000, 'tl-card', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        windowStage.loadContent('pages/MainPage', (err) => {
            if (err.code) {
                hilog.error(0x0000, 'tl-card', 'Failed: ' + JSON.stringify(err));
                return;
            }
        });
    }
    onForeground(): void { }
    onBackground(): void { }
}
