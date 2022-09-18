import ArrowSettings from './ArrowSettings.js'

import {
    MODULE_NAME,
    SOCKET_NAME,
    SOCKET_DEBOUNCE_DELAY_MS,
    SOCKET_EVENT_ADD,
    SOCKET_EVENT_UPDATE,
    SOCKET_EVENT_REMOVE,
    LAYER_NAME,
    TOOL_NAME
} from './Constants.js'

export default class ArrowManager {
    _isDrawing = false

    /** Delayed broadcasting for frequent updates */
    _debouncedBroadcastArrowUpdated = null

    /** Layer to return after hotkey is released */
    _previousLayer = null

    /** Tool to activate after hotkey is released */
    _previousTool = null

    constructor() {
        this._debouncedBroadcastArrowUpdated = debounce(
            this._broadcastArrowMove.bind(this),
            SOCKET_DEBOUNCE_DELAY_MS
        )
        game.socket.on(SOCKET_NAME, this._socketHandler.bind(this))
    }

    broadcastArrowAdded(arrowData) {
        game.socket.emit(SOCKET_NAME, {
            event: SOCKET_EVENT_ADD,
            data: arrowData,
        })
    }

    broadcastArrowUpdated(arrow) {
        this._debouncedBroadcastArrowUpdated(arrow)
    }

    broadcastArrowRemoved(arrowData) {
        game.socket.emit(SOCKET_NAME, {
            event: SOCKET_EVENT_REMOVE,
            data: arrowData,
        })
    }

    registerKeyBindings() {
        self = this
        game.keybindings.register(MODULE_NAME, 'showNotification', {
            name: 'Tool toggle',
            hint: 'Switches to and keeps the arrow drawing tool active while the key is held down.',
            editable: [
                {
                    key: 'ShiftLeft',
                },
            ],
            onDown: async () => {
                if (self._isDrawing) return
                if (canvas.mouseInteractionManager.state > 1) {
                    // Mouse is too busy. Skip to avoid messing with other tools. 
                    return
                }
                self._isDrawing = true
                self._previousLayer = canvas.activeLayer.options.name
                self._previousTool = game.activeTool
                await self._activateLayer(LAYER_NAME, TOOL_NAME)
            },
            onUp: async () => {
                const arrow = game.canvas[LAYER_NAME]?.arrowCollection?.getArrowByUserId(game.user.id)
                if (arrow) {
                    self.broadcastArrowRemoved(arrow.data)
                    game.canvas[LAYER_NAME]?.arrowCollection?.removeArrowByUserId(game.user.id)
                }
                // TODO: double-check random async/awaits
                await self._activateLayer(
                    self._previousLayer,
                    self._previousTool
                )
                self._previousLayer = null
                self._previousTool = null
                self._isDrawing = false
            },
            restricted: ArrowSettings.isGmOnly,
            precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
        })
    }

    async _activateLayer(layer, tool) {
        // TODO: double-check random async/awaits
        if (!canvas || !canvas[layer]) return

        if (canvas[layer].active) {
            ui.controls.initialize({ tool })
        } else {
            canvas[layer].activate({ tool })
        }
        ui.controls.render(true)
    }

    _socketHandler(message) {
        const arrowCollection = game.canvas[LAYER_NAME]?.arrowCollection
        if (!arrowCollection) console.error('No arrow collection available')

        switch (message.event) {
            case SOCKET_EVENT_ADD:
                arrowCollection.addArrow(message.data)
                break
            case SOCKET_EVENT_UPDATE:
                arrowCollection.updateArrow(message.data)
                break
            case SOCKET_EVENT_REMOVE:
                arrowCollection.removeArrowByUserId(message.data.userId)
                break
            default:
                console.error('Unexpected socket message: ', message)
        }
    }

    _broadcastArrowMove(arrowData) {
        game.socket.emit(SOCKET_NAME, {
            event: SOCKET_EVENT_UPDATE,
            data: arrowData,
        })
    }
}
