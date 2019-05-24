(function () {
  const CLASS_NAME_TARGET = 'jp-munieru-hatenablog-embed-widget'
  const WIDGET_ELEMENT_ATTRIBUTES = {
    scrolling: 'no',
    frameBorder: 0,
    marginWidth: 0,
    marginHeight: 0
  }
  const WIDGET_ELEMENT_STYLES = {
    display: 'block',
    width: '100%',
    height: '155px',
    maxWidth: '500px',
    margin: '10px 0px'
  }

  Array.from(document.getElementsByClassName(CLASS_NAME_TARGET))
    .forEach(targetElement => {
      const widgetElement = toWidgetElement(targetElement)
      targetElement.parentNode.insertBefore(widgetElement, targetElement)
      targetElement.remove()
    })

  function toWidgetElement (targetElement) {
    const widgetElement = document.createElement('iframe')
    Object.keys(WIDGET_ELEMENT_ATTRIBUTES).forEach(key => {
      widgetElement[key] = WIDGET_ELEMENT_ATTRIBUTES[key]
    })
    Object.keys(WIDGET_ELEMENT_STYLES).forEach(key => {
      widgetElement.style[key] = WIDGET_ELEMENT_STYLES[key]
    })
    widgetElement.srcdoc = createWidgetElementHTML(targetElement)
    return widgetElement
  }

  function createWidgetElementHTML (targetElement) {
    const { url, title, body, image } = targetElement.dataset
    const headElement = createHeadElementHTML(url)
    const bodyElement = createBodyElementHTML(url, title, body, image)
    return `
    <html>
    ${headElement}
    ${bodyElement}
    </html>`
  }

  function createHeadElementHTML (url) {
    return `
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="initial-scale=1.0">
      <meta name="robots" content="noindex,follow">
      <link rel="canonical" href="${url}">
      <link rel="stylesheet" type="text/css" href="https://cdn.blog.st-hatena.com/css/embed.css?version=516683be4e773d4dcbb4b024a1f93070e1a4afde&amp;env=production">
    </head>`
  }

  function createBodyElementHTML (url, title, body, image) {
    const embedContentElement = createEmbedContentElementHTML(url, title, body, image)
    const embedFooterElement = createEmbedFooterElementHTML(url)
    return `
    <body class="body-iframe page-embed hatena-web-card">
      <div class="embed-wrapper">
        <div class="embed-wrapper-inner">
          ${embedContentElement}
          ${embedFooterElement}
        </div>
      </div>
    </body>`
  }

  function createEmbedContentElementHTML (url, title, body, image) {
    const entryBodyElement = createEntryBodyElementHTML(url, title, body)
    if (image) {
      return `
      <div class="embed-content with-thumb">
        <div class="thumb-wrapper">
          <a href="${url}" target="_blank">
            <img src="${image}" class="thumb">
          </a>
        </div>
        ${entryBodyElement}
      </div>`
    } else {
      return `
      <div class="embed-content ">
        ${entryBodyElement}
      </div>`
    }
  }

  function createEntryBodyElementHTML (url, title, body) {
    return `
    <div class="entry-body">
      <h2 class="entry-title">
        <a href="${url}" target="_blank">${title}</a>
      </h2>
      <div class="entry-content">${body}</div>
    </div>`
  }

  function createEmbedFooterElementHTML (url) {
    const encodedURL = encodeURIComponent(url)
    const host = new URL(url).host
    return `
    <div class="embed-footer">
      <a href="${url}" target="_blank"><img src="https://cdn-ak.favicon.st-hatena.com?url=${encodedURL}" alt="${host}" title="${host}" class="favicon"> ${host}</a>
      <img src="https://s.st-hatena.com/entry.count.image?uri=${encodedURL}" alt="" class="star-count">
      <a href="http://b.hatena.ne.jp/entry/${url}" target="_blank"><img src="https://b.hatena.ne.jp/entry/image/${url}" class="bookmark-count"></a>
    </div>`
  }
})()
