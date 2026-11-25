import { ApiBase } from '@/api/methods/api-base.js';
import type { CommentCreateRequest } from '@/types/comment-create-request.js';
import type { CommentDeleteRequest } from '@/types/comment-delete-request.js';
import type { CommentListRequest } from '@/types/comment-list-request.js';
import type { CommentUpdateRequest } from '@/types/comment-update-request.js';
import type { KeyComment } from '@/types/key-comment.js';
import type { RequestConfig } from '@/types/request-config.js';

export class ApiComments extends ApiBase {
  /**
   * List the discussion of a {@link Key  key} in one language, newest first. Deleted comments are
   * left out, and reading does not mark comments as read. `keys.getDetails()` returns the same
   * comments for up to 100 keys at once.
   *
   * @param request Comment list request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#list-comments-of-a-key  Localazy API Docs}
   */
  public async list(request: CommentListRequest, config?: RequestConfig): Promise<KeyComment[]> {
    const response: { comments: KeyComment[] } = (await this.api.client.get(
      ApiComments.commentsUrl(request),
      config,
    )) as { comments: KeyComment[] };

    return response.comments;
  }

  /**
   * Add a comment to the discussion of a {@link Key  key} in one language, authored by the token's
   * user. It behaves like a comment written in Localazy: unread for the other users, notifications
   * and e-mails are sent, and the `comment_added` webhook fires.
   *
   * @param request Comment create request config.
   * @param config Request config.
   * @returns ID of the new comment.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#add-a-comment  Localazy API Docs}
   */
  public async create(request: CommentCreateRequest, config?: RequestConfig): Promise<string> {
    const response: { result: string } = (await this.api.client.post(
      ApiComments.commentsUrl(request),
      { text: request.text },
      config,
    )) as { result: string };

    return response.result;
  }

  /**
   * Replace the text of a comment. Only its author may: a comment of another user fails with `401`,
   * even for a manager or owner. A comment that is deleted or not on this key and language fails
   * with `404`. No notification or webhook is sent.
   *
   * @param request Comment update request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#edit-a-comment  Localazy API Docs}
   */
  public async update(request: CommentUpdateRequest, config?: RequestConfig): Promise<void> {
    const commentId: string = ApiBase.getId(request.comment, 'comment');

    await this.api.client.put(
      `${ApiComments.commentsUrl(request)}/${commentId}`,
      { text: request.text },
      config,
    );
  }

  /**
   * Delete a comment. Only its author may: a comment of another user fails with `401`, even for a
   * manager or owner. A comment that is already deleted or not on this key and language fails with
   * `404`.
   *
   * @param request Comment delete request config.
   * @param config Request config.
   *
   * @see {@link https://localazy.com/docs/api/source-keys#delete-a-comment  Localazy API Docs}
   */
  public async delete(request: CommentDeleteRequest, config?: RequestConfig): Promise<void> {
    const commentId: string = ApiBase.getId(request.comment, 'comment');

    await this.api.client.delete(`${ApiComments.commentsUrl(request)}/${commentId}`, config);
  }

  protected static commentsUrl(request: CommentListRequest): string {
    const { project, key, lang }: CommentListRequest = request;
    const projectId: string = ApiBase.getId(project, 'project');
    const keyId: string = ApiBase.getId(key, 'key');
    const locale: string = encodeURIComponent(ApiBase.requireLang(lang, 'lang'));

    return `/projects/${projectId}/keys/${keyId}/comments/${locale}`;
  }
}
