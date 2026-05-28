export class ThemeColors {
  name: string = '';
  bg: string = '#F5F5F5';
  card: string = '#FFFFFF';
  primary: string = '#007AFF';
  primaryLight: string = '#007AFF10';
  text: string = '#1A1A1A';
  textSecondary: string = '#666';
  textHint: string = '#999';
  textPlaceholder: string = '#CCC';
  border: string = '#F0F0F0';
  success: string = '#34C759';
  successLight: string = '#34C75920';
  warning: string = '#FF9500';
  warningLight: string = '#FF950020';
  danger: string = '#FF3B30';
  dangerLight: string = '#FF3B3020';
  tabActive: string = '#007AFF';
  tabInactive: string = '#999';
  inputBg: string = '#FFFFFF';
  shadow: string = 'rgba(0,0,0,0.06)';
  courseBlue: string = '#4A90D9';
  courseYellow: string = '#E8A838';
  courseGreen: string = '#34C759';
  courseRed: string = '#FF3B30';
  restGray: string = '#8E8E93';

  static light(): ThemeColors {
    const t = new ThemeColors();
    t.name = '浅色';
    t.bg = '#F5F5F5';
    t.card = '#FFFFFF';
    t.primary = '#007AFF';
    t.primaryLight = '#007AFF10';
    t.text = '#1A1A1A';
    t.textSecondary = '#666';
    t.textHint = '#999';
    t.textPlaceholder = '#CCC';
    t.border = '#F0F0F0';
    t.tabActive = '#007AFF';
    t.tabInactive = '#999';
    t.inputBg = '#FFFFFF';
    return t;
  }

  static dark(): ThemeColors {
    const t = new ThemeColors();
    t.name = '深色';
    t.bg = '#1C1C1E';
    t.card = '#2C2C2E';
    t.primary = '#0A84FF';
    t.primaryLight = '#0A84FF18';
    t.text = '#FFFFFF';
    t.textSecondary = '#AEAEB2';
    t.textHint = '#636366';
    t.textPlaceholder = '#48484A';
    t.border = '#38383A';
    t.tabActive = '#0A84FF';
    t.tabInactive = '#636366';
    t.inputBg = '#2C2C2E';
    t.restGray = '#636366';
    return t;
  }

  static forest(): ThemeColors {
    const t = new ThemeColors();
    t.name = '森林';
    t.bg = '#F0F5F0';
    t.card = '#FFFFFF';
    t.primary = '#2E8B57';
    t.primaryLight = '#2E8B5718';
    t.text = '#1A3C2A';
    t.textSecondary = '#4A6B5A';
    t.textHint = '#7A9A8A';
    t.textPlaceholder = '#B0C8BA';
    t.border = '#D8E8DC';
    t.tabActive = '#2E8B57';
    t.tabInactive = '#7A9A8A';
    t.inputBg = '#FFFFFF';
    t.courseBlue = '#3D7AB5';
    t.courseYellow = '#C89230';
    t.courseGreen = '#2E8B57';
    t.courseRed = '#C0392B';
    t.success = '#2E8B57';
    t.warning = '#C89230';
    t.danger = '#C0392B';
    t.restGray = '#7A9A8A';
    return t;
  }

  static getTheme(index: number): ThemeColors {
    if (index === 1) return ThemeColors.dark();
    if (index === 2) return ThemeColors.forest();
    return ThemeColors.light();
  }

  static cycle(index: number): number {
    const next = index + 1;
    if (next > 2) return 0;
    return next;
  }
}
