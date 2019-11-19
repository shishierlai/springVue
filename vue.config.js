

const path = require('path')
const glob = require('glob')
/** 获取多页的入口脚本和模板 */
const getPages = (() => {
  const [
    globPathHtml,
    globPathJs,
    pages,
    tempSet
  ] = [


    // 通用模块
    ['./src/pages/**/app.html', 'template'], // 入口模板正则
    ['./src/pages/**/app.js', 'entry'], // 入口脚本正则
    Object.create(null),
    new Set()
  ]
  
  const getMultiPageConf = (globPath, keyName) => {
    let [fileList, tempArr, modName] = [glob.sync(globPath), [], null]
    if (fileList.length !== 0) {
      for (let entry of fileList) {
        tempArr = path.dirname(entry, path.extname(entry)).split('/')
        modName = tempArr[tempArr.length - 1]
        console.log(tempArr,modName);
        if (tempSet.has(modName)) {
          Object.assign(pages[modName], { [keyName]: entry, 'filename': `${modName}.html` })
        } else {
          Reflect.set(pages, modName, { [keyName]: entry }) && tempSet.add(modName)
        }
      }
      return true
    } else {
      if (keyName === 'template') {
        throw new Error('无法获取多页入口模板')
      } else if (keyName === 'entry') {
        throw new Error('无法获取多页入口脚本')
      } else {
        throw new Error('无法获取多页信息')
      }
    }
  }
  try {
    while (getMultiPageConf(...globPathHtml) && getMultiPageConf(...globPathJs)) 
    return pages
  } catch (err) {
    console.log('获取多页数据错误：', err)
  }
})()


function resolve (dir) {
    return path.join(__dirname,dir)
}

module.exports = {
    baseUrl: '',
    outputDir: 'dist/pages',
    pages: getPages,
    configureWebpack: config => {
        config.resolve = {
           extensions: ['.js', '.vue', '.json',".css"],
            alias: {
              'vue$': 'vue/dist/vue.esm.js',
              '@': resolve('src'),
            }
        }
    },
    devServer:{
        publicPath:'/',//这个属性理论上应避免改动，应与baseUrl同步，这里因开发习惯问题暂时改成/pages/
        proxy:{
            '/':{
                target:'http://127.0.0.1:8091/',
                changeOrigin:true,
                ws:false,
                pathRewrite:{
                    '^/':''
                }
            }
        }
    }
}

