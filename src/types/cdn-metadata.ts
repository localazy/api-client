export type CdnTagMetadata = {
  /**
   * Release tag ID; `_e0` for `latest`.
   */
  tagId: string;

  /**
   * Release tag name.
   */
  tagName: string;

  /**
   * Public `delivery.localazy.com` URL of the tag's `.v2.json` metadata file.
   */
  metadataUrl: string;
};

export type CdnMetadata = {
  /**
   * Whether the CDN is enabled for the project. When `false`, `metadataUrls` is empty.
   */
  enabled: boolean;

  /**
   * One entry per published release tag, plus `latest`.
   */
  metadataUrls: CdnTagMetadata[];
};
