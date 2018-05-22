# Examples

## Default Example

<VerteDemo></VerteDemo>

```html
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

<VerteDemo color="#f0f""></VerteDemo>

```html {3}
<template>
  <verte
    color="#f0f"
  >
  </verte>
</template>
```

## Square Picker

<VerteDemo picker="square"></VerteDemo>

```html {3}
<template>
  <verte
    picker="square"
  >
  </verte>
</template>
```

## Custom Guide Icon

<VerteDemo color="#f0f">
  <svg viewBox="0 0 24 24">
    <path d="M0 20h24v4H0z"/>
    <path style="fill: #000" d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
  </svg>
</VerteDemo>

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

<script>
import verte from '../src/components/verte';

export default {
  components: { 'VerteDemo': verte }
}
</script>

<style>
.verte__menu {
  z-index: 100;
}
.verte {
  margin-top: 10px;
}
</style>