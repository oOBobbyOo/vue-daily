<template>
    <div class="theme">
    	<div class="loading" v-if="!list">
    		<span class="left"></span>
        	<span class="middle"></span>
        	<span class="right"></span>
    	</div>
    	<div v-else>
    		<div class="des">
    			<img :src="list.image">
    			<div></div>
    			<h3>
    			<p>{{list.description}}</p>
    			<p>{{list.name}}</p>
    		</h3>
    		</div>
    		<div class="list">
    			<div class="list-con" link @click="go(y.id)" v-for="y in list.stories">
    				<img v-if="y.images" :src="y.images[0]" />
    				<p>{{y.title}}</p>
    			</div>
    		</div>
    	</div>
    	<back-scroll :scroller="scroller" :flag="circle"></back-scroll>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '../api/index'
import backScroll from './backScroll'

export default {
    computed: {
		...mapState({
			flag: state => state.num,
			circle: state => state.circleFlag
		})
	},
	mounted: function() {
		this.getList();
		this.scroller = this.$el;
	},
	activated: function() {
		let vue = this;
	},
	data() {
		return {
			list: "",
			scroller:window
		}
	},
	watch: {
		flag: function() {
			this.getList();
		}
	},
	methods: {
		go(id) {
			this.$router.push({
				path: "cont",
				query: {
					id: id
				}
			});
		},
		getList() {
			let vue = this;
			this.list = "";
			api.getTopicsById(this.$route.query.id).then(function(data) {
				vue.list = data.data;
				let dom = document.querySelector('.app-view');
				dom.scrollTop = 0;
			})
		}
	},
    components: {
        'back-scroll': backScroll 
    }
}
</script>
<style lang="scss" scoped>
$yellow: #FFD300;
$blue: #5B7492;
$gray: #acb9c8;
.des {
    height: 8rem;
    position: relative;
	overflow: hidden;
    div {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        position: absolute;
        background-color: $blue;
    }
    img {
        width: auto;
        height: 8rem;
        left: 50%;
        transform: translate(-50%,0);
        position: relative;
    }
	h3,p{
		margin: 0;
	}
    h3 {
        width: 70%;
        color: #fff;
        font-size: 0.5rem;
        line-height: 1rem;
        right: 5%;
        bottom: 1.5rem;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
        p:first-child {
            position: relative;
            margin-bottom: 0.5rem;
            &:before {
                content: "";
                width: 3rem;
                bottom: -.3rem;
                right: 0;
                display: block;
                position: absolute;
                border: 2px solid $yellow;
            }
        }

    }
}
.list {
    margin-top: -.5rem;
}
</style>
