import { createUUID, deepClone } from '../../../common/uitls'
import { cloneDeep, merge } from 'lodash'
import $config from '../../config/index'

let elementConfig = {
  elName: '', // 组件名
  animations: [], // 动画
  commonStyle: {
    position: 'absolute',
    width: $config.canvasH5Width,
    height: 30,
    top: 200,
    left: 0,
    rotate: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderWidth: 0,
    borderColor: '',
    borderStyle: 'solid',
    borderRadius: 0,
    boxShadow: '',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '',
    backgroundImage: '',
    backgroundSize: 'cover',
    opacity: 1,
    zIndex: 1,
  }, // 公共样式
  events: [], // 事件
  propsValue: {}, // 属性参数
  value: '', // 绑定值
  valueType: 'String', // 值类型
}

// 页面配置信息字段
let pageConfig = {
  name: '',
  elements: [],
  commonStyle: {
    backgroundColor: '',
    backgroundImage: '',
    backgroundSize: 'cover',
  },
  config: {},
}
// 项目配置信息字段
let projectConfig = {
  name: '',
  title: '未命名场景',
  description: '我用夸克可视化编辑器做了一个超酷炫的H5，快来看看吧。',
  coverImage: '',
  auther: '',
  script: '',
  width: $config.canvasH5Width,
  height: $config.canvasH5Height,
  pages: [],
}

let getElementConfig = (element, extendStyle = {}) => {
  let elementData = cloneDeep(element)
  let type = elementData.valueType || 'String' // 默认 string 类型
  let dict = {
    Sting: '',
    Array: [],
    Object: {},
    Boolean: false,
    Number: 0,
    // 待扩展数据类型
  }
  let elementConfigData = cloneDeep(elementConfig)
  let config = {
    uuid: createUUID(),
    ...elementConfigData,
    elName: elementData.elName,
    propsValue: deepClone(elementData.needProps || {}),
  }
  // 样式
  config.commonStyle = merge(config.commonStyle, elementData.defaultStyle)
  config.commonStyle = merge(config.commonStyle, extendStyle)

  config.value = element.defaultValue || dict[type]
  config.valueType = type
  config.isForm = !!element.isForm
  return config
}

export default {
  elementConfig,
  pageConfig,
  projectConfig,
  getElementConfig,
}
