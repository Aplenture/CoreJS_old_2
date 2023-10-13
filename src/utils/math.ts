export function clamp(value: number, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    return Math.min(Math.max(value, min), max);
}