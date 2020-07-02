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
                    this.resultImg = res    //res为base64图片
                    // 转成文件
                    var blob = this.dataURLtoBlob(res)
                    var tofile = this.blobToFile(blob, '签名.jpg')
                    console.log(tofile);

                    setTimeout(async () => {
                        const formData = new FormData()
                        formData.append('file', tofile, tofile.name)
                        formData.append('fileType', 9)
                        // ajax 请求
                    })

                }).catch(err => {
                    alert(err) // 画布没有签字时会执行这里 'Not Signned'
                })
            },
            // 将base64转换为blob
            dataURLtoBlob(url) {
                var arr = url.split(',');
                console.log(arr[0]);
                var mime = arr[0].match(/:(.*?);/)[1];
                console.log(mime);
                var bstr = atob(arr[1]); //用于解码使用 base-64 编码的字符串
                var n = bstr.length;
                console.log(n);
                var u8arr = new Uint8Array(n);//处理apng图像解码时,使用到Uint8Array对象
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new Blob([u8arr], {type: mime})
            },
            // 将blob转换为file
            blobToFile(theBlob, fileName) {
                theBlob.lastModifiedDate = new Date()
                theBlob.name = fileName
                return theBlob
            }
        }
    }
</script>

<style scoped>

</style>
