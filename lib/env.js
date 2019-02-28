const isMobile = {
    Windows() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    },
};

export { isMobile };
