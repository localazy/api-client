import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const mockAdapter: MockAdapter = new MockAdapter(axios, { onNoMatch: 'throwException' });
