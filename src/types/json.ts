export type Json<K extends string | number | symbol = any, T = any> = {
  [P in K]: T | any;
};
