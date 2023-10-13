describe('Error', (): void => {
  test('error response', async (): Promise<void> => {
    // prepare
    let name: string | undefined;
    let message: string | undefined;
    let code: string | undefined;

    // test
    try {
      await api.keys.update({ project, key: 'unknown-key-id', comment: 'Key comment' });
    } catch (e: any) {
      name = e.name;
      message = e.message;
      code = e.code;
    }

    // verify
    expect(name).toBe('LocalazyError');
    expect(message).toBe('invalid_id');
    expect(code).toBe(400);
  });
});
