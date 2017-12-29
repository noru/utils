/**
 * Get the background color of an element, if the element's background color is
 * not set(transparent), try its parents recursively
 *
 * @export
 * @param {any} element: HTMLElement
 * @returns {string}
 */
export function actualBgColor(element: HTMLElement | null): string | null {

  const transparent = 'rgba(0, 0, 0, 0)'
  if (!element) return null

  let bg = getComputedStyle(element).backgroundColor
  if (bg === transparent) {
    return actualBgColor(element.parentElement)
  } else {
    return bg!
  }

}

/**
 * Toggle fullscreen mode
 *
 * @export
 */
/* istanbul ignore next */
export function toggleFullscreen() {
  if (isFullscreen()) {
    exitFullscreen()
  } else {
    requestFullscreen()
  }
}

/**
 * Check if the window is currently in fullscreen mode
 *
 * @export
 * @returns {boolean}
 */
/* istanbul ignore next */
export function isFullscreen(): boolean {
  return !!document.fullscreenElement || !!document.webkitFullscreenElement
}

/**
 * Request entering fullscreen mode
 *
 * @export
 */
/* istanbul ignore next */
export function requestFullscreen() {

  let document = (window.document as any)
  if (!document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    }
  }

}

/**
 * Request exiting fullscreen mode
 *
 * @export
 */
/* istanbul ignore next */
export function exitFullscreen() {

  let document = (window.document as any)
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.webkitCancelFullscreen) {
    document.webkitCancelFullscreen()
  }

}