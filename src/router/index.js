import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import theme from '@/components/theme'
import cont from '@/components/cont'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
	    {
	        path: '/',
	        name: 'home',
	        component: home
	    },
	    {
	    	path: '/theme',
	    	name: 'theme',
	    	component: theme
	    },
	    {
	    	path: '/cont',
	    	name: 'cont',
	    	component: cont
	    },
	    {
	        path: '*',
	        redirect: '/'
	    }
    ]
})
