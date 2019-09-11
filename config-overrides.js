const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  // antd 按需打包配置
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // antd 主题配置
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  })
)