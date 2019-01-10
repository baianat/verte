# Examples

## Default Example

<verte-demo menuPosition="bottom"></verte-demo>

```vue
<template>
  <verte></verte>
</template>

<script>
import verte from 'verte';

export default {
  components: { verte }
}
</script>
```

## Start Color

<verte-demo value="#f0f"></verte-demo>

```vue
<verte value="#f0f"></verte>
```

## Position menu

### Top

<verte-demo menuPosition="top"></verte-demo>

```vue
<verte menuPosition="top"></verte>
```

### Bottom

<verte-demo menuPosition="bottom"></verte-demo>

```vue
<verte menuPosition="bottom"></verte>
```

### Right

<verte-demo menuPosition="right"></verte-demo>

```vue
<verte menuPosition="right"></verte>
```

### Left


<verte-demo menuPosition="left"></verte-demo>

```vue
<verte menuPosition="left"></verte>
```

## Layout Customization

## Wheel Picker

<verte-demo picker="wheel"></verte-demo>

```
  <verte picker="wheel"></verte>
```

## Custom Guide Icon

<verte-demo value="#f0f">
  <svg viewBox="0 0 24 24">
    <path d="M0 20h24v4H0z"/>
    <path style="fill: #000" d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
  </svg>
</verte-demo>

```html
<verte>
  <svg viewBox="0 0 24 24">
    <path d="M0 20h24v4H0z"/>
    <path style="fill: #000" d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
  </svg>
</verte>
```

### Widget

Display the component vertically at all times and disable dragging.

<verte-demo value="#2426d3" display="widget"></verte-demo>

```vue
<verte display="widget"></verte>
```

### RGB Sliders

Display the component vertically using a trigger button and allow dragging.

<verte-demo value="#f0f" display="widget" :rgbSliders="true"></verte-demo>

```vue
<verte display="widget" :rgbSliders="true"></verte>
```

### No Recent colors

Display the component vertically using a trigger button and allow dragging.

<verte-demo value="#f0f" display="widget" :recentColors="null"></verte-demo>

```vue
<verte display="widget" :recentColors="null"></verte>
```

<style>
.verte {
  margin-top: 10px;
}
</style>