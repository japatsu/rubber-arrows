# Rubber Arrows - Foundry VTT Module

A stretching arrow that you can use to point out important things on the screen to your fellow players.

![rubber_arrows_straight](https://user-images.githubusercontent.com/61741172/192741146-9256eafa-8982-4bb4-aa1b-e0da7e433124.gif)

Also supports angled arrows for marking routes and paths.

![rubber_arrows_angled](https://user-images.githubusercontent.com/61741172/192741020-376c7b59-3d76-42bc-be48-f08c36641954.gif)

# Installation

**Notice:** Rubber Arrows is tested (only) with **Foundry VTT V10**.

In your Foundry VTT,

- Navigate to `Configuration and Setup -> Add-on Modules -> Install Module`
- For *Manifest URL*, enter: `https://github.com/japatsu/rubber-arrows/releases/latest/download/module.json`
- Click `Install`

# Features

## Easy

Activate the tool, left-click and start dragging, and there's your pointer. Release the button and it's gone. That's it.

The tool activates from the controls menu or with a hot-key (see below).

## Waypoints

You can choose to go with simple, straight arrows, or get fancy with multi-segmented, angled arrows suitable for route marking.

While drawing an arrow, right-click starts a new segment. 

## Hot-key toggle

Optionally Rubber Arrow tool activate via a hot-key. The tool stays active until the hot-key is released, and then the previous tool is re-activated automatically. 

Using the hot-key removes the need to search for the tool from the menus. And when you're done, this feature zeroes the clicks you need to get back where you were.

The default hot-key is `LeftShift`. You can change it to your liking from `Game settings -> Configure Controls -> Rubber Arrows`.

If you, for some reason, rather use the tool menu (on the left), you can find Rubber Arrows from there too.

## Customizable

As a GM user you can change the overall behavior of the tool and the appereance of the arrows.

Take a look at `Game settings -> Configure Settings -> Rubber Arrows`. 

Available options should be quite self-explaining. Try tinkering with them and see what happens.

# Changelog

## v1.1.1

Fixed issue of tool getting inactive after a scene change.

## v1.1.0

Improved arrow drawing accuracy.

## v1.0.1

Initial version
