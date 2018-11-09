import Vue from 'vue';
var Video = {}
var vm = new Vue({
  data() {
    return {
      video: {},
      poster: {},
      playing: {},
      pause: {},
      balline: {},
      td: {},
      duration: 0,
      moveX: 0,
      screenW: 0, // 屏幕宽度,
      currentTime: 0,
      index: 0,
    };
  },
  methods: {
    // 视频播放
    playVideo() {
      let self = this;
      // 隐藏poster 封面
      self.poster[self.index].style.display = "none";
      // 显示正在播放的cover
      self.playing[self.index].style.display = "block";
      // 隐藏暂停时的cover
      self.pause[self.index].style.display = "none";
      let d = self.toCurrent(self.video[self.index].duration * 1000) || '00:00';
      let c = self.toCurrent(self.video[self.index].currentTime * 1000) || '00:00';
      self.td[self.index].innerHTML = `${c}/${d}`;
      self.video[self.index].play();
      self.video[self.index].onended = function () {
        self.playEnd();
      };
      self.video[self.index].ontimeupdate = function () {
        self.playTimeUpdate();
      };
    },
    playTimeUpdate() {
      let self = this;
      self.currentTime = Math.round(self.video[self.index].currentTime);
      let d = self.video[self.index].duration * 1000;
      // 插入值
      self.td[self.index].innerHTML = `${self.toCurrent(self.currentTime * 1000)} / ${self.toCurrent(d)}`
      let w = 100 * self.currentTime * 1000 / d;
      self.balline[self.index].style.width = w + '%';
    },
    playEnd() {
      let self = this;
      // 隐藏poster 封面
      self.poster[self.index].style.display = "block";
      // 隐藏正在播放的cover
      self.playing[self.index].style.display = "none";
      // 隐藏暂停时的cover
      self.pause[self.index].style.display = "none";
    },
    // 正在播放， 点击暂停
    pauseVideo() {
      let self = this;
      self.video[self.index].pause();
      // 隐藏poster 封面
      self.poster[self.index].style.display = "none";
      // 隐藏正在播放的cover
      self.playing[self.index].style.display = "none";
      // 显示暂停时的cover
      self.pause[self.index].style.display = "block";
    },
    // 已暂停播放， 点击重新播放
    playPauseVideo() {
      let self = this;
      self.video[self.index].play();
      // 隐藏poster 封面
      self.poster[self.index].style.display = "none";
      // 显示正在播放的cover
      self.playing[self.index].style.display = "block";
      // 隐藏暂停时的cover
      self.pause[self.index].style.display = "none";
    },
    launchFullScreen(element) {
      var element = element || document.documentElement;
      // android，请求全屏
      if (typeof element.webkitRequestFullScreen === "function") {
        element.webkitRequestFullScreen();
      }
      //ios，请求全屏
      if (typeof element.webkitEnterFullscreen === "function") {
        element.webkitEnterFullscreen();
      }
    },
    // 绑定全屏事件
    handlerFullScreen() {
      let self = this;
      self.launchFullScreen(self.video[self.index]);
    },
    // 绑定拖拽进度条事件
    touchmove(ev) {
      let self = this;
      ev = ev || event;
      // 获取总时长
      let d = self.video[self.index].duration * 1000;
      self.moveX = ev.touches[0].clientX;
      let bl = self.moveX * 100 / self.screenW;
      self.balline[self.index].style.width = bl + '%';
      self.currentTime = bl * d / 100000;
      self.td[self.index].innerHTML = `${self.toCurrent(self.currentTime * 1000)} / ${self.toCurrent(d)}`
      self.video[self.index].currentTime = self.currentTime;
    },
    toCurrent(d) {
      let m = Math.round(d / 1000);
      if (m >= 60) {
        let f = Math.floor(m / 60),
          c = m - 60 * f,
          a, z;
        if (f < 10) {
          a = `0${f}`
        } else {
          a = `${f}`
        }
        if (c < 10) {
          z = `0${c}`
        } else {
          z = `${c}`
        }
        return `${a}:${z}`
      } else if (m < 60) {
        if (m < 10) {
          return `00:0${m}`
        } else {
          return `00:${m}`
        }
      }
    },
    // 退出全屏
    x5exitscreen() {
      let self = this
      // 隐藏poster 封面
      self.poster[self.index].style.display = "none";
      // 隐藏正在播放的cover
      self.playing[self.index].style.display = "none";
      // 显示暂停时的cover
      self.pause[self.index].style.display = "block";
      self.video[self.index].style.width = '100%';
      self.video[self.index].style.height = 'auto'
    },
    // 进入全屏
    x5enterscreen() {
      let self = this
      // 隐藏poster 封面
      self.poster[self.index].style.display = "none";
      // 隐藏正在播放的cover
      self.playing[self.index].style.display = "none";
      // 显示暂停时的cover
      self.pause[self.index].style.display = "none";
      self.video[self.index].style.width = '100vw';
      self.video[self.index].style.height = 'auto'
    }
  }
})
Video.install = function (Vue, options) {
  // 添加全局资源
  Vue.directive('video', {
    bind: function (el, binding, vnode) {
      /* 
        v-demo:foo.a.b = 'hello'
        @params
        binding.name 指令名称 demo
        binding.value 指令值 hello
        binding.expression 指令表达式 message
        binding.arg 指令参数 foo
        binding.arg 指令修饰符 { a: true, b: true}
        el 
        vnode
      */
      try {
        if (binding.name != 'video' || binding.value.selector != "video") {
          throw Error('Error: 绑定对象只能是video！')
          return false
        }
      } catch (e) {
        console.log(e)
      }
      vm.video = el.querySelectorAll('video');
      vm.screenW = document.documentElement.clientWidth;
      Array.prototype.forEach.call(vm.video, async (x, i) => {
        let div = `
      <section class="video-poster">
          <span class="shipin"></span>
        </section>
        <section class="video-playing"></section>
        <section class="video-pause">
          <span class="shipin"></span>
        </section>
        <section class="v2-controls flex flex-v flex-pack-justify">
          <section class="v2-top-controls flex flex-align-center flex-pack-justify">
            <section class="v2-duration flex flex-align-center flex-pack-center">
              <span class="time-duration" data-duration="${vm.duration}">00:00/00:00</span>
            </section>
            <section class="v2-launchFullScreen flex flex-align-center">
              <span class="bigvideo"></span>
            </section>
          </section>
          <section class="v2-process">
            <section class="v2-line"></section>
            <section class="v2-process-line flex">
            <section class="v2-ball-line"></section>
              <span class="v2-ball"></span>
              </section>
            </section>
          </section>`
        let sec = document.createElement('section');
        sec.setAttribute('class', 'feed-h5-videos2');
        x.setAttribute('webkit-playsinline', true);
        x.setAttribute('x-webkit-airplay', true);
        x.setAttribute('playsinline', true);
        x.style.cssText = 'object-fit:fill;width: 100%;height: auto;'
        x.parentNode.insertBefore(sec, x.nextSibling)
        sec.innerHTML = div;
        sec.appendChild(x);
        vm.playing = el.querySelectorAll('.video-playing');
        vm.poster = el.querySelectorAll('.video-poster');
        vm.pause = el.querySelectorAll('.video-pause');
        vm.balline = el.querySelectorAll('.v2-ball-line');
        vm.td = el.querySelectorAll('.time-duration');
        x.parentNode.querySelector('.video-poster').onclick = (function () {
          return function () {
            vm.index = i;
            vm.playVideo();
          };
        })(i);
        x.parentNode.querySelector('.video-playing').onclick = (function () {
          return function () {
            vm.index = i;
            vm.pauseVideo();
          };
        })(i);
        x.parentNode.querySelector('.video-pause').onclick = (function () {
          return function () {
            vm.index = i;
            vm.playPauseVideo();
          };
        })(i);
        x.parentNode.querySelector('.v2-controls').ontouchmove = (function () {
          return function () {
            vm.index = i;
            vm.touchmove();
          };
        })(i);
        x.parentNode.querySelector('.v2-launchFullScreen').onclick = (function () {
          return function () {
            vm.index = i;
            vm.handlerFullScreen();
          };
        })(i);
        // 微信进入和退出全屏监控
        x.addEventListener('x5videoenterfullscreen', function () {
          return function () {
            vm.index = i;
            x.parentNode.querySelector('.video-playing').style['display'] = 'none';
            x.parentNode.querySelector('.video-poster').style['display'] = 'none';
            x.parentNode.querySelector('.video-pause').style['display'] = 'none';
            x.style.width = vm.screenW + 'px';
            x.style.height = 'auto';
            vm.x5enterscreen();
          }(i)
        });
        x.addEventListener('x5videoexitfullscreen', function () {
          return function () {
            vm.index = i;
            x.parentNode.querySelector('.video-playing').style['display'] = 'none';
            x.parentNode.querySelector('.video-poster').style['display'] = 'none';
            x.parentNode.querySelector('.video-pause').style['display'] = 'block';
            x.style.width = '100%';
            x.style.height = 'auto';
            vm.x5exitscreen();
          }(i)
        });
        // android 监听屏幕全屏事件，进入全屏播放视频，退出全屏时自动暂停播放
        x.addEventListener("webkitfullscreenchange", function (event) {
          return function () {
            vm.index = i;
            if (document.webkitIsFullScreen) {
              x.style.width = '100vw';
              vm.playVideo();
            } else {
              x.style.width = '100%';
              vm.pauseVideo();
            }
          }(i)
        });
        // ios 监听屏幕全屏事件，进入全屏播放视频，退出全屏时自动暂停播放
        x.addEventListener("webkitbeginfullscreen", function () {
          return function () {
            vm.index = i;
            vm.playVideo();
          }(i)
        });
        x.addEventListener("webkitendfullscreen", function () {
          return function () {
            vm.index = i;
            vm.pauseVideo();
          }(i)
        });
      });
    }
  })
}

export default Video;