# 使用 canvas 实现手写签字、电子签名
插件vue-esign：  [https://github.com/JaimeCheng/vue-esign](https://github.com/JaimeCheng/vue-esign)
## Dependency
Dependencies (1)

`vue`

Dev Dependencies (11)

`babel-core`  ` babel-loader`  `babel-preset-env`  `babel-preset-stage-3`
`cross-env`    `css-loader`    `file-loader`       `vue-loader`
`vue-template-compiler`  `webpack`   `webpack-dev-server`


## 功能
  * 兼容 PC 和 Mobile；
  * 画布自适应屏幕大小变化（窗口缩放、屏幕旋转时画布无需重置，自动校正坐标）；
  * 自定义画布尺寸（导出图尺寸），画笔粗细、颜色，画布背景色；
  * 支持裁剪 （针对需求：有的签字需要裁剪掉四周空白）。
  * 导出图片格式为 base64；
  
## 安装 
`npm install vue-esign --save` 
  
## 使用
  ### 1.  main.js 中引入
  ~~~js
  import vueEsign from 'vue-esign'
  Vue.use(vueEsign)
  ~~~
  ### 2.  页面中使用**必须设置`ref`，用来调用组件的两个内置方法`reset()`和`generate()`**
  
  >无需给组件设置`style`的宽高，如果画布的`width`属性值没超出父元素的样式宽度，则该组件的样式宽度就是画布宽度，超出的话，组件样式宽度是父元素的100%；**只需设置好父元素的宽度即可**；
  
  ~~~html
  <vue-esign ref="esign" :width="800" :height="300" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
  <button @click="handleReset">清空画板</button> 
  <button @click="handleGenerate">生成图片</button>
  ~~~
  ~~~js
  data () {
    return {
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false ////是否裁剪，在画布设定尺寸基础上裁掉四周空白部分.默认false
    }
  },
  methods: {
    handleReset () {
      this.$refs.esign.reset()
    },
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        this.resultImg = res
      }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    }
  }
  ~~~
  
  ### 3.  说明
  <table>
  <thead>
  <tr>
  <th width=15%>属性</th>
  <th width=15%>类型</th>
  <th width=15%>默认值</th>
  <th align="left">说明</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td align="center">width</td>
  <td align="left">Number</td>
  <td align="center">800</td>
  <td align="left">画布宽度，即导出图片的宽度</td>
  </tr>
  <tr>
  <td align="center">height</td>
  <td align="left">Number</td>
  <td align="center">300</td>
  <td align="left">画布高度，即导出图片的高度</td>
  </tr>
  <tr>
  <td align="center">lineWidth</td>
  <td align="left">4</td>
  <td align="center">Number</td>
  <td align="left">画笔粗细</td>
  </tr>
  <tr>
  <td align="center">lineColor</td>
  <td align="left">String</td>
  <td align="center">#000000</td>
  <td align="left">画笔颜色</td>
  </tr>
  <tr>
  <td align="center">bgColor</td>
  <td align="left">String</td>
  <td align="center">空</td>
  <td align="left">画布背景色，为空时画布背景透明，<br>支持多种格式 '#ccc'，'#E5A1A1'，'rgb(229, 161, 161)'，'rgba(0,0,0,.6)'，'red'</td>
  </tr>
  <tr>
  <td align="center">isCrop</td>
  <td align="left">Boolean</td>
  <td align="center">false</td>
  <td align="left">是否裁剪，在画布设定尺寸基础上裁掉四周空白部分</td>
  </tr>
  </tbody>
  </table>
  
  ### 4. 两个内置方法，通过给组件设置`ref`调用
  **清空画布**
  ~~~js
  this.$refs.esign.reset()
  ~~~
  **生成图片**
  ~~~js
  this.$refs.esign.generate().then(res => {
    console.log(res) // base64图片
  }).catch(err => {
    alert(err) // 画布没有签字时会执行这里 'Not Signned'
  })
  ~~~ 
