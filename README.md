<p align="center">
  <a href="https://baianat.github.io/verte/" target="_blank">
    <img width="400" alt="verte" src="https://baianat.github.io/verte/verte.png">
  </a>
</p>

[![Build Status](https://img.shields.io/travis/baianat/verte.svg?style=flat-square)](https://travis-ci.org/baianat/verte)
[![Codecov](https://img.shields.io/codecov/c/github/baianat/verte.svg?style=flat-square)](https://codecov.io/github/baianat/verte)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/32d598bdf1094532baf51ac7d89aebfd)](https://www.codacy.com/app/logaretm/verte?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=baianat/verte&amp;utm_campaign=Badge_Grade)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/baianat/verte.svg)](http://isitmaintained.com/project/baianat/verte "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/baianat/verte.svg)](http://isitmaintained.com/project/baianat/verte "Percentage of issues still open")
[![npm](https://img.shields.io/npm/dm/verte.svg)](https://npm-stat.com/charts.html?package=verte)
[![npm](https://img.shields.io/npm/v/verte.svg)](https://www.npmjs.com/package/verte)

# Verte

A Complete Vue.js Color Picker Component

## Features

- Multiple Color Models support: RGB, HSL, and HEX.
- SSR Friendly.
- Small file size, only 7kb gzipped.
- Two way binding support.

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
  <verte picker="square" model="rgb"></verte>
</template>

<script>
  import Verte from 'verte';
  import 'verte/dist/verte.css';
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