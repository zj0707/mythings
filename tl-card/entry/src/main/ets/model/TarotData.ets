export class TarotCard {
  id: number = 0;
  name: string = '';
  nameEn: string = '';
  type: number = 0;
  upright: string = '';
  reversed: string = '';
  keywords: string = '';
  element: string = '';

  constructor(id: number, name: string, nameEn: string, type: number, upright: string, reversed: string, keywords: string, element: string) {
    this.id = id; this.name = name; this.nameEn = nameEn; this.type = type;
    this.upright = upright; this.reversed = reversed; this.keywords = keywords; this.element = element;
  }
}

export enum CardType { MAJOR = 0, CUPS = 1, WANDS = 2, SWORDS = 3, PENTACLES = 4 }

export class TarotDeck {
  static load(): TarotCard[] {
    const cards: TarotCard[] = [];
    cards.push(new TarotCard(0, '愚者', 'The Fool', CardType.MAJOR, '新的开始、冒险、天真、自由、无限可能', '鲁莽、愚蠢、犹豫不决、错失良机', '开始 冒险 自由', '风'));
    cards.push(new TarotCard(1, '魔术师', 'The Magician', CardType.MAJOR, '创造力、技能、意志力、自信、掌控全局', '滥用能力、欺骗、缺乏计划、力不从心', '创造 掌控 自信', '风'));
    cards.push(new TarotCard(2, '女祭司', 'The High Priestess', CardType.MAJOR, '直觉、智慧、神秘、内在力量、耐心等待', '忽视直觉、隐藏秘密、情感封闭、肤浅', '直觉 神秘 等待', '水'));
    cards.push(new TarotCard(3, '女皇', 'The Empress', CardType.MAJOR, '丰收、母爱、美丽、自然、创造力旺盛', '奢侈、依赖、创造力枯竭、情感冷漠', '丰收 母爱 富足', '土'));
    cards.push(new TarotCard(4, '皇帝', 'The Emperor', CardType.MAJOR, '权威、稳定、领导力、结构、秩序', '专制、固执、缺乏弹性、滥用权力', '权威 秩序 稳定', '火'));
    cards.push(new TarotCard(5, '教皇', 'The Hierophant', CardType.MAJOR, '传统、信仰、教育、精神指引、仪式感', '教条、盲目服从、形式主义、思想僵化', '传统 信仰 引导', '土'));
    cards.push(new TarotCard(6, '恋人', 'The Lovers', CardType.MAJOR, '爱情、和谐、选择、信任、价值观契合', '分离、背叛、错误选择、价值观冲突', '爱情 选择 和谐', '风'));
    cards.push(new TarotCard(7, '战车', 'The Chariot', CardType.MAJOR, '胜利、意志力、决心、克服困难、掌控方向', '失控、失败、缺乏方向、内心矛盾', '胜利 掌控 前进', '水'));
    cards.push(new TarotCard(8, '力量', 'Strength', CardType.MAJOR, '勇气、力量、耐心、内在力量、以柔克刚', '软弱、自我怀疑、滥用力量、失控', '勇气 力量 耐心', '火'));
    cards.push(new TarotCard(9, '隐士', 'The Hermit', CardType.MAJOR, '内省、独处、寻求真理、智慧、指引之光', '孤立、逃避、过度保守、拒绝交流', '内省 孤独 真理', '土'));
    cards.push(new TarotCard(10, '命运之轮', 'Wheel of Fortune', CardType.MAJOR, '命运转折、好运来临、循环、机遇、顺其自然', '厄运、抗拒变化、停滞、轮回中的低谷', '命运 转折 机遇', '火'));
    cards.push(new TarotCard(11, '正义', 'Justice', CardType.MAJOR, '公平、真理、法律、因果报应、诚实', '不公、偏见、逃避责任、法律纠纷', '公平 真理 因果', '风'));
    cards.push(new TarotCard(12, '倒吊人', 'The Hanged Man', CardType.MAJOR, '暂停、牺牲、换个角度看问题、臣服、等待', '僵局、无谓牺牲、固执己见、停滞不前', '暂停 牺牲 反思', '水'));
    cards.push(new TarotCard(13, '死神', 'Death', CardType.MAJOR, '结束、重生、转变、放下过去、新的开始', '抗拒改变、停滞、恐惧、无法放下', '结束 重生 转变', '水'));
    cards.push(new TarotCard(14, '节制', 'Temperance', CardType.MAJOR, '平衡、调和、中庸之道、耐心、自我控制', '失衡、过度、缺乏节制、冲突', '平衡 调和 耐心', '火'));
    cards.push(new TarotCard(15, '恶魔', 'The Devil', CardType.MAJOR, '束缚、欲望、物质主义、执念、直面阴暗面', '解脱、挣脱束缚、觉醒、打破执念', '束缚 执念 欲望', '土'));
    cards.push(new TarotCard(16, '高塔', 'The Tower', CardType.MAJOR, '突变、崩塌、启示、真相大白、推倒重建', '减缓崩溃、回避真相、内耗、压抑', '突变 崩溃 觉醒', '火'));
    cards.push(new TarotCard(17, '星星', 'The Star', CardType.MAJOR, '希望、灵感、宁静、治愈、信任未来', '失望、丧失信心、悲观、迷失方向', '希望 治愈 灵感', '风'));
    cards.push(new TarotCard(18, '月亮', 'The Moon', CardType.MAJOR, '潜意识、梦境、恐惧、迷惑、直觉试探', '恐惧释放、真相浮现、走出迷雾', '潜意 恐惧 迷惑', '水'));
    cards.push(new TarotCard(19, '太阳', 'The Sun', CardType.MAJOR, '成功、快乐、活力、清晰、积极向上', '暂时的阴霾、信心不足、延迟的喜悦', '成功 快乐 活力', '火'));
    cards.push(new TarotCard(20, '审判', 'Judgement', CardType.MAJOR, '觉醒、重生、召唤、清算、迎接新生', '拒绝觉醒、逃避召唤、自我怀疑、愧疚', '觉醒 重生 召唤', '火'));
    cards.push(new TarotCard(21, '世界', 'The World', CardType.MAJOR, '完成、圆满、整合、旅行、大成', '未完成、停滞、半途而废、不满足', '完成 圆满 成功', '土'));

    const suits: string[][] = [['圣杯', 'Cups'], ['权杖', 'Wands'], ['宝剑', 'Swords'], ['星币', 'Pentacles']];
    const ranks: string[] = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '侍从', '骑士', '王后', '国王'];
    const elements: string[] = ['水', '火', '风', '土'];
    const uprights: string[][] = [
      ['情感丰沛 新恋情 喜悦', '和谐 平等 结合', '庆祝 团聚 欢乐', '满足 珍惜 安于现状', '失落 遗憾 展望', '回忆 纯真 分享', '幻想 选择 迷惑', '放下 离开 追寻', '愿望成真 满足', '情感圆满 家庭幸福', '敏感 梦想 新情感', '浪漫 邀请 追求', '温柔 关怀 直觉', '成熟 包容 智慧'],
      ['灵感 新计划 勇气', '规划 决策 展望', '探索 远见 扩展', '庆典 稳固 收获', '竞争 挑战 突破', '胜利 认可 晋升', '坚守 防御 信念', '快速 消息 前进', '坚持 韧性 最后冲刺', '负担 责任 压力', '新消息 冒险冲动', '行动 激情 追求', '热情 领导力 自信', '远见 企业家精神'],
      ['清晰 真相 突破', '抉择 僵局 平衡', '心碎 悲伤 愈合', '休息 恢复 内省', '失败 背叛 阴暗', '告别 过渡 疗愈', '策略 秘密 偷袭', '受限 束缚 无助', '噩梦 焦虑 内疚', '终结 放手 重生', '警惕 审视 沟通', '决断 迅捷 冲动', '理性 独立 分析', '公正 权威 真理'],
      ['务实 新机会 种子', '平衡 适应 变通', '团队 技艺 合作', '守财 安全 控制', '困难 孤立 信仰', '给予 分享 回馈', '评估 耐心 等待', '精进 专注 重复', '收获 奢侈 独立', '传承 富足 家族', '学习 踏实 新财务', '效率 责任 可靠', '务实 滋养 慷慨', '富足 稳健 享受']
    ];
    const reverseds: string[][] = [
      ['情感封闭 不满足', '失衡 分离 不和', '孤独 悲伤 取消', '厌倦 贪婪 不知足', '无法放手 重蹈覆辙', '不成熟 自私 贪婪', '逃避现实 混乱', '退缩 抗拒 停滞', '不满足 幻想破灭', '家庭不和 感情破裂', '情绪化 延迟', '善变 不真诚', '依赖 情绪勒索', '冷漠 控制欲'],
      ['拖延 缺乏方向', '优柔寡断 计划不周', '冒进 目光短浅', '不稳 拖延 未尽', '不和谐 内斗 失败', '骄傲 嫉妒 挫败', '妥协 疲惫 动摇', '混乱 拖延 停滞', '固执 最后关头放弃', '卸下重担 逃避', '坏消息 鲁莽', '急躁 缺乏耐心', '专横 缺乏同理心', '冲动 短视'],
      ['混乱 模糊 错误', '犹豫 信息过载', '恢复 释怀 接受', '不安 排斥休息', '逆袭 吸取教训', '无法告别 沉溺', '暴露 计划泄露', '自由 释放 突破', '恐惧消退 真相浮现', '无法放手 痛苦延长', '多疑 过度分析', '鲁莽 唐突', '冷漠 刻薄', '不公 偏见'],
      ['错失机会 不稳定', '失衡 慌乱 打转', '缺乏合作 内耗', '吝啬 恐惧失去', '走出困境 重拾信心', '贪婪 吝啬 亏损', '焦虑 急躁 投资失败', '缺乏专注 荒废', '过度工作 压力', '遗产纠纷 负担', '浅尝辄止 贪玩', '不负责任 散漫', '忽略自己 过度牺牲', '物质主义 贪婪']
    ];

    let idx = 22;
    for (let s = 0; s < 4; s++) {
      for (let r = 0; r < 14; r++) {
        const sType = s + 1;
        const name = suits[s][0] + ranks[r];
        const nameEn = ranks[r] + ' of ' + suits[s][1];
        const upright = uprights[s][r];
        const reversed = reverseds[s][r];
        const keywords = suits[s][0] + ' ' + ranks[r];
        cards.push(new TarotCard(idx, name, nameEn, sType, upright, reversed, keywords, elements[s]));
        idx++;
      }
    }
    return cards;
  }
}
