// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

Vue.use( Vuex )

Vue.config.productionTip = false

const store = new Vuex.Store({
	state: {
		num: 1,
		drawer: false,
		circleFlag: false
	},
	mutations: {
		add: ( state, n ) => state.num = n,
		back( state, n ) {
			if ( n ) {
				state.drawer = false
			} else {
				state.drawer = true
			}
		},
		toggle( state, n ) {
			if ( n ) {
				state.circleFlag = true
			} else {
				state.circleFlag = false
			}
		}
	}
} )

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

let indexScrollTop = 0;
let dom = document.querySelector( '.app-view' );
router.beforeEach( ( to, from, next ) => {
	if ( to.path == '/cont' ) {
		dom = document.querySelector( '.app-view' );
		indexScrollTop = dom.scrollTop;
		store.commit( 'back' );
	} else {
		store.commit( 'back', 1 );
	}
	store.commit( 'toggle' );
	next()
} )
router.afterEach( ( to, from, next ) => {
	if ( to.path == '/cont' ) {
		dom.scrollTop = 0;
	} else {
		Vue.nextTick( () => {
			dom.scrollTop = indexScrollTop;
		} );
	}
} );