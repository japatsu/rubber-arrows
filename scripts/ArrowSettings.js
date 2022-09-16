import { MODULE_NAME } from './Constants.js'

export default class ArrowSettings {
    static get color() {
        return game.settings.get(MODULE_NAME, 'arrow-color')
    }

    static get thickness() {
        return game.settings.get(MODULE_NAME, 'arrow-thickness')
    }

    static get opacity() {
        return game.settings.get(MODULE_NAME, 'arrow-opacity')
    }

    static get segmentsAllowed() {
        return game.settings.get(MODULE_NAME, 'arrow-segments-allowed')
    }

    static get isGmOnly() {
        return game.settings.get(MODULE_NAME, 'arrow-is-gm-only')
    }

    static get relativeThickness() {
        const relativeThickness = game.settings.get(
            MODULE_NAME,
            'arrow-relative-thickness'
        )
        if (relativeThickness === 0) return null
        return relativeThickness
    }

    static registerSettings(moduleName = MODULE_NAME) {
        game.settings.register(MODULE_NAME, 'arrow-is-gm-only', {
            name: 'GM only',
            hint: 'If set, only the GM user can draw arrows. Changing this requires a reload.',
            scope: 'world',
            config: true,
            requiresReload: true,
            type: Boolean,
            default: false,
            onChange: (value) => {
                console.log(value)
            },
        })

        game.settings.register(moduleName, 'arrow-segments-allowed', {
            name: 'Segmented arrows',
            hint: 'If set, right-click during drawing adds a new arrow segment allowing multi-part, angled arrows.',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true,
        })

        game.settings.register(moduleName, 'arrow-thickness', {
            name: 'Static thickness',
            hint: 'Constant width of the arrow (pixels). This applies to the widest part i.e. the base of the arrowhead.',
            scope: 'world',
            config: true,
            type: Number,
            range: {
                min: 10,
                max: 100,
                step: 1,
            },
            default: 25,
        })

        game.settings.register(moduleName, 'arrow-relative-thickness', {
            name: 'Relative thickness',
            hint: 'If the scene has a grid, calcluates the thickness relative to grid cell size. Set to 0 to always use static thickness.',
            scope: 'world',
            config: true,
            type: Number,
            range: {
                min: 0,
                max: 1.0,
                step: 0.05,
            },
            default: null,
        })

        game.settings.register(moduleName, 'arrow-opacity', {
            name: 'Opacity',
            hint: 'Defines how transparent or opaque arrows are. Value of 1 means fully opaque, 0.1 is nearly invisible.',
            scope: 'world',
            config: true,
            type: Number,
            range: {
                min: 0.1,
                max: 1.0,
                step: 0.05,
            },
            default: 0.75,
        })
    }
}
