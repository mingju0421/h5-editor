// import { cloneDeep, merge } from 'lodash'
import editorProjectConfig from '../../pages/editor/dataModel'

const state = {
  // 当前编辑器编辑工程项目数据
  projectData: {},
}

const actions = {
  // =====================  元素  ==============================
  /**
   * 添加元素
   * @param {*} param0
   * @param {*} elData
   */
  addElement({ commit }, elData) {
    let activePage = getters.activePage()
    console.log(activePage)
    let data = editorProjectConfig.getElementConfig(elData, {
      zIndex:
        activePage.elements && activePage.elements.length
          ? activePage.elements.length + 1
          : 1,
    })
    commit('addElement', data)
    commit('setActiveElementUUID', data.uuid)
    commit('addHistoryCache')
  },
}

const getters = {
  /**
   * 当前选中的页面, 如果不存在返回 -1
   */
  activePage() {
    if (!state.projectData.page || !state.activePageUUID) {
      return { commonStyle: {}, config: {} }
    }
    return state.projectData.pages.find((v) => {
      return v.uuid === state.activePageUUID
    })
  },
  pageMode(state) {
    return state.projectData.pageMode || 'h5'
  },
}
export { state, getters, actions }
