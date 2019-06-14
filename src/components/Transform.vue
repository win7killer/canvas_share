<template></template>

<script>
import mixin from '../components/mixin.js'
export default {
    mixins: [mixin],
    mounted() {
        this.demo1();
    },
    methods: {
        demo1() {
            let {ctx, can} = this;
            let x = can.width / 2;
            let y = can.height / 2;
            console.log(x, y)
            this.transform(1, 2, 1, 1, x, y)
        },
        // transform(xscala,yskew,xskew,yscala,xtranslate,ytranslate)
        transform(...args) {
            let {ctx, can} = this;
            let x = can.width / 2;
            let y = can.height / 2;
            console.log(args)
            ctx.save();
            ctx.transform(...args);
            ctx.fillRect(-100, -100, 200, 200);
            // ctx.translate(-x, -y);
            ctx.restore();
        },
        translate(fn = () => {}, x = this.can.width / 2, y = this.can.height / 2) {
            let {ctx, can} = this;
            ctx.save();
            ctx.fillStyle = 'rgba(255, 0, 0, .5)';
            ctx.translate(x, y);
            fn.call(this);
            // ctx.translate(-x, -y);
            ctx.restore();
        },
        resetTransform() {
            // 坐标系还原
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}
</script>
