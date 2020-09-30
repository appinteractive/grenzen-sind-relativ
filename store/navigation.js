import mainNav from '~/config/navigation/main.json'
import footerNav from '~/config/navigation/footer.json'
import settings from '~/config/settings.json'
import helpers from '~/lib/helpers'

function normalizeUrls(items) {
  const output = [ ...items ]

  output.forEach(item => {
    if (item.page) {
      item.url = helpers.urlByPath(item.page)
    }
    if (item.children && item.children.length > 0) {
      item.children = normalizeUrls(item.children)
    }
  })

  return output
}

function getBreadCrumbs(branch, url, parents) {
  const b = Array.isArray(branch) ? branch : branch.children || []
  let result = null
  b.forEach((bx, i) => {
    try {
      if (bx.url === url && bx.url.split('/').slice(0, -1).join('/') === url.split('/').slice(0, -1).join('/')) {
        result = [...parents, {
          title: bx.title,
          url: bx.url,
          page: bx.page,
          showInMainNavigation: !!bx.showInMainNavigation,
          children: !bx.showInMainNavigation ? bx.children : null,
          siblings: branch.children
        }]
      } else if (!result) {
        result = getBreadCrumbs(bx, url, [...parents, {
          title: b[i].title,
          url: b[i].url,
          page: b[i].page,
          showInMainNavigation: !!b[i].showInMainNavigation,
          children: !b[i].showInMainNavigation ? b[i].children : null,
          siblings: branch.children || []
        }])
      }
    } catch (e) {}
  })

  return result
}

export const state = (ctx) => ({
  mainNav: normalizeUrls(mainNav.menu),
  footerNav: normalizeUrls(footerNav.menu),
  copyright: settings.copyright,
  route: null
})

export const actions = {
  init(ctx, route) {
    // console.log('nuxtServerInit', ctx, route)
  }
}

export const getters = {
  mainNav(state) {
    return state.mainNav
  },
  footerNav(state) {
    return state.footerNav
  },
  copyright(state) {
    return state.copyright
  },
  breadCrumbs: (state) => (route) => {
    return getBreadCrumbs(state.mainNav, route.path, []) || []
  }
}
