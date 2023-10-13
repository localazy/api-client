export type File = {
  /**
   * Unique identifier of the file.
   */
  id: string;

  /**
   * Type of the file; please refer to file formats. Value complex is used for complex files described above.
   */
  type: string;

  /**
   * Name of the file.
   */
  name: string;

  /**
   * Stored path to the file. Optional and only available if provided.
   */
  path?: string;

  /**
   * The module the file belongs to. Optional and only available if provided.
   */
  module?: string;

  /**
   * A list of associated product flavors. Optional and only available if provided.
   */
  productFlavors?: string;

  /**
   * A build type the file is associated with. Optional and only available if provided.
   */
  buildType?: string;
};
