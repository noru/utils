import * as DOMUtils from '../src/dom'

describe('DOM utils', () => {

  it('actualBgColor', () => {

    $(`
      <div id="actual-bg-color" style="background: red;">
        <div id="target" />
      </div>
    `).appendTo('body')

    let target = $('#target')
    expect(DOMUtils.actualBgColor(target[0])).to.be.eq('rgb(255, 0, 0)')
    target.attr('style', 'background: green;')
    expect(DOMUtils.actualBgColor(target[0])).to.be.eq('rgb(0, 128, 0)')

    $('#actual-bg-color').remove()

    expect(DOMUtils.actualBgColor(null)).to.be.null

  })

})