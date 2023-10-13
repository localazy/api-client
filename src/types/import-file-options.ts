export type ImportFileOptions = {
  /**
   * The file name.
   *
   * Default: 'content.json'
   */
  name?: string;

  /**
   * The path to the file without the file name.
   */
  path?: string;

  /**
   * Optional module specification.
   */
  module?: string;

  /**
   * Optional build type.
   */
  buildType?: string;

  /**
   * Optional product flavors.
   */
  productFlavors?: string[];
};
