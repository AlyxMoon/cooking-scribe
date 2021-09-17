
declare module 'thinkagain' {
  type ConnectionOptions = import('rethinkdb').ConnectionOptions

  export default function (config: ConnectionOptions): any
}
