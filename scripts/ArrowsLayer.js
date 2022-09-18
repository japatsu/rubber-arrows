import ArrowManager from './ArrowManager.js'
import ArrowSettings from './ArrowSettings.js'
import PixiArrowCollection from './PixiArrowCollection.js'

import { LAYER_NAME } from './Constants.js'

export default class ArrowsLayer extends InteractionLayer {
    _arrowManager = null

    _arrowCollection = null
    _isDrawing = false

    // Instance-bound event handlers
    _mouseMoveHandler = null
    _mouseDownHandler = null
    _mouseUpHandler = null

    constructor(arrowManager) {
        super()

        if (!(arrowManager instanceof ArrowManager)) {
            console.error('no ArrowManager available')
        }
        this._arrowManager = arrowManager

        this._arrowCollection = new PixiArrowCollection(canvas.id)
        this.addChild(this._arrowCollection)

        this.options = this.constructor.layerOptions
    }

    get arrowCollection() {
        return this._arrowCollection
    }

    activate() {
        super.activate()
        this._mouseDownHandler = this._onMouseDown.bind(this)
        canvas.stage.on('mousedown', this._mouseDownHandler)
        this._mouseMoveHandler = this._onMouseMove.bind(this)
        this._mouseUpHandler = this._onMouseUp.bind(this)
    }

    deactivate() {
        super.deactivate()
        canvas.stage.off('mousemove', this._mouseMoveHandler)
        canvas.stage.off('mousedown', this._mouseDownHandler)
        canvas.stage.off('mouseup', this._mouseUpHandler)
    }

    _onMouseDown(event) {
        canvas.stage.on('mouseup', this._mouseUpHandler)
        this._isDrawing = true

        const arrowPosition = canvas.canvasCoordinatesFromClient(event.data.global)
        const arrowColor = Color.from(game.user.color)

        let arrowThickness = ArrowSettings.thickness
        const relativeThickness = ArrowSettings.relativeThickness
        if (relativeThickness && game.scenes.active?.grid.type > 0) {
            // Only use relative value if the grid is in use.
            // Adjust the widest part (arrowhead base) to the cell size.
            arrowThickness =
                relativeThickness * (game.scenes.active.grid.size / 2.5)
        }

        const arrowConfig = {
            userId: game.user.id,
            canvasId: canvas.id,
            color: arrowColor,
            thickness: arrowThickness,
            opacity: ArrowSettings.opacity,
            points: [arrowPosition],
        }
        this._arrowCollection.addArrow(arrowConfig)

        canvas.stage.on('mousemove', this._mouseMoveHandler)
        this._arrowManager.broadcastArrowAdded(arrowConfig)
    }

    _onMouseUp(event) {
        // Overriding InteractionLayer._onClick would cause "sticky" arrows.
        canvas.stage.off('mouseup', this._mouseUpHandler)
        this._arrowCollection.removeArrowByUserId(game.user.id)
        canvas.stage.off('mousemove', this._mouseMoveHandler)
        this._isDrawing = false
        this._arrowManager.broadcastArrowRemoved({ userId: game.user.id })
        event.stopPropagation()
    }

    _onMouseMove(event) {
        if (!this._isDrawing) return
        const arrow = this._arrowCollection.getArrowByUserId(game.user.id)
        const arrowPosition = canvas.canvasCoordinatesFromClient(event.data.global)
        if (!arrow) return
        arrow.stretchTo(arrowPosition)
        this._arrowManager._debouncedBroadcastArrowUpdated(arrow.data)
    }

    _onDragLeftCancel(event) {
        // This works fine for detecting right clicks during drag.
        // Pixi event system seems to ignore them for some reason.
        if (event.button === 2) {
            // Prevent right click from canceling dragging.
            event.preventDefault()
            if (!ArrowSettings.segmentsAllowed) return
            const arrow = this._arrowCollection.getArrowByUserId(game.user.id)
            if (!arrow) return
            const mousePos = canvas.canvasCoordinatesFromClient(event)
            arrow.addWaypointTo(mousePos)
            // No need to broadcast this, next _onMouseMove will take care of it.
        } 
    }

    static get layerOptions() {
        return mergeObject(super.layerOptions, {
            name: LAYER_NAME,
            sortActiveTop: false,
            zIndex: 1001,
        })
    }
}
