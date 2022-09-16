import ArrowSegment from './ArrowSegment.js'
import Point from './Point.js'

export default class Arrow {
    _arrowSegments = []

    constructor(arrowConfig) {
        this._arrowSegments = Arrow.segmentsFromPoints(arrowConfig.points)
    }

    get segments() {
        return this._arrowSegments
    }

    get lastSegment() {
        return this.segments[this.segments.length - 1]
    }

    stretchTo(x, y) {
        this.lastSegment.endPoint = new Point(x, y)
    }

    addWaypointTo(x, y) {
        this.lastSegment.endPoint = new Point(x, y)
        const newSegment = new ArrowSegment(x, y, x, y)
        this._arrowSegments.push(newSegment)
    }

    getPoints() {
        const points = []
        for (let s of this._arrowSegments) {
            points.push({ x: s.startPoint.x, y: s.startPoint.y })
        }
        points.push({
            x: this.lastSegment.endPoint.x,
            y: this.lastSegment.endPoint.y,
        })
        return points
    }

    static segmentsFromPoints(points) {
        const segments = []
        let previousPoint = null
        for (let point of points) {
            if (previousPoint == null) {
                segments.push(
                    new ArrowSegment(point.x, point.y, point.x, point.y)
                )
            } else {
                segments.push(
                    new ArrowSegment(
                        previousPoint.x,
                        previousPoint.y,
                        point.x,
                        point.y
                    )
                )
            }
            previousPoint = point
        }
        return segments
    }
}
