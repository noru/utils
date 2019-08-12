import React from 'react'
import { noop } from '../../func'

type Effect = () => () => void

function hocWithConfig<P>(Component: React.ComponentClass<P> | React.SFC<P>, effect: Effect) {
  class Composed extends React.Component<P> {
    static displayName = `withEffect<${Component.displayName || Component.name || 'Unknown'}>`
    teardown = noop
    componentDidMount() {
      this.teardown = effect()
    }

    componentWillUnmount() {
      this.teardown()
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return Composed as React.ComponentClass<P>
}

export function withEffect(effect: Effect) {
  return Component => hocWithConfig(Component, effect)
}
