<template>
    <div id="app">
        <div class="page-header-wrapper">
            <PageHeader></PageHeader>
        </div>
        <div class="routerWrapper">

            <router-view />
        </div>
    </div>
</template>

<script>
const PageHeader = () => import('./components/page-header')
export default {
    components: {
        PageHeader
    }
}
</script>
<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
.routerWrapper {
    height: calc(100% - 48px);
}
</style>

<style>
html,
body {
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
