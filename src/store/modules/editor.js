import { cloneDeep } from 'lodash' //merge
import editorProjectConfig from '../../pages/editor/dataModel'

const state = {
  // 当前编辑器编辑工程项目数据
  projectData: {},
  // 画板选中的元素 uuid
  activeElementUUID: '',
  // 当前正在编辑的页面 uuid
  activePageUUID: '',
  // 历史操作数据用于undo redo
  historyCache: [],
  // redo undo 指针
  currentHistoryIndex: -1,
  activeAttrEditCollapse: ['1'],
}

const actions = {
  setPrjectData({ commit, state, dispatch }, data) {
    let projectData = data
    if (!projectData) {
      projectData = editorProjectConfig.getProjectConfig()
    }
    commit('setProjectData', projectData)
    //  判断如果有页面选中第一个,没有则新建一个页面再选中第一个
    if (!state.projectData.pages || !state.projectData.pages.length) {
      dispatch('addPage')
    }
  },
  // =====================  元素  ==============================
  /**
   * 添加元素
   * @param {*} param0
   * @param {*} elData
   */
  addElement({ commit }, elData) {
    debugger
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

const mutations = {
  setProjectData(state, data) {
    state.projectData = data
  },
  setActiveElementUUID(state, data) {
    state.activeElementUUID = data
  },
  // ==================  页面操作  ============================
  addPage({ commit }, uuid) {
    let data = editorProjectConfig.getPageConfig()
    let index = -1
    index = uuid
      ? state.projectData.pages.findIndex((v) => v.uuid === uuid)
      : state.projectData.pages.length - 1
    commit('insertPage', data, index)
    commit('addHistoryCache')
  },
  // ================== 元素 ===========================
  /**
   * 往画板添加元素
   * @param {*} state
   * @param {*} elData
   */
  addElement(state, elData) {
    let index = state.projectData.pages.findIndex(
      (v) => v.uuid === state.activePageUUID,
    )
    state.projectData.pages[index].elements.push(elData)
  },
  // ====================  历史记录  ==========================
  addHistoryCache(state) {
    if (state.currentHistoryIndex + 1 < state.historyCache.length) {
      state.historyCache.splice(state.currentHistoryIndex + 1)
    }
    state.historyCache.push({
      projectData: cloneDeep(state.projectData),
      activePageUUID: state.activePageUUID,
      activeElementUUID: state.activeElementUUID,
    })
    // 限制 undo 记录步数, 最多支持 100 步操作
    state.historyCache.splice(100)
    state.currentHistoryIndex++
  },
  /**
   * 新增页面
   */
  insertPage(state, data, index) {
    index
      ? state.projectData.pages.splice(index, 0, data)
      : state.projectData.pages.push(data)
  },
}
export { state, getters, actions, mutations }
