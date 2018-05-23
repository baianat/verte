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

<verte-demo color="#f0f"></verte-demo>

```vue {3}
<template>
  <verte
    color="#f0f"
  >
  </verte>
</template>
```

## Square Picker

<verte-demo picker="square"></verte-demo>

```vue {3}
<template>
  <verte
    picker="square"
  >
  </verte>
</template>
```

## Custom Guide Icon

<verte-demo color="#f0f">
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

<style>
.verte__menu {
  z-index: 100;
}
.verte {
  margin-top: 10px;
}
</style>