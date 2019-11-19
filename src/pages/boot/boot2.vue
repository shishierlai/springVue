<template>
  <div id="app">
    <div>测试我的第二个</div>
    <el-button @click="handleOpen()">测试按钮</el-button>
    <el-button @click="handleOpen1()">api测试按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  methods:{
      handleOpen(){
          this.$ajax.post('../api/combine',{name:'shishierlai',age:25,address:'3522'},function(data){
              console.log(data)
          }.bind(this));
      },
      handleOpen1(){
          this.$ajax.post('../api/getUser',{},function(data){
            var test=data;
            console.log(test);
          }.bind(this));
      }
  },

}
</script>

<style scoped>
</style>
