
declare module 'thinkagain' {
  type ConnectionOptions = import('rethinkdb').ConnectionOptions

  export type CreateModelOptions = {
    init?: boolean,
    timeFormat?: 'raw' | 'native',
    validate?: 'oncreate' | 'onsave',
  }

  export type Model = any

  export type Document = any

  interface ThinkAgain {
    createModel: (name: string, schema: Record<string, any>, options?: CreateModelOptions) => Model
  }

  export default function (config: ConnectionOptions): ThinkAgain
}
