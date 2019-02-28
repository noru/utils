function actualBgColor(element) {
    const transparent = 'rgba(0, 0, 0, 0)';
    if (!element)
        return null;
    let bg = getComputedStyle(element).backgroundColor;
    if (bg === transparent) {
        return actualBgColor(element.parentElement);
    }
    else {
        return bg;
    }
}
function toggleFullscreen() {
    if (isFullscreen()) {
        exitFullscreen();
    }
    else {
        requestFullscreen();
    }
}
function isFullscreen() {
    return !!document.fullscreenElement || !!document.webkitFullscreenElement;
}
function requestFullscreen() {
    let document = window.document;
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
function exitFullscreen() {
    let document = window.document;
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
    else if (document.webkitCancelFullscreen) {
        document.webkitCancelFullscreen();
    }
}

export { actualBgColor, toggleFullscreen, isFullscreen, requestFullscreen, exitFullscreen };
