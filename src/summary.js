(function (root, factory) {

  // CommonJS supports
   if (typeof exports === 'object') {
    module.exports = factory(root)
  // Put the function into global scope (window)
  } else {
    root.summary = factory(root)
  }
})(this, function (root) {
  'use strict'

  const summary = (contentContainer, navigationContainer, titles) => {

      const container = contentContainer instanceof Node ? contentContainer : document.querySelector(contentContainer)
      const titlesEl = titles || container.querySelectorAll('h2, h3, h4, h5')

      const ulPrincipal = document.createElement('ul')
      navigationContainer.appendChild(ulPrincipal)

      const uls = [ulPrincipal]

      let lastLevel = 0

      for (let i = 0; i < titlesEl.length; i++) {
          const title = titlesEl[i]
          const level = parseInt(title.tagName.replace('H', '')) - 1

          if (!title.getAttribute('id')) {
              title.setAttribute('id', title.textContent)
          }

          if (level - lastLevel > 1) {
              throw new Error(`Error in title structure. You shouldn\'t pass from h${lastLevel+1} to h${level+1}`)
          }

          lastLevel = level

          const li = document.createElement('li')
          const a = document.createElement('a')

          a.setAttribute('href', '#' + title.getAttribute('id'))
          a.textContent = title.textContent
          li.appendChild(a)

          // Do we have a <ul> parent ?
          if (!uls[level - 1]) {
              const ul = document.createElement('ul')
              uls[level - 1] = ul
              uls[level - 2].lastChild.appendChild(ul)
          }

          // This level doesn't have <ul> child.
          uls[level] = null

          // Put the <li> into to <ul> parent.
          uls[level - 1].appendChild(li)

      }

  }

  return summary
})
