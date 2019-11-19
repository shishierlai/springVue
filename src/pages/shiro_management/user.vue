<template>
  <div id="app">
    <div>
        <el-button  size="mini" @click="handleAdd()">新增角色</el-button>
    </div>
    <el-table
      :data="tableData" >
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
       width="180">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
     tableData:[]
    }
  },
  methods:{
        handleEdit(id){

        },
        loadData(){

        }
  },
  mounted(){
      this.loadData();
  }
}
</script>

<style scoped>


</style>
