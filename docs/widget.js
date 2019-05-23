(function () {
  const CLASS_NAME_TARGET = 'jp-munieru-hatenablog-embed-widget'
  const CLASS_NAME_WIDGET = 'jp-munieru-hatenablog-embed-widget-iframe'

  Array.from(document.getElementsByClassName(CLASS_NAME_TARGET))
    .forEach(targetElement => {
      const widgetElement = insertWidgetElement(targetElement)
      widgetElement.addEventListener('load', () => {
        updatetWidgetElement(widgetElement)
      })
      hideElement(targetElement)
    })

  function insertWidgetElement (targetElement) {
    const widgetElement = createWidgetElement(targetElement)
    targetElement.parentNode.insertBefore(widgetElement, targetElement)
    const doc = widgetElement.contentWindow.document
    doc.open()
    const content = createWidgetElementContent(targetElement)
    doc.write(content)
    doc.close()
    return widgetElement
  }

  function createWidgetElement (targetElement) {
    const widgetElement = document.createElement('iframe')
    const attributes = {
      className: CLASS_NAME_WIDGET,
      scrolling: 'no',
      frameBorder: 0,
      marginWidth: 0,
      marginHeight: 0
    }
    Object.keys(attributes).forEach(key => {
      widgetElement[key] = attributes[key]
    })
    widgetElement.style.display = 'block'
    widgetElement.style.width = '100%'
    widgetElement.style.height = '155px'
    widgetElement.style.maxWidth = '500px'
    widgetElement.style.margin = '10px 0px'
    return widgetElement
  }

  function createWidgetElementContent (targetElement) {
    const { title, url, image, body } = targetElement.dataset
    const encodedURL = encodeURIComponent(url)
    const host = new URL(url).host
    if (image) {
      return `
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1.0">
        <meta name="robots" content="noindex,follow">
        <link rel="canonical" href="${url}">
        <link rel="stylesheet" type="text/css" href="https://cdn.blog.st-hatena.com/css/embed.css?version=516683be4e773d4dcbb4b024a1f93070e1a4afde&amp;env=production">
      </head>
      <body class="body-iframe page-embed hatena-web-card">
        <div class="embed-wrapper">
          <div class="embed-wrapper-inner">
            <div class="embed-content with-thumb">
              <div class="thumb-wrapper">
                <a href="${url}" target="_blank">
                  <img src="${image}" class="thumb">
                </a>
              </div>
              <div class="entry-body">
                <h2 class="entry-title">
                  <a href="${url}" target="_blank">${title}</a>
                </h2>
                <div class="entry-content">
                  ${body}
                </div>
              </div>
            </div>
            <div class="embed-footer">
              <a href="${url}" target="_blank"><img src="https://cdn-ak.favicon.st-hatena.com?url=${encodedURL}" alt="${host}"
                  title="${host}" class="favicon"> ${host}</a>
              <img src="https://s.st-hatena.com/entry.count.image?uri=${encodedURL}" alt="" class="star-count">
              <a href="http://b.hatena.ne.jp/entry/${url}" target="_blank"><img src="https://b.hatena.ne.jp/entry/image/${url}" class="bookmark-count"></a>
            </div>
          </div>
        </div>
      </body>
      </html>`
    } else {
      return `
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="initial-scale=1.0">
        <meta name="robots" content="noindex,follow">
        <link rel="canonical" href="${url}">
        <link rel="stylesheet" type="text/css" href="https://cdn.blog.st-hatena.com/css/embed.css?version=516683be4e773d4dcbb4b024a1f93070e1a4afde&amp;env=production">
      </head>
      <body class="body-iframe page-embed hatena-web-card">
        <div class="embed-wrapper">
          <div class="embed-wrapper-inner">
            <div class="embed-content ">
              <div class="entry-body">
                <h2 class="entry-title">
                  <a href="${url}" target="_blank">${title}</a>
                </h2>
                <div class="entry-content">
                  ${body}
                </div>
              </div>
            </div>
            <div class="embed-footer">
              <a href="${url}" target="_blank"><img src="https://cdn-ak.favicon.st-hatena.com?url=${encodedURL}" alt="${host}"
                  title="${host}" class="favicon"> ${host}</a>
              <img src="https://s.st-hatena.com/entry.count.image?uri=${encodedURL}" alt="" class="star-count">
              <a href="http://b.hatena.ne.jp/entry/${url}" target="_blank"><img src="https://b.hatena.ne.jp/entry/image/${url}" class="bookmark-count"></a>
            </div>
          </div>
        </div>
      </body>
      </html>`
    }
  }

  function updatetWidgetElement (widgetElement) {
    const doc = widgetElement.contentWindow.document
    const height = doc.body.scrollHeight
    widgetElement.style.height = `${height}px`
    doc.querySelectorAll('a').forEach(a => {
      a.target = '_blank'
    })
  }

  function hideElement (element) {
    element.style.display = 'none'
  }
})()
