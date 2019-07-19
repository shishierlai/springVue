<template>
  <div id="app">
    <div class="index-title">
      <div class="index-first">如何将系统撸向功能齐全</div>
      <div class="index-second">如何将系统撸向功能瘫痪</div>

      <el-button type="primary" @click="handleGood()">奇妙之旅</el-button>
      <el-button type="success" @click="handleMemory()">幻想之旅</el-button>
    </div>
    
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
    handleGood(){
      this.$router.push("./boot")
    },
    handleMemory(){
      this.$router.push("./boot2")
    }
  }
}
</script>

<style scoped>
.index-title{
  margin-top: 150px;
  text-align: center;
  font-size: 25px;
}
.index-first{
  color: blue;
}
.index-second{
  color: green;
}
.index-third{
  width: 300px;
  
}
</style>
