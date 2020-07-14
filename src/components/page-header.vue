<template>
    <div class="components-page-header">
        <div class="logo-wrapper cursor-pointer" @click="$router.push('/')">
            <img src="../common/images/logo.png" alt="">
            <span>H5</span>
        </div>
        <slot></slot>
        <div class="pull-right" v-if="true">
            <userHeaderBar class="marginL30"></userHeaderBar>
        </div>
    </div>
</template>

<script>
const userHeaderBar = () => import('./user-header-bar.vue')
import { mapState } from 'vuex'
export default {
    name: 'page-header',
    components: {
        userHeaderBar
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            userData: state => state.user.userData,
            token: state => state.user.token
        })
    },
    methods: {
        logoutFn() {
            this.$router.push({ name: 'Login' })
        },
        goLogin() {
            // 保存用户进入的 url
            this.$Utils.Cookie.set('beforeLoginUrl', encodeURIComponent(this.$route.fullPath), 1 / 24 / 60, window.location.pathname.substring(0, window.location.pathname.length - 1))
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>

<style scoped>
.components-page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    height: 48px;
    box-shadow: 0px 1px 4px 0px rgba(195, 195, 195, 0.6);
}
.logo-wrapper {
    display: flex;
    align-items: center;
}
.logo-wrapper img {
    width: 26px;
    margin-right: 8px;
}
.logo-wrapper span {
    font-size: 18px;
}
</style>