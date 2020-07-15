<template>
    <div class="page-editor editor-wrapper">
        <!-- 左侧导航 -->
        <div class="editor-side-bar border-R">
            <el-tabs tab-position='left' v-model="activeSideBar">
                <template v-for="(item, index) in sidebarMenus">
                    <el-tab-pane :name='item.value' :key="index" v-if="!item.pageMode || (item.pageMode && item.pageMode === pageMode)">
                        <el-tooltip slot="label" class="item" effect="dark" :content="item.label" placement="right">
                            <i :class="item.elementUiIcon"></i>
                        </el-tooltip>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <!-- 组件&页面&模板 -->
        <div class="editor-page-edit-wrapper">
            <componentLibs v-if="activeSideBar === 'componentLibs'"></componentLibs>
            <pageManage v-if="activeSideBar === 'pageManage'"></pageManage>
            <templateLibs v-if="activeSideBar === 'templateLibs'"></templateLibs>
        </div>

        <!-- 页面编辑区域 -->
        <div class="editor-main">
            <div class="control-bar-wrapper">
                <controlBar></controlBar>
            </div>
        </div>

        <!-- 属性编辑区域 -->
        <div class="el-attr-wrapper scrollbar-wrapper">
            <el-tabs v-model="activeAttr" stretch>
                <el-tab-pane label="属性" name="属性">属性</el-tab-pane>
                <el-tab-pane label="事件" name="事件">事件</el-tab-pane>
                <el-tab-pane label="动画" name="动画">动画</el-tab-pane>
                <el-tab-pane label="JS 脚本" name="JS 脚本">JS 脚本</el-tab-pane>
                <el-tab-pane label="页面设置" name="页面设置">页面设置</el-tab-pane>

            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
const componentLibs = () => import(/* webpackChunkName: "componentLibs" */ './components/component-libs/index')
const pageManage = () => import(/* webpackChunkName: "pageManage" */ './components/page-manage')
const templateLibs = () => import(/* webpackChunkName: "templateLibs" */ './components/template-libs')
const controlBar = () => import(/* webpackChunkName: "controlBar" */ './components/control-bar')
export default {
    name: 'editor-index',
    components: {
        componentLibs,
        pageManage,
        templateLibs,
        controlBar
    },
    data() {
        return {
            activeSideBar: 'componentLibs',
            activeAttr: '属性',
            sidebarMenus: [
                { label: '组件列表', value: 'componentLibs', elementUiIcon: 'el-icon-s-operation', pageMode: '' },
                { label: '页面管理', value: 'pageManage', elementUiIcon: 'el-icon-document', pageMode: 'h5' },
                { label: '模板库', value: 'templateLibs', elementUiIcon: 'el-icon-files', pageMode: '' },
            ],
        }
    },
    computed: {
        ...mapGetters(['pageMode'])
    },
    created() {
        this.$store.dispatch('setPrjectData')
        this.id = this.$route.query.id || 123456
        this.initPageData()
    },
    methods: {
        /** 初始化页面数据 */
        initPageData() {
            console.log(`deitor-methods-initPageData`)
        }
    }
}
</script>

<style scoped>
.editor-wrapper {
    display: flex;
    height: 100%;
    position: relative;
}
.editor-wrapper .editor-side-bar {
    width: 55px;
}
.editor-wrapper .editor-side-bar .el-tabs {
    height: 100%;
}
.editor-wrapper .editor-page-edit-wrapper {
    width: 210px;
}
.editor-wrapper .editor-main {
    flex: 1;
    background: #f0f2f5;
    position: relative;
}
.editor-wrapper .el-attr-wrapper {
    width: 380px;
    padding: 0;
}
.editor-wrapper .editor-main .control-bar-wrapper {
    position: absolute;
    top: -44px;
    left: 0;
    width: 100%;
    text-align: center;
}
</style>