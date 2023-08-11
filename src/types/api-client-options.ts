import { CreateAxiosDefaults } from 'axios';

export type ApiClientOptions = {
  /**
   * TODO docs
   */
  authToken: string;

  /**
   * TODO docs
   */
  apiUrl?: string;

  /**
   * TODO docs
   */
  axios?: CreateAxiosDefaults;
};
