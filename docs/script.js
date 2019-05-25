(function () {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    data () {
      return {
        url: 'https://munieru.jp/',
        image: 'https://munieru.jp/icon.png',
        title: 'munieru.jp',
        body: "Munieru 's website"
      }
    },
    computed: {
      code () {
        return this.createScriptElementHTML('//munierujp.github.io/hatenablog-embed-widget/widget.js')
      },
      html () {
        const scriptElement = this.createScriptElementHTML('widget.js')
        return `<html><body>${scriptElement}</body></html>`
      }
    },
    methods: {
      createScriptElementHTML (src) {
        return `<script async src="${src}" class="jp-munieru-hatenablog-embed-widget" data-url="${this.url}" data-image="${this.image}" data-title="${this.title}" data-body="${this.body}"></script>`
      }
    }
  })
})()
