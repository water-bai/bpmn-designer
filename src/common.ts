export interface ListenEvent {
  type: string;
  action: (e) => void;
}

export interface Common {
  height?: number;
  center?: boolean;
  value?: string;
  elementClick?: (e: any) => void;
  elementHover?: (e: any) => void;
  elementChanged?: (e: any) => void;
}
