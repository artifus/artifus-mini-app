import { WebApp } from './index'

if (typeof window !== 'undefined') {
  const anyWindow = window as any
  anyWindow.Artifus ??= {}
  anyWindow.Artifus.WebApp = WebApp
}