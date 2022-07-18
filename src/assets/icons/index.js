import SvgIcon from '@/components/plugins/svgIcon.vue' // svg组件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
export default (app) => {
  app.component('svg-icon', SvgIcon)
}
