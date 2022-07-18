export const filterMenus = (data) => {
  const result = []
  data.forEach((item) => {
    if (item.child.length > 0) {
      item.child.forEach((childitem) => {
        const rules = menuRoutes(childitem)
        result.push(rules)
      })
    }
  })
  return result
}
const menuRoutes = (data) => {
  const route = {
    path: data.frontpath,
    name: data.desc,
    meta: {
      title: data.name,
      icon: data.icon
    }
  }
  const path = data.icon
  route.component = () => import('@/views/' + path)
  return route
}
