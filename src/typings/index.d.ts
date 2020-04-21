// Declare globals
// eslint-disable-next-line no-unused-vars
declare const __DEV__: boolean;

// Extend globals
interface Window {
  ga: any;
  App: any;
  less: LessStatic;
}

// Declare modules for non-typed packages
declare module 'antd/dist/dark-theme';
declare module 'react-media-hook';

// Declare generic interfaces
interface MetadataObjAny {
  [key: string]: any;
}
