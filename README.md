# vue-toast
  基于vue2开发的移动端 视频优化插件
## 使用
#### 安装：
    npm install vue-video-optimized -S
#### 引入：
    import Video from 'vue-video-optimized';
    import 'vue-video-optimized/lib/index.css';
    Vue.use(Video)
#### 注意：
    vue-cli2 需要配置 在webpack.base.conf.js：
    ```
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.js'
        }
      },
    ```
    vue-cli3 需要配置 在vue.config.js：
    ```
      configureWebpack: {
        resolve: {
          alias: {
            'vue$': 'vue/dist/vue.js'
          }
        }
      }
    ```
#### 在组件中使用：
  ```
  <template>
    <div class="hello">
      <div v-video="{ selector: 'video' }">
        <video 
          src="http://video.tiejin.cn/2aafd3e42899419fb39b0d3f8187b71c/299f933214154aa9a82e792e4f5a73bd-989b7eaa8f9e5340c5aeb24642a34b2d-ld.mp4"
        ></video>
        <p>视频插件</p>
        <p>视频插件</p>
        <video 
          src="http://video.tiejin.cn/6cd16551fe6c47c8a8d52331dd4ea8d3/4e3cce4a937f48f884a8aa74f96a8858-a4847ad3bbfdf97b8b0ec9b57e2ff766-sd.mp4"
        ></video>
      </div>
    </div>
  </template>
  ```
  ### 效果图：
  ![image][http://videos.55lover.com/WechatIMG883.jpeg]
  ![image][http://videos.55lover.com/WechatIMG885.jpeg]
