# Rubber Arrows - Foundry VTT Module

A stretching arrow that you can use for pointing out important things to your fellow players.

![rubber_arrows_straight](https://user-images.githubusercontent.com/61741172/192741146-9256eafa-8982-4bb4-aa1b-e0da7e433124.gif)

Also supports segmented arrows for marking routes and paths with changing direction.

![rubber_arrows_angled](https://user-images.githubusercontent.com/61741172/192741020-376c7b59-3d76-42bc-be48-f08c36641954.gif)

Background map seen in the previews is done by the awesome [Dyson Logos](https://dysonlogos.blog).

# Installation

**Notice:** Rubber Arrows is tested (only) with **Foundry VTT V10**.

In your Foundry VTT,

- Navigate to `Configuration and Setup -> Add-on Modules -> Install Module`
- For *Manifest URL*, enter: `https://github.com/japatsu/rubber-arrows/releases/latest/download/module.json`
- Click `Install`
- Enable the module in your game world (`Configuration -> Manage Modules`).

# Features

## Easy

Activate the tool, press and hold left mouse button and start dragging - and there's your pointer! Release the button and it's gone. That's it.

The tool activates from the controls menu or with a hot-key (see below).

## Waypoints

You can choose to go with simple, straight arrows, or get fancy with multi-segmented, angled arrows suitable for route marking.

While drawing an arrow, right-click starts a new segment. 

## Hot-key

Rubber Arrow tool can be activated via a hot-key which removes the need to search for correct tools from the controls menu.

The arrow tool stays active until the hot-key is released. Previous tool gets re-activated automatically. 

The default hot-key is `ShiftLeft`. You can change it to your liking from `Game settings -> Configure Controls -> Rubber Arrows`.

![configure_controls](https://user-images.githubusercontent.com/61741172/192744985-4fa4fcb6-f036-4d35-9c78-61038be3c0b3.png)

If you still rather use the tool from the controls menu, you can find it from there too.

## Customizable

As a GM user you can change the overall behavior of the tool and the appereance of the arrows.

Take a look at `Game settings -> Configure Settings -> Rubber Arrows`. 

Available options should be quite self-explanatory. Try tinkering with the settings and see what happens.

Note: the color of arrows comes directly from the Foundry's `Player Color` setting (available e.g. via `Players (list) -> <right click player> -> User Configuration`).

![configure_settings](https://user-images.githubusercontent.com/61741172/192745010-b018fa29-397b-46f6-ae78-a511e529a55d.png)

# Changelog

## v1.1.1

Fixed issue of tool getting inactive after a scene change.

## v1.1.0

Improved arrow drawing accuracy.

## v1.0.1

Initial version
