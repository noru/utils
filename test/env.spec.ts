import * as envUtils from '../src/env'

describe('Env utils', () => {

  it('isMobile', () => {
    let _userAgent = navigator.userAgent
    let mockUA = ua => navigator['__defineGetter__']('userAgent', () => ua)

    expect(envUtils.isMobile.any()).to.be.false

    mockUA('IEMobile')
    expect(envUtils.isMobile.any()).to.be.true
    expect(envUtils.isMobile.Windows()).to.be.true

    mockUA('Android')
    expect(envUtils.isMobile.any()).to.be.true
    expect(envUtils.isMobile.Android()).to.be.true

    mockUA('iPad')
    expect(envUtils.isMobile.any()).to.be.true
    expect(envUtils.isMobile.iOS()).to.be.true

    mockUA('BlackBerry')
    expect(envUtils.isMobile.any()).to.be.true
    expect(envUtils.isMobile.BlackBerry()).to.be.true

  })

})