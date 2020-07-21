<template>
    <div class="mj-text">
        {{text}}
    </div>
</template>

<script>
export default {
    name: 'mjText',
    props: {
        text: {
            type: String,
            default: '文字'
        }
    },
    data() {
        return {
            defaultStyle: {
                height: 40
            }
        }
    }
}
</script>

<style>
</style>