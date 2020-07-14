<template>
    <el-dropdown class="components-user-header cursor-pointer">
        <span class="el-dropdown-link">
            <span class="user-header-image iconfont">
                <img src="../common/images/head.png" alt="" v-if="!userData.avatar">
                <img :src="userData.avatar" alt="" v-else>
            </span>
            {{userData.name}}
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
                <div @click="_logout">
                    <span><i class="iconfont icon-tuichuyingyong"></i>&nbsp;退出登录</span>
                </div>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapState } from 'vuex'
// import userModel from '../mixins/userModel.js'
export default {
    // name: 'userHeaderBar',
    // mixins: [userModel],
    computed: {
        ...mapState({
            userData: state => state.user.userData
        })
    }
}
</script>

<style scoped>
.user-header-image img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
</style>