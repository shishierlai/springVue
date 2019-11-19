<template>
  <div id="app">
    <div>
        <el-button  size="mini" @click="handleAdd()">新增角色</el-button>
    </div>
    <el-table
      :data="tableData" >
      <el-table-column
      type="index"
      width="20%">
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
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageRows"
        layout="prev, pager, next, jumper"
        :total="totalRows">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
     tableData:[],
     currentPage: 1,
      pageRows: 10,
      totalRows: 0,
    }
  },
  methods:{
    handleAdd(){
      this.$router.push('/role_add');
    },
    handleEdit(id){
        this.$router.push('/role_edit/'+id);
    },
    handleCurrentChange: function (val) {
        this.currentPage = val;
        this.$refs['queryCtrl'].query();
    },
    loadData(){
        // this.$ajax.post('../api/shiro/getRoles', {p:this.currentPage}, function (data) {
        //     this.tableData = data.values;
        //     this.totalRows = data.totalRows;
        // }.bind(this));
    }
  },
  mounted(){
      this.loadData();
  }
}
</script>

<style scoped>


</style>
