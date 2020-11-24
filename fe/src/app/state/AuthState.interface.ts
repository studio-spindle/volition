import {Dayjs} from 'dayjs';

export interface AuthStateModel {
  token: string | null;
  username: string | null;
  expiresAt: Dayjs | null;
}
