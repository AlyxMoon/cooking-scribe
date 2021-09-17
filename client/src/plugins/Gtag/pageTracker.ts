import { App } from 'vue'
import { Router } from 'vue-router'

export type EmptyFunction = () => void
export type AnalyticsFunction = (
  action: string,
  eventName: string,
  extra?: string,
) => void

class PageTracker {
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  gtag: EmptyFunction | AnalyticsFunction = (): void => {}

  install (
    app: App,
    options: {
      gtag: EmptyFunction | AnalyticsFunction,
      useComponentNameAsFallback?: boolean,
      titlePrefix?: string,
      changePageTitle?: boolean,
    },
  ): void {
    if (!app.config.globalProperties.$router) return
    const {
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      gtag = (): void => {},
      useComponentNameAsFallback = true,
      titlePrefix = '',
      changePageTitle = true,
    } = options

    this.gtag = gtag

    this.setUpRouteWatcher(
      app.config.globalProperties.$router,
      { changePageTitle, titlePrefix, useComponentNameAsFallback },
    )

    app.provide('gtag', gtag)
  }

  setUpRouteWatcher (
    router: Router,
    options: {
      useComponentNameAsFallback: boolean,
      titlePrefix: string,
      changePageTitle: boolean,
    },
  ): void {
    const {
      useComponentNameAsFallback,
      titlePrefix,
      changePageTitle,
    } = options

    router.afterEach(to => {
      const pageName = titlePrefix + (
        to.meta.title ||
        to[useComponentNameAsFallback ? 'name' : 'path']
      )

      if (changePageTitle) {
        document.title = pageName
      }

      this.gtag('set', 'page', pageName)
      this.gtag('send', 'pageview')
    })
  }
}

export default PageTracker
