const sidebars = {
  guide: [
    '',
    'getting-started',
    'color-history',
    'binding'
  ],
  api: 'api',
  examples: 'examples'
};

function genSidebarConfig(title) {
  return [
    {
      title,
      collapsable: false,
      children: sidebars[title.toLowerCase()]
    }
  ]
}

module.exports = {
  title: 'Verte',
  description: 'A Complete Vue.js Color Picker Component',
  base: '/verte/',
  serviceWorker: true,
  head: [
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: "theme-color", content: "#41b883" }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { property: 'og:image', content: '/verte/verte.png' }],
  ],
  themeConfig: {
    repo: 'baianat/verte',
    docsRepo: 'baianat/verte',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Help us improve this page!',
        nav: [
          { text: 'Guide', link: '/guide/' },
          { text: 'API', link: '/api' },
          { text: 'Examples', link: '/examples' },
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide'),
          '/examples/': genSidebarConfig('Examples'),
          '/api/': genSidebarConfig('API'),
        }
      }
    }
  }
}