# Getting Started

## Installation

First step is to install it using `yarn` or `npm`:

```bash
yarn add verte

# or use npm
npm install verte --save
```

## Basic usage

```html {2,8,13}
<template>
  <verte :picker="wheel" :model="rgb"></verte>
</template>

<script>
  import Verte from './dist/verte.js';
  // register component globally
  Vue.component(Verte.name, Verte);

  new Vue ({
    el: '#app',
    // OR register locally
    components: { Verte }
  });
</script>

```