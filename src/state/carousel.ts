import { observable } from '@legendapp/state'

export const pagination$ = observable({
  current: 0,
  total: 0,
})
