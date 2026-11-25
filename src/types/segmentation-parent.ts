export type SegmentationSegment = {
  /**
   * The segment's own key ID, as `files.listKeys()` reports it with `segments=true`; the ID to
   * address when writing a single segment.
   */
  id: string;

  /**
   * Zero-based position of the segment within its parent.
   */
  segIndex: number;
};

export type SegmentationParent = {
  /**
   * Parent ID, as reported by `segParentId` on each of its segments.
   */
  id: string;

  /**
   * The ID `files.listKeys()` reports the whole key under in its default mode; accepted for tags,
   * screenshots, priority and deprecation.
   */
  handle: string;

  /**
   * The key's path as a list of segments, shaped like `key` of `files.listKeys()`.
   */
  key: string[];

  /**
   * File ID.
   */
  file: string;

  /**
   * `-1` if the parent is active; any other value means it is deprecated, in which case `segments`
   * is empty and `value` is absent.
   */
  deprecated: number;

  /**
   * `true` when the split comes from explicit `<ll:segment>` markers in the source rather than from
   * the configured strategy.
   */
  explicit: boolean;

  /**
   * The key's text with one placeholder per segment. The placeholder format is internal to
   * segmentation and may change.
   */
  template: string;

  /**
   * The whole text in the requested language. Each segment contributes its translation when it has
   * one and its source text otherwise, so a partly translated key comes back mixed.
   */
  value?: string;

  /**
   * Segments ascending by `segIndex`.
   */
  segments: SegmentationSegment[];
};
