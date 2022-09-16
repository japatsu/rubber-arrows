import ArrowManager from './ArrowManager.js'
import ArrowSettings from './ArrowSettings.js'
import PixiArrowCollection from './PixiArrowCollection.js'

import { LAYER_NAME } from './Constants.js'

export default class ArrowsLayer extends InteractionLayer {
    _arrowManager = null

    _arrowCollection = null

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

    async _onDragLeftStart(event) {
        let arrowColor = Color.from(game.user.color)

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
            points: [event.data.destination],
        }
        this._arrowCollection.addArrow(arrowConfig)
        this._arrowManager.broadcastArrowAdded(arrowConfig)
    }

    _onDragLeftMove(event) {
        const arrow = this._arrowCollection.getArrowByUserId(game.user.id)
        if (!arrow) return
        arrow.stretchTo(event.data.destination)
        this._arrowManager._debouncedBroadcastArrowUpdated(arrow.data)
    }

    _onDragLeftCancel(event) {
        if (event.button === 2) {
            // Prevent right click to keep on dragging.
            event.preventDefault()
            if (!ArrowSettings.segmentsAllowed) return
            const arrow = this._arrowCollection.getArrowByUserId(game.user.id)
            if (!arrow) return
            const mousePos = canvas.canvasCoordinatesFromClient(event)
            arrow.addWaypointTo(mousePos)
            // No need to broadcast this, moving the mouse will take care of it.
        } else {
            this._arrowCollection.removeArrowByUserId(game.user.id)
            this._arrowManager.broadcastArrowRemoved({ userId: game.user.id })
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
