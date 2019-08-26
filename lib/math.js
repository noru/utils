function rotate2D(v, angle) {
    let { x, y } = v;
    return {
        x: x * Math.cos(angle) - y * Math.sin(angle),
        y: x * Math.sin(angle) + y * Math.cos(angle),
    };
}

export { rotate2D };
