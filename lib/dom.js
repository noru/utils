/**
 * Get the background color of an element, if the element's background color is
 * not set(transparent), try its parents recursively
 *
 * @export
 * @param {any} element: HTMLElement
 * @returns {string}
 */
function actualBgColor(element) {
    var transparent = 'rgba(0, 0, 0, 0)';
    if (!element)
        return null;
    var bg = getComputedStyle(element).backgroundColor;
    if (bg === transparent) {
        return actualBgColor(element.parentElement);
    }
    else {
        return bg;
    }
}
/**
 * Toggle fullscreen mode
 *
 * @export
 */
/* istanbul ignore next */
function toggleFullscreen() {
    if (isFullscreen()) {
        exitFullscreen();
    }
    else {
        requestFullscreen();
    }
}
/**
 * Check if the window is currently in fullscreen mode
 *
 * @export
 * @returns {boolean}
 */
/* istanbul ignore next */
function isFullscreen() {
    return !!document.fullscreenElement || !!document.webkitFullscreenElement;
}
/**
 * Request entering fullscreen mode
 *
 * @export
 */
/* istanbul ignore next */
function requestFullscreen() {
    var document = window.document;
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }
    }
}
/**
 * Request exiting fullscreen mode
 *
 * @export
 */
/* istanbul ignore next */
function exitFullscreen() {
    var document = window.document;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

export { actualBgColor, toggleFullscreen, isFullscreen, requestFullscreen, exitFullscreen };
