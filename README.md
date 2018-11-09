# vue-toast
  基于vue2开发的移动端toast插件
## 使用
#### 安装：
    npm install vue-toast-animation -S
#### 引入：
    import Toast from 'vue-toast-animation';
    import 'vue-toast-animation/lib/index.css';
    Vue.use(Toast)
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
        <button class="toast" @click="Toast">Toast</button>
      </div>
    </template>
    <script>
    export default {
      name: "HelloWorld",
      methods: {
        Toast() {
          this.$toast("hello, world", {
            type: "top",
            animationType: "fadeInDown",
            duration: "6000"
          });
        }
      }
    };
    </script>
  ```
  #### 配置详解：
  * [options] options设置默认值
  
  #### 全局配置：
  *   type: Toast显示的位置 String | 默认: 'top' | 可选值 'top, center,bottom';
  *   animationType: Toast显示动画 String | 默认: 'fadeInDown' | 可选值 'fadeIn, fadeInDown, fadeInDownBig, fadeInLeft, fadeInLeftBig, fadeInRight, fadeInRightBig, fadeInUp, fadeInUpBig';
  *   duration: Toast显示时长 String | 默认: '2500';
    Vue.use(Toast, [options])
  ```
    Vue.use(Toast, {
      type: "top",
      animationType: "fadeInDown",
      duration: "6000"
    })
  ```
  #### 局部配置：
  ```
    this.$toast("hello, world", {
      type: "top",
      animationType: "fadeInDown",
      duration: "6000"
    });
  ```
