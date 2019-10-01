---
sidebar: auto
---

# API

## Props

|  Name  | Values | Default | Description |
|--------|--------|---------|-------------|
|`picker`| 'wheel' \| 'square' | 'wheel' | chose between pickers style |
|`value` | a valid color string |'#000' | the initial color value |
|`model` | 'rgb' \| 'hex' \| 'hsl' | 'rgb' | the output color model |
|`menuPosition` | 'top' \| 'bottom' \| 'left' \| 'right' \| 'center' | 'bottom' | the picer menu position |
|`showHistory` | boolean | true | show a list of the recent colors at the bottom of the picker |
| `colorHistory` | `string[]` | `null` | a list of strings representing color values. If provided it will isolate the picker from other pickers and it will maintain its own list. |
|`display` | String | 'vertical' | controls the layout of the component. [List of allowed values](#display-modes). |
|`draggable` | Boolean | true | turn on/off dragging the picker menu |
|`enableAlpha` | Boolean | true | turn on/off the alpha slider |
|`rgbSliders` | Boolean | false | show/hide rgb sliders |

## Display Modes

Verte currently has two display layouts:

- `picker`: The component is hidden until the user presses on the input, then it is displayed vertically.
- `widget`: The component is always displayed vertically, the trigger input is hidden.

We are planning for `horizontal` and `horizontal-widge` in the future. [You can view the different layouts here](/examples.md#layout-customization)

## Slots

you can pass to `verte` slot an element(icon) to replace the guide circle icon.

::: tip
The guide icon color and fill style will change to the current selected color, if you want parts of your icon not to change, you have add fill/color style inline.
:::

```html {4,5,6,7}
<template>
  <verte :picker="wheel" :model="rgb">

    <svg viewBox="0 0 24 24">
      <path d="M0 20h24v4H0z"/>
      <path style="fill: #000" d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
    </svg>

  </verte>
</template>
```

## Events

|  Name | Payload Type | Description |
|:------|:------------:|:------------|
|`input`| `string`     | Emits a string representation of the model for the selected color value |
|`close`| `Boolean`    | Emitted when user close color picker dialog and returns model for the selected value |
