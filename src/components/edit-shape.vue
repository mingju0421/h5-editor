<template>
  <div class="components-edit-shape"
      @click="handleTopWrapperClick"
      @mousedown="handleMouseDownOnElement"
      :class="{active: this.active}">
      <div class="edit-shape-point"
      v-for="item in (active ? pointList : [])" :key="item"
      @mousedown="handleMouseDownOnPoint(item)"
      :style="getPointStyle(item)"
      ></div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EditShape',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    defaultStyle: {
      require: true,
      type: Object
    },
    uuid: String
  },
  data() {
    return {
      pointList: ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'],
      directionKey: {
        t: 'n',
        b: 's',
        l: 'w',
        r: 'e'
      }
    }
  },
  methods: {
    /**
     * 获取 point 计算后样式
     */
    getPointStyle(point) {
      const {height, width} = this.defaultStyle
      let hasT = /t/.test(point)
      let hasB = /b/.test(point)
      let hasL = /l/.test(point)
      let hasR = /r/.test(point)
      let newLeft = 0
      let newTop = 0
      if(point.length === 2) {
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
      }else {
        // 上下点, 宽度固定在中间
        if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
        }
        // 左右点, 高度固定在中间
        if(hasL || hasR) {
          newLeft = hasL ? 0 : width
          newTop = height / 2
        }
      }
      const style = {
        marginLeft: (hasL || hasR) ? '-5px' : 0,
        marginTop: (hasT || hasB) ? '-5px' : 0,
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: point.split('').reverse().map(m => this.directionKey[m]).join('') + '-resize'
      }
      return style
    },
    /**
     * 鼠标点击触发 resize 事件
     */
    handleMouseDownOnPoint(point) {
      let {clientX: startX, clientY: startY} = event
      // 抛出事件让父组件设置当前元素选中状态
      this.$emit('handleElementClick')
      event.stopPropagation()
      event.preventDefault()
      const {height, width, top, left} = this.defaultStyle
      const pos = {...this.defaultStyle}
      let move = moveEvent => {
        let {clientX: currX, clientY: currY} = moveEvent
        let disY = currY - startY
        let disX = currX - startX
        let hasT = /t/.test(point)
        let hasB = /b/.test(point)
        let hasL = /l/.test(point)
        let hasR = /r/.test(point)
        let newHeight = +height + (hasT ? -disY : hasB ? disY : 0)
        let newWidth = +width + (hasL ? -disX : hasR ? disX : 0)
        pos.height = newHeight > 0 ? newHeight : 0
        pos.width = newWidth > 0 ? newWidth : 0
        pos.left = +left + (hasL ? disX : 0)
        pos.top = + top + (hasT ? disY : 0)
        this.$emit('resize', pos)
      }
      let up = () => {
        this.$emit('resize')
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    /**
     * 点击事件, 点击后设置当前元素为选中元素
     */
    handleTopWrapperClick(e) {
      // 阻止事件冒泡
      e.stopPropagation()
      // 阻止默认事件
      e.preventDefault()
    },
    /**
     * 鼠标选中元素拖拽事件
     */
    handleMouseDownOnElement(e) {
      // 抛出事件让父组件设置当前元素选中状态
      this.$emit('handleElementClick')
      const pos = {...this.defaultStyle}
      let startY = e.clientY
      let startX = e.clientX
      let startTop = pos.top
      let startLeft = pos.left
      let firstTime = '', lastTime = ''
      firstTime = new Date().getTime()
      let move = moveEvent => {
        // 移动的时候, 不需要想后代元素传递事件, 只需要单纯第移动就可以
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
        console.log(startY, startX)
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        pos.top = currY - startY + startTop
        pos.left = currX - startX + startLeft
        
        this.$emit('resize', pos)
      }
      let up = () => {
        lastTime = new Date().getTime()
        if((lastTime - firstTime) > 200) {
          this.$emit('resize')
        }
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
      return true
    }
  },
  mounted() {
    console.log(this.$slots)
  }
}
</script>

<style scoped>
.components-edit-shape{
  cursor: move;
}
.components-edit-shape.active{
  outline: 1px dashed #25a589;
}
.components-edit-shape:hover{
  outline: 1px dashed #25a589;
}
  .edit-shape-point {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border: 1px solid #59c7f9;
    border-radius: 10px;
    position: absolute;
    z-index: 1001;
  }

</style>