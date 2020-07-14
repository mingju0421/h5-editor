<template>
    <div class="components-libs-wrapper">
        <p class="page-title text-center">组件库</p>
        <el-scrollbar style="height: 100%">
            <ul class="scrollbar-wrapper">
                <li class="clearfix" v-for="(item, index) in componentsList" :key="index">
                    <div class="components-libs-title">
                        <p>{{item.title}}</p>
                    </div>
                    <div v-if="item.components && item.components.length">
                        <div class="components-lib-item" v-for="(element, i) in item.components" :key="i" @click="handleClick(element)">
                            <div class="lib-item-img"><span :class="element.icon"></span></div>
                            <p class="lib-item-title">{{element.title}}</p>
                        </div>
                    </div>
                    <div v-else>
                        <p class="gray text-conter">待完善...</p>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script>
import { camelCase } from 'lodash'
import eleConfig from '../../ele-config'
import { componentsObject } from '../../../../plugins/index'
export default {
    name: 'component-libs',
    data() {
        return {
            componentsList: eleConfig,
        }
    },
    methods: {
        /**
         * 点击事件, 向父组件派发 add-element 事件, 参数: 当前组件对象
         */
        handleClick(element) {
            let props = this.getComponentProps(element.elName);
            this.$store.dispatch('addElement', { ...element, needProps: props })
        },
        getComponentProps(elName) {
            let elComponentData
            for (let key of Object.keys(componentsObject)) {
                if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
                    elComponentData = componentsObject[key]
                    break
                }
            }
            if (!elComponentData) return {}
            let props = {}
            for (let key of Object.keys(elComponentData.props)) {
                props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
            }
            return props
        }
    }
}
</script>

<style>
</style>