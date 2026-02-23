import type { AiTranslateRequest, AiTranslateResponse, ApiClient, Project } from '@/main.js';
import { fullProject } from '@tests/fixtures/index.js';
import { assertNotNull } from '@tests/support/assert-not-null.js';
import { getApiClient, getToken } from '@tests/support/index.js';
import type { MockInstance } from 'vitest';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('AI Translation', (): void => {
  let api: ApiClient;
  let project: Project;

  beforeEach(async (): Promise<void> => {
    fullProject.mockResponses();

    api = getApiClient();
    project = await api.projects.first();
  });

  test('api.ai.translate', async (): Promise<void> => {
    const request: AiTranslateRequest = {
      project,
      from: 'en',
      to: 'cs',
      items: [
        {
          key: 'btn_submit',
          source: 'Submit',
          comment: 'Button label for form submission',
        },
        {
          key: 'welcome_message',
          source: 'Welcome back, %s!',
          lengthLimit: 50,
        },
      ],
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: AiTranslateResponse = await api.ai.translate(request);

    expect(response.result).toBe(true);
    const firstItem = assertNotNull(response.items?.[0]);
    expect(firstItem.key).toBe('btn_submit');
    expect(firstItem.translation).toBe('Odeslat');
    expect(spy).toHaveBeenCalledWith('https://api.localazy.com/projects/_a0000000000000000001/ai', {
      body: '{"from":"en","to":"cs","items":[{"key":"btn_submit","source":"Submit","comment":"Button label for form submission"},{"key":"welcome_message","source":"Welcome back, %s!","lengthLimit":50}]}',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });

  test('api.ai.translate with fallback', async (): Promise<void> => {
    const request: AiTranslateRequest = {
      project,
      from: 'en',
      to: 'de',
      fallback: 'deepl',
      items: [
        {
          source: 'Hello, world!',
        },
      ],
    };
    const spy: MockInstance = vi.spyOn(globalThis, 'fetch');
    const response: AiTranslateResponse = await api.ai.translate(request);

    expect(response.result).toBe(true);
    expect(spy).toHaveBeenCalledWith('https://api.localazy.com/projects/_a0000000000000000001/ai', {
      body: '{"from":"en","to":"de","fallback":"deepl","items":[{"source":"Hello, world!"}]}',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  });
});
