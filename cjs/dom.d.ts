/**
 * Get the background color of an element, if the element's background color is
 * not set(transparent), try its parents recursively
 *
 * @export
 * @param {any} element: HTMLElement
 * @returns {string}
 */
export declare function actualBgColor(element: HTMLElement | null): string | null;
/**
 * Toggle fullscreen mode
 *
 * @export
 */
export declare function toggleFullscreen(): void;
/**
 * Check if the window is currently in fullscreen mode
 *
 * @export
 * @returns {boolean}
 */
export declare function isFullscreen(): boolean;
/**
 * Request entering fullscreen mode
 *
 * @export
 */
export declare function requestFullscreen(): void;
/**
 * Request exiting fullscreen mode
 *
 * Note: may not warking on Android
 *
 * @export
 */
export declare function exitFullscreen(): void;
