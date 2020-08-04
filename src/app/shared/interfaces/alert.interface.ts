export type TAlert = 'danger' | 'warning' | 'info' | 'success';

export interface IAlert {
  type: TAlert;
  text: string;
}
