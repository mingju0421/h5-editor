<template>
  <div class="editor-panel">
      <div class="editor-panel-inner">
          <div class="editor-main" :style="{
            transform: `scale(${scale})`,
            width: `${projectData.width}px`,
            height: `${projectData.height}px`
          }">
              <div class="page-preview-wrapper" ref="canvas-panel" id="canvas-panel" :style="getCommonStyle(activePage.commonStyle)">
                  <!-- 页面组件列表展示 -->
                  <editShape 
                  v-for="item in activePage.elements" 
                  :key="item.uuid" 
                  :uuid="item.uuid" 
                  :defaultStyle="item.commonStyle" 
                  :active="item.uuid === activeElementUUID" 
                  :style="getCommonStyle(item.commonStyle)" 
                  @handleElementClick="handleElementClick(item.uuid)" 
                  @resize="handleElementResize">
                      <component :is="item.elName" class="element-on-edit-pane" v-bind="{...item.propsValue, value: item.value}"></component>
                  </editShape>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {componentsObject} from '../../../../plugins/index'
import editorProjectConfig from '../../dataModel'
const editShape = () => import(/* webpackChunkName: "editShape" */'../../../../components/edit-shape')
export default {
    props: {
        // canvas 画板缩放
        scale: {
            type: Number,
            default: 1
        }
    },
    components: {
        ...componentsObject,
        editShape
    },
    data() {
        return {
          getCommonStyle: editorProjectConfig.getCommonStyle
        }
    },
    computed: {
        ...mapState({
            projectData: state => state.editor.projectData,
            activePageUUID: state => state.editor.activePageUUID,
            activeElementUUID: state => state.editor.activeElementUUID
        }),
        ...mapGetters([
            'currentPageIndex',
            'activeElementIndex',
            'avtiveElement',
            'activePage'
        ])
    },
    methods: {
      /**
       * 元素被点击, 设置 uuid
       */
      handleElementClick(uuid) {
        this.$store.dispatch('setActiveElementUUID', uuid)
      },
      handleElementResize(pos) {
        if(!pos) {
          this.$store.dispatch('addHistoryCache')
          return
        }
        this.projectData.pages[this.currentPageIndex].elements[this.activeElementIndex].commonStyle.left = pos.left
        // 更新元素 commonStyle
        console.log(pos)
        this.projectData.pages[this.currentPageIndex].elements[this.activeElementIndex].commonStyle = {...pos}
      }
    },
    mounted() {
        console.log(componentsObject)
    }

}
</script>

<style scoped>
.editor-panel{
    height: 100%;
    width: 100%;
    border: 1px solid #f5f5f5;
    border-width: 0 1px;
    display: flex;
    justify-content: center;
    background-image: linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    ),
    linear-gradient(
      45deg,
      #f5f5f5 25%,
      transparent 0,
      transparent 75%,
      #f5f5f5 0
    );
  background-position: 0 0, 13px 13px;
  background-size: 26px 26px;
}
.editor-panel-inner {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 20px;
}
.editor-main {
  border-radius: 3px;
  box-shadow: 0 3px 10px #dcdcdc;
  margin: 25px auto;
  position: relative;
  background: white;
  transform-origin: center top;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==');
}
.page-preview-wrapper {
  height: 100%;
  position: relative;
}
.element-on-edit-pane {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

</style>