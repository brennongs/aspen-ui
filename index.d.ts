export * from './src'

declare module 'aspen-ui'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

export interface IChild {
  type: string
  props: {
    [key: string]: any
  }
  children?: Array<string | IChild>
}