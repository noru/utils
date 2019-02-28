interface Document {
  mozCancelFullScreen: () => void
  webkitExitFullscreen: () => void
  fullscreenElement: () => void
  mozFullScreenElement: () => void
  webkitFullscreenElement: () => void
}