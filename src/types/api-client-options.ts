import { CreateAxiosDefaults } from 'axios';

export type ApiClientOptions = {
  authToken: string;

  apiUrl?: string;

  axios?: CreateAxiosDefaults;
};
