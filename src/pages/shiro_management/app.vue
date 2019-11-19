<template>
  <div>
    <s-menu moduleCode="shiro"></s-menu>
  </div>
</template>

<style>

</style>
<script>

  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left',  // 默认动态路由变化为slide-right
      }
    },
    methods: {
    },
    watch: {
      //监听路由的方向 并设置相应的动画效果
      '$route'(to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    mounted: function () {

    },
  }
</script>

