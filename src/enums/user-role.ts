export enum UserRole {
  NONE = 'none',
  TRANSLATOR = 'translator',
  TRUSTED_TRANSLATOR = 'trusted_translator',
  REVIEWER = 'reviewer',
  MANAGER = 'manager',
  OWNER = 'owner',
  VIEWER = 'viewer',
  MEMBER = 'member',
  /**
   * A custom role of the organization; `Project.customRole` names it.
   */
  CUSTOM = 'custom',
  /**
   * @deprecated The API never returns this role.
   */
  DEVELOPER = 'developer',
}
