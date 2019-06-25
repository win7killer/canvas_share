<template>
<div id="app">
    <div id="nav">
        <router-link v-for="item of routerCfg" :key="item.path" class="nav-item" :to="item.path">
            {{item.name || item.path.substr(1)}}
        </router-link>
        <br>
        <br>
        <a href="/text_rain.html" class="nav-item">text_rain</a>
        <a href="/paint.html" class="nav-item">paint</a>
        <a href="/line.html" class="nav-item">line</a>
        <a href="/au.html" class="nav-item">au</a>
        <a href="/draw.html" class="nav-item">draw</a>
    </div>
    <canvas class="canvas" ref="can" :width="width" :height="height" :style="{
        width: styleWidth,
        height: styleHeight
    }"></canvas>
    <div class="com-box">
        <router-view v-if="isMoutend" />
    </div>
</div>
</template>

<script>
const dpr = 1;
import routers from './router';


export default {
    data () {
        return {
            isMoutend: false,
            width: 800 * dpr,
            height: 600 * dpr,
            can: null,
            ctx: null,
            dpr,
            // routers,
        };
    },
    computed: {
        styleWidth() {
            return this.width / dpr + 'px';
        },
        styleHeight() {
            return this.height / dpr + 'px';
        },
        routerCfg() {
            return this.$router.options.routes || [];
        }
    },
    mounted() {
        console.log(111)
        console.log(this);
        this.$root.can = this.can = this.$refs.can;
        this.$root.dpr = this.dpr;
        this.$root.ctx = this.ctx = this.can.getContext('2d');
        this.isMoutend = true;
    }
}
</script>


<style lang="less">
html,
body {
    margin: 0 0;
    padding: 0 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #efefef;
    min-height: 100vh;
    display: flex;
    padding: 30px 20px;
}
#nav {
    padding: 20px;
    width: 100px;
    .nav-item {
        display: block;
        font-weight: bold;
        color: #2c3e50;
        text-align: left;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.canvas {
    margin: 0px auto;
    background-color: #fff;
}

.com-box {
    width: 300px;
}
</style>
