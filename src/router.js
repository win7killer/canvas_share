import Vue from 'vue'
import Router from 'vue-router'
import HelloCanvas from './components/HelloCanvas';

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/hellocanvas',
        name: 'hellocanvas',
        component: HelloCanvas
    }, {
        path: '/rect',
        name: 'rect',
        component: () => import('./components/Rect')
    }, {
        path: '/arc',
        component: () => import('./components/Arc')
    }, {
        path: '/multi',
        component: () => import('./components/Multi')
    }, {
        path: '/image',
        component: () => import('./components/Image')
    }, {
        path: '/translate',
        component: () => import('./components/Translate')
    }, {
        path: '/transform',
        component: () => import('./components/Transform')
    }, {
        path: '/radar',
        component: () => import('./components/Radar')
    }, {
        path: '/middle',
        component: () => import('./components/middle/Index')
    }, {
        path: '/math',
        component: () => import('./components/middle/Math')
    }]
});
