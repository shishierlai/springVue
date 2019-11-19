import Vue from 'vue';
import Vuex from 'vuex'
//router 标题

import routerTitle from 'vue-wechat-title'
import Menu from './munu/menu.vue';

const install ={
    install:function(Vue){
        Vue.use(Vuex);
        //mui专用的 store
        var store = new Vuex.Store({
            state:{
                queryParamCache:{

                }
            },
            mutations:{
                queryParamCache:function(state,{key,params}){
                    state.queryParamCache[key] = params;
                }
            },
            actions:{
                queryParamCache:function(context,{key,params}){
                    context.commit('queryParamCache',{key,params});
                }
            }
        });
        Vue.prototype.$sui_store = store;
        
        Vue.use(routerTitle);
        Vue.component('s-menu',Menu);

    }
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install
// export {
//     install,
//     QueryPanel,
//     QueryItem,
//     Card,
//     CardSub,
//     CardItem,
//     Button,
//     ButtonGroup,
//     ButtonGroupSub,
//     Top
// }
