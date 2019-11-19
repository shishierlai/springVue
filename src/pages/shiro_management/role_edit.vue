

<template>
  <div id="app">
    <div class="bg-top">
      <div class="top-path">
        <div class="top-path-top">首页/角色管理</div>
        <div class="top-path-bottom">{{title}}</div>
      </div>
      <div class="top-right-btn">
        <el-button size="mini">右边</el-button>
        <el-button size="mini">右边</el-button>
        <el-button size="mini">右边</el-button>
      </div>
    </div>
    <div class="tree-choose">
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-tree
          :data="menuTree"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expanded-keys="default_selects"
          :default-checked-keys="default_selects"
        >
        </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        pageName: this.$route.name,
        roleVo:{},
        permissionList:[],
        default_selects:["shi:user:add"],

        menuTree: [
                {
                    id:"shi",
                    label:"个人网站",
                  
                    children:[
                        {
                            id: "shi:test1",
                            label: "余额管理",
                           
                            children:[{
                                id: "shi:user:add",
                                label: "新增",
                                 
                              },
                              {
                                id: "shi:user:delete",
                                label: "删除",
                               
                              },
              
                            ]
                        },
                        {
                            id: "shi:test2",
                            label: "通知管理",
                          
                            children:[{
                                id: "shi:user:add",
                                label: "新增",
                               
                              },
                              {
                                id: "shi:user:delete",
                                label: "删除",
                              }
              
                            ]
                        },
                    ]
                },
                {
                    id:"shiro",
                    label:"权限管理",
                   
                    children:[
                        {
                            id: "shiro:user",
                            label: "用户管理",
                           
                            children:[{
                                id: "shiro:user:add",
                                label: "新增",
                               
                              },
                              {
                                id: "shiro:user:delete",
                                label: "删除",
                                
                              },
              
                            ]
                        },
                        {
                            id: "shiro:role",
                            label: "角色管理",
                  
                            children:[{
                                id: "shiro:user:add",
                                label: "新增",
                       
                              },
                              {
                                id: "shiro:user:delete",
                                label: "删除",
                              
                              },
              
                            ]
                        },
                    ]
                }
            ],

    }
  },
  methods:{
      
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      loadData() {         
          if(this.pageName == 'role_edit') {
              this.$ajax.get('../api/shiro/getRoleDetail' + this.$route.params.id, function (data) {
                  this.roleVo=data.roleVo;
                  this.permissionList=data.permission;
              }.bind(this));
          }
          
     },
  },
  computed: {
    title() {
        if(this.pageName == 'role_edit') {
            return '编辑角色';
          } else if (this.pageName == 'role_add') {
            return '新增角色';
        }
    },
  },
  mounted:function(){
    this.loadData();
  }
}
</script>

<style scoped>
.bg-top{
  width: 100%;
  background-color: #fff;
  height: 70px;
}
.top-path{
  float: left;
}
.top-path-top{
  padding-top: 5px;
  padding-left: 10px;
  font-size: 14px;
}
.top-path-bottom{
  padding-top: 20px;
  padding-left: 10px;
  font-weight: 600;
}

.top-right-btn{
  float: right;
  padding-top: 35px;
  padding-right: 10px;
}
.tree-choose{
  width: 300px;
}

</style>
