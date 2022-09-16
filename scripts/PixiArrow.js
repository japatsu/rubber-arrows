import Arrow from './model/Arrow.js'

export default class PixiArrow extends PIXI.Container {

    _userId = null
    _arrow = null
    _thickness = null
    _color = null
    _opacity = null
    _isDrawing = false
    _pixiGfxArrowBody = null
    _pixiGfxArrowHead = null

    constructor(arrowConfig) {
        super()
        this._userId = arrowConfig.userId
        this._arrow = new Arrow(arrowConfig)
        this._color = arrowConfig.color ? arrowConfig.color : 0xff0000
        this._opacity = arrowConfig.opacity ? arrowConfig.opacity : 0.75
        this._thickness = arrowConfig.thickness ? arrowConfig.thickness : 25
        
        this._pixiGfxArrowBody = new PIXI.Graphics()
        this._pixiGfxArrowHead = new PIXI.Graphics()
        this._pixiGfxArrowBody.addChild(this._pixiGfxArrowHead)

        this.addChild(this._pixiGfxArrowBody)
        this.draw()
    }

    get data() {
        return {
            userId: this._userId,
            color: this._color,
            thickness: this._thickness,
            opacity: this._opacity,            
            points: this._arrow.getPoints()
        }
    }

    get userId() {
        return this._userId
    }

    get color() {
        return this._color
    }

    stretchTo(mousePos) {
        this._arrow.stretchTo(mousePos.x, mousePos.y)
        this.draw()
    }

    addWaypointTo(mousePos) {
        this._arrow.addWaypointTo(mousePos.x, mousePos.y)
        this.draw()
    }

    async draw() {
        if (this._isDrawing) {
            return
        }
        this._isDrawing = true

        this._pixiGfxArrowBody.clear()
        this._pixiGfxArrowBody.lineStyle(this._thickness, this.color, this._opacity)

        const points = this._arrow.getPoints()
        const startPoint = points.shift()

        this._pixiGfxArrowBody.moveTo(startPoint.x, startPoint.y)

        for (let p of points) {
            this._pixiGfxArrowBody.lineTo(p.x, p.y)
        }

        const endPoint = points.pop()
        this._pixiGfxArrowBody.moveTo(endPoint.x, endPoint.y)
        this._pixiGfxArrowBody.endFill()

        this._pixiGfxArrowHead
            .clear()
            .moveTo(-0.5, -0.5) // slight overlap to avoid gaps
            .beginFill(this.color, this._opacity)
            .lineTo(-(1.25 * this._thickness), -0.5)
            .lineTo(-0.5, 3 * this._thickness)
            .lineTo((1.25 * this._thickness), -0.5)
            .lineTo(-0.5, -0.5)
            .endFill()

        let arrowHeadAngle = this._arrow.lastSegment.angle
        if (this._arrow.lastSegment.length === 0) {
            // New segments (length 0) don't have a reasonable angle
            // Use the angle from the previous segment (if available)
            if (this._arrow.segments.length > 1) {
                arrowHeadAngle = this._arrow.segments[this._arrow.segments.length-2].angle
            }
            else {
                arrowHeadAngle = -45
            }
        }
        this._pixiGfxArrowHead.angle = arrowHeadAngle - 90
        this._pixiGfxArrowHead.position.set(endPoint.x, endPoint.y)

        this._isDrawing = false
    }

    async update(arrowData) {
        this._arrow = new Arrow(arrowData)
        this.draw()
    }

    static lineLength(cx, cy, ex, ey) {
        return Math.sqrt(Math.pow(ex - cx, 2) + Math.pow(ey - cy, 2))
    }

    destroy(...args) {
        super.destroy(...args)
    }
}
