export interface BizComponent {
  flag: 'biz';
  componentName: string;
  displayName: string;
  configure: object;
}

export function configure(
  // config: object,
  componentName: string,
  displayName?: string
) {
  return function <T>(target: T): T & BizComponent {
    const BizTarget = target as T & BizComponent;
    BizTarget.flag = 'biz';
    BizTarget.componentName = componentName;
    BizTarget.displayName = displayName || componentName;
    // BizTarget.configure = config;

    return BizTarget;
  };
}
