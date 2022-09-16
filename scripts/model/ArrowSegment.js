import Point from './Point.js'

export default class ArrowSegment {
    _startPoint = null
    _endPoint = null

    get startPoint() {
        return this._startPoint
    }

    get endPoint() {
        return this._endPoint
    }

    set startPoint(point) {
        this._startPoint = point
    }

    set endPoint(point) {
        this._endPoint = point
    }

    constructor(sx, sy, ex, ey) {
        this._startPoint = new Point(sx, sy)
        this._endPoint = new Point(ex, ey)

        this._length = null
    }

    get length() {
        if (!this._length) {
            this._length = ArrowSegment.calulateLength(
                this._startPoint,
                this._endPoint
            )
        }
        return this._length
    }

    get angle() {
        return ArrowSegment.calculateAngleDeg(
            this.startPoint.x,
            this.startPoint.y,
            this.endPoint.x,
            this.endPoint.y
        )
    }

    static calculateAngleDeg(cx, cy, ex, ey) {
        const dy = ey - cy
        const dx = ex - cx
        let theta = Math.atan2(dy, dx) // range (-PI, PI]
        theta *= 180 / Math.PI // rads to degs, range (-180, 180]
        return theta
    }

    static calulateLength(p0, p1) {
        return Point.distance(p0.x, p0.y, p1.x, p1.y)
    }
}
