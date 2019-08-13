# freelycar-wechat

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

修改cubeUI基本配色：
node_modules\cube-ui\src\common\stylus\var\color.styl
将颜色变量改为$color-orange = #2C4AC6
$color-dark-orange = #2049BF

修改cubeUI组件细节颜色：
node_modules\cube-ui\src\common\stylus\theme\default.styl

## 自动化部署说明
``` bash
#部署到生产环境
npm run deploy:prod
```

如果是Windows系统，可能需要cross-env支持。

并且需要将package.json中的deploy:prod改为：
npm run build && cross-env NODE_ENV=prod node ./deploy
