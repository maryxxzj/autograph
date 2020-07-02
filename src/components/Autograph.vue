<template>
  <div style="position: relative;">
    <div
      style="position: absolute;top:0;left: 0;width: 800px;height: 400px; z-index: 1;background-color: #E5A1A1"></div>
    <div style="position: absolute;top:0;left: 0;width: 800px;height: 400px; z-index: 10">
      <vue-esign ref="esign" :width="800" :height="400" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor"
                 :bgColor.sync="bgColor"/>
    </div>
    <div style="position: absolute; top:410px;">
      <button @click="handleReset">清空</button>
      <button @click="handleGenerate">生成</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Autograph",
        data() {
            return {
                lineWidth: 6,
                lineColor: '#000000',
                bgColor: '',
                resultImg: '',
                isCrop: false  //是否裁剪，在画布设定尺寸基础上裁掉四周空白部分.默认false
            }
        },
        methods: {
            handleReset() {
                this.$refs.esign.reset()
            },
            handleGenerate() {
                this.$refs.esign.generate().then(res => {
                    this.resultImg = res;    //res为base64图片

                    /* 将生成的图片保存到本地 */
                    var a = document.createElement('a');  // 创建一个a元素
                    var event = new MouseEvent('click'); // 创建一个单击事件
                    a.download = name || '签名'; // 将a的download属性设置为想要下载的图片名称
                    a.href = res; // 将生成的res设置为a.href属性
                    a.dispatchEvent(event);// 触发a的单击事件
                }).catch(err => {
                    alert(err) // 画布没有签字时会执行这里 'Not Signned'
                })
            }
        }
    }
</script>

<style scoped>

</style>
