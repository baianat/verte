# Value Binding

Verte supports two-way binding using `v-model` to bind the color value to your component data.

```vue
<template>
  <verte v-model="color" :picker="wheel" :model="rgb"></verte>
</template>

<script>
  import Vue from 'vue';
  import Verte from 'verte';

  new Vue ({
    el: '#app',
    components: { Verte },
    data: () => ({
      color: ''
    })
  });
</script>
```

:::tip
  The emitted color value will always be in the same configured color-model, the previous code will produce RGB color strings. i.e: `rgb(r,g,b)`.
:::
