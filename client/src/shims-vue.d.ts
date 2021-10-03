/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{
    $store: any
  }, {}, any>
  export default component
}
