# API

## Props

|  Name  | Values | Default | Description |
|--------|--------|---------|-------------|
|`picker`| 'wheel' \| 'square' | 'wheel' | chose between pickers style |
|`color` | a valid color string |'#000' | the starter verte color |
|`model` | 'rgb' \| 'hex' \| 'hsl' | 'rgb' | the output color model |

## Slots

you can pass to `verte`  slot an element(icon) to replace the guide circle icon.

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

comming soon...
