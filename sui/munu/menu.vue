<template>
    <div id="app" style="display: flex;flex-direction: row">

      
        <el-menu :router="true" default-active="moduleCode" class="el-menu-vertical-demo" :collapse="false">
            <div class="loginName">
                <span>用户名: {{this.logincode}}</span>
                <a class="logout-btn" href="../logout">登出</a>
            </div>
            <div v-for="(menuItem,index) in this.menuTree" :key="index">
                   <el-submenu :index="menuItem.code"  v-show="menuItem.visible">
                       <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">{{menuItem.name}}</span>
                        </template>
                        <el-menu-item-group>
                             <div class="child-menu"> 
                                
                                <li v-for="item3 in menuItem.children" :key="item3.code" v-show="item3.visible"
                                    :class="{'active':item3.path == currSubMenuPath}" >
                                    <a :href="menuItem.path+item3.path">{{item3.name}}</a>
                                </li>
                                <!-- <el-menu-item :index="item.code" :route="item.path">{{item.name}}</el-menu-item> -->
                               
                            </div> 
                        </el-menu-item-group>
                   </el-submenu>
            </div>

           
        </el-menu>


    <div class="m-page">
            <transition :name="transitionName">
                <router-view class="m-page-trans" v-wechat-title="$route.meta.title"></router-view>
            </transition>
    </div>

    </div>
</template>
<script>

var menuTest=require('./menu.json');
export default {
    
    data(){
        return{
            isCollapse: true,
            transitionName: 'slide-left', 
            logincode:'',
            currNavMenuCode: this.moduleCode,
            currSubMenuPath:this.$route.path,
            menuTree: [],
               
        }
    },
    props: {
        moduleCode: String
    },
    watch: {
        '$route'(to, from) {
                this.currSubMenuPath = to.path;
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
    methods:{
        handleLogin(){
            this.$ajax.post('../logout',{}, function (data) {
            
             }.bind(this));
        },
        handleData(){
          
             this.$ajax.post('../api/user/menu',{}, function (data) {
                if (data) {
                        this.logincode = data.operatorName;
                        //console.log(this.logincode)
                        var permissionList = data.userPermission;
                        localStorage.setItem('permissionList',JSON.stringify(permissionList));
                        var arr=new Array();
                        for(var j=0,len=permissionList.length;j<len;j++){
                            var s1=permissionList[j].substring(0,permissionList[j].indexOf(":"));
                            var s2=permissionList[j].substring(0,permissionList[j].lastIndexOf(":"));
                            if(arr.indexOf(s1) == -1){
                                arr.push(s1);
                            }
                            if(arr.indexOf(s2) == -1){
                                arr.push(s2);
                            }
                        }
                        console.log(arr)
                        var menu = menuTest;
                        var firstNode = null;
                        for (var i = 0, l1 = menu.length; i < l1; i++) {
                            
                            if (arr.indexOf(menu[i].code) != -1) {
                                if (firstNode == null) {
                                    firstNode = menu[i].code;
                                }
                                menu[i].visible = true;
                            } else {
                                menu[i].visible = false;
                            }
                             console.log(menu[i].children.length)
                            for (var j = 0, l2 = menu[i].children.length; j < l2; j++) {
                                //var count = 0;//当前分组无权限的子项数量
                                if (arr.indexOf(menu[i].children[j].code) != -1) {
                                         console.log(menu[i].children[j].code)
                                        menu[i].children[j].visible = true;
                                    } else {
                                        menu[i].children[j].visible = false;
                                        //count++;
                                }
                            }
                            
                        }
                        this.menuTree = menu;
                         console.log(this.menuTree)
                        if (this.currNavMenuCode == 'index') {
                            this.currNavMenuCode = firstNode;
                        }
                }
               
             }.bind(this));
        }
    
    },
    mounted(){
        this.handleData();
    }
    
}
</script>
<style scoped>
.loginName{

    text-align: center;
}
.logout-btn{
    margin-left: 10px;
}
.child-menu{
    line-height: 45px;
    min-height: 100%;
    text-align: center;
}
.child-menu .li{
    padding-left: 12px;
    cursor: pointer;
}
.child-menu .active {
    background: #d9d9d9;
        
}
.child-menu li:hover{
    background: #f2f2f2;
}
.child-menu a{
    color:#303133;
    width: 100%;
    display: block;
    text-decoration: none;
}
.m-page {
    flex: auto;
    /* 如果出现伸缩时有组件被遮住的问题，取消这个注释  overflow*/
    /* overflow: auto; */
     background: #f2f2f2;
    min-height: calc(100vh - 12px);
    width: 800px;
	padding-bottom:12px;
}

.m-page-trans {
    transition: all .2s cubic-bezier(.25, .1, .25, 1);
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.left-menu{
    margin-top:10px;
    text-align: center;
    width:180px;
    flex: 0 0 auto;
    background: #FFF;
    height: calc(100vh - 100px);
}


.menu-info {
        flex: 0 0 auto;
        background: #FFF;
        height: calc(100vh - 100px);
        overflow-y: scroll;
}
.menu-click-info {
        height: 56px;
        line-height: 56px;
        font-size: 13px;
        color: #303133;
        padding: 0 20px;
        cursor: pointer;
        border-bottom: 1px solid #d9d9d9;
    }
.menu-info .active {
    background-color: rgb(204, 200, 200);
}
</style>