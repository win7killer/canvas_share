<template></template>

<script>
import mixin from '../components/mixin.js'
import initAnimate from '../animation_frame_lock.js';
export default {
    mixins: [mixin],
    data() {
        return {
            deg: 0,
            translatePos: [0, 0]
        }
    },
    mounted() {
        // ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = 'rgba(0,0,0,.5)';
        this.drawRect(0, 0);

        // this.drawRect(100, 100);

        // this.translate(this.drawRect.bind(this, 0, 0, 300, 300), 100, 100);

        this.translate(this.drawRect.bind(this, -100, -100));

        this.rotate(this.drawRect.bind(this, -100, -100), 45);

        this.translate(this.rotate.bind(this, this.drawRect.bind(this, -100, -100)));

        this.rotate(this.translate.bind(this, this.drawRect.bind(this, -100, -100)));

        initAnimate(() => {
            this.initCan();
            this.translate(
                this.rotate.bind(
                    this, this.drawRect.bind(this, -100, -100), this.deg
                ),
                this.translatePos[0],
                this.translatePos[1]
            );
            this.deg += 2;
            this.translatePos[0] += 2;
            this.translatePos[1] += 1;
        }, {
            fpsLock: 60
        })

        // this.scale(this.drawRect.bind(this, 100, 100), 1, 1);

        // this.scale(this.drawRect.bind(this, 100, 300), 1, 1);
    },
    beforeDestroy() {
        cancelAnimationFrame(window.animationFrameId);
    },
    methods: {
        drawRect(x = 0, y = 0, w = 200, h = 200) {
            let {ctx, can} = this;
            ctx.save();
            ctx.fillRect(x, y, w, h);
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
        rotate(fn = () => {}, deg = 30) {
            let {ctx, can} = this;
            let x = can.width / 2;
            let y = can.height / 2;
            ctx.save();
            ctx.fillStyle = 'rgba(0, 255, 255, .5)';
            ctx.rotate(deg / 180 * Math.PI);
            fn.call(this);
            // ctx.rotate(-30 / 180 * Math.PI);
            ctx.restore();
        },
        scale(fn = () => {}, sx = 0.5, sy = 0.5) {
            let {ctx, can} = this;
            let x = can.width / 2;
            let y = can.height / 2;
            ctx.save();
            ctx.fillStyle = 'rgba(0, 255, 0, .5)';
            ctx.scale(sx, sy);
            fn.call(this);
            // ctx.rotate(-30 / 180 * Math.PI);
            ctx.restore();
        },
        // resetTransform() {
        //     // 坐标系还原
        //     context.setTransform(1, 0, 0, 1, 0, 0);
        // }
    }
}
</script>
