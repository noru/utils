import * as React from 'react'
import { isString, isNumber, capitalizeFirst } from '..'

export type ReactAttributes = React.HTMLAttributes<any> & JSX.IntrinsicAttributes

export function appendClass<T extends { className: string }>(child: React.ReactChild, ...classes: string[]) {
  if (isString(child) || isNumber(child)) {
    return child
  }
  let className = `${child.props.className}  ${classes.join(' ')}`

  return overrideProps<T>(child, _ => ({ className } as Partial<T>))
}

export function overrideProps<T extends ReactAttributes>(
  child: React.ReactChild,
  propsMapper: (props: T) => Partial<T>,
) {
  if (isString(child) || isNumber(child)) {
    return child
  }
  return React.cloneElement<T>(child, propsMapper(child.props))
}

type Handler<Args extends any[] = any[]> = (...args: Args) => void

type ProxiedHandler = (origin: Handler) => Handler

export function overrideEventhandler<T extends keyof GlobalEventHandlersEventMap>(
  child: React.ReactChild,
  eventName: T,
  deligator: ProxiedHandler,
) {
  let handlerName = 'on' + capitalizeFirst(eventName)
  return overrideProps(child, props => ({ [handlerName]: deligator(props[handlerName]) }))
}
