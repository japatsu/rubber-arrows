import PixiArrow from './PixiArrow.js'

class PixiArrowCollection extends PIXI.Container {
    _canvasId = null

    constructor(canvasId) {
        super()
        this._canvasId = canvasId
    }

    getArrowByUserId(userId) {
        return this.children.find((a) => a.userId === userId)
    }

    addArrow(arrowConfig) {
        if (arrowConfig.canvasId !== this._canvasId) return
        this.removeArrowByUserId(arrowConfig.userId)
        this.addChild(new PixiArrow(arrowConfig))
    }

    removeArrowByUserId(userId) {
        const a = this.children.find((a) => a.userId === userId)
        a?.destroy()
    }

    updateArrow(arrowData) {
        const a = this.getArrowByUserId(arrowData.userId)
        a?.update(arrowData)
    }

    destroy(options) {
        super.destroy(options)
    }
}

export default PixiArrowCollection
