# Examples

## Default Example

<verte-demo></verte-demo>

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

```vue {3}
<template>
  <verte
    value="#f0f"
  >
  </verte>
</template>
```

## Wheel Picker

<verte-demo picker="wheel"></verte-demo>

```vue {3}
<template>
  <verte
    picker="wheel"
  >
  </verte>
</template>
```

## Custom Guide Icon

<verte-demo value="#f0f">
  <svg viewBox="0 0 24 24">
    <path d="M0 20h24v4H0z"/>
    <path style="fill: #000" d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
  </svg>
</verte-demo>

```html
<template>
  <verte>
    <svg viewBox="0 0 24 24">
      <path d="M0 20h24v4H0z"/>
      <path style="fill: #000" d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
    </svg>
  </verte>
</template>
```

## Layout Customization

### Vertical

Display the component vertically using a trigger button and allow dragging.

<verte-demo value="#f0f" display="vertical" :draggable="true"></verte-demo>

### Vertical Widget

Display the component vertically at all times and disable dragging.

<verte-demo value="#f0f" display="vertical-widget" :draggable="false"></verte-demo>

```html
<template>
  <verte
    :menuOnly="true"
  >
  </verte>
</template>
```


<style>
.verte__menu {
  z-index: 15;
}
.verte {
  margin-top: 10px;
}
</style>