<p align="center">
  <a href="https://baianat.github.io/verte/" target="_blank">
    <img width="400" alt="verte" src="https://baianat.github.io/verte/verte.png">
  </a>
</p>

# Verte (WIP) 🐛

Color-picker designed for Vue

## Getting Started

### Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install verte --save

# or use yarn
yarn add verte
```

### Basic usage

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

## License

MIT