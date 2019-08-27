const TAU = Math.PI * 2;
const PHI = 1.618033988749895;
function rotate2D(v, angle) {
    let { x, y } = v;
    return {
        x: x * Math.cos(angle) - y * Math.sin(angle),
        y: x * Math.sin(angle) + y * Math.cos(angle),
    };
}

export { TAU, PHI, rotate2D };
