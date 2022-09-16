import ArrowManager from './ArrowManager.js'
import ArrowsLayer from './ArrowsLayer.js'
import ArrowSettings from './ArrowSettings.js'
import { LAYER_NAME } from './Constants.js'

Hooks.on('init', function () {
    game.rubberarrowmanager = new ArrowManager()
    ArrowSettings.registerSettings()
    game.rubberarrowmanager.registerKeyBindings()
})

Hooks.on('getSceneControlButtons', (controls) => {
    if (ArrowSettings.isGmOnly && !game.user.isGM) return
    controls.push({
        name: LAYER_NAME,
        title: 'Pointer Controls',
        icon: 'fas fa-mouse-pointer',
        layer: LAYER_NAME,
        activeTool: 'arrow',
        tools: [
            {
                name: 'arrow',
                title: 'Rubber arrow',
                icon: 'fas fa-mouse-pointer',
            },
        ],
    })
})

Hooks.on('canvasInit', () => {
    console.log('canvasInit')
    CONFIG.Canvas.layers[LAYER_NAME] = {
        layerClass: ArrowsLayer,
        group: 'primary',
    }
    Object.defineProperty(canvas, LAYER_NAME, {
        value: new ArrowsLayer(game.rubberarrowmanager),
        configurable: true,
        writable: true,
        enumerable: false,
    })
    canvas.interface.addChild(canvas[LAYER_NAME])
})
