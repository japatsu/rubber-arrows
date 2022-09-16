export default class Point {
    _x = null
    _y = null

    constructor(x, y) {
        this._x = x
        this._y = y
    }

    get x() {
        return this._x
    }

    set x(value) {
        this._x = value
    }

    get y() {
        return this._y
    }

    set y(value) {
        this._y = value
    }

    static distance(cx, cy, ex, ey) {
        return Math.sqrt(Math.pow(ex - cx, 2) + Math.pow(ey - cy, 2))
    }
}
