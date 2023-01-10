# Color History

Verte offers a couple of ways to maintain the list of recent colors picked using the picker.

## Internal Store

By default all Verte pickers share the same color history, which can be configured when first configuring verte.

```vue
import Vue from 'vue';
import Verte from 'verte';

Vue.use(Verte, {
  recentColors: JSON.parse(localStorage.getItem('colors'))
});
```

You can subscribe to the changes of the recent colors by passing an `onRecentColorsChange` handler to the config object:

```vue
// fetch and save the recent colors to the localstorage.
Vue.use(Verte, {
  recentColors: JSON.parse(localStorage.getItem('colors')),
  onRecentColorsChange (colors) {
    localStorage.setItem('colors', JSON.stringify(colors));
  }
});
```

## Using Props

Verte accepts a `colorHistory` prop which is an array of color strings, this will disable sharing between verte components and each one will have its own history.

```vue
<Verte :showHistory="true" :colorHistory="list"></Verte>
```

You could allow sharing between some verte components using `.sync` modifier:

```vue
<Verte :showHistory="true" :colorHistory.sync="list"></Verte>

<Verte :showHistory="true" :colorHistory.sync="list"></Verte>
```

::: tip
When providing the `colorHistory` prop, the Verte store does not handle any changes to the history, also the `onRecentColorsChange` handler will no longer fire. So you might need to handle persisting the color histroy using `watch` and conventional Vue patterns.
:::
