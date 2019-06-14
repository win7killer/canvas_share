<template>

</template>

<script>
import mixin from './mixin.js';
export default {
    mixins: [mixin],
    mounted() {
        //圆
        this.drawArc({
            arcArgs: [200, 200, 100, 0, Math.PI * 2]
        });
        //圆
        this.drawArc({
            arcArgs: [400, 200, 100, 0, Math.PI * 2],
            type: 'stroke'
        });
        // 半圆
        this.drawArc({
            arcArgs: [600, 200, 100, 0 / 180 * Math.PI, Math.PI],
            color: '#09f'
        });
        // 切圆
        this.drawArc({
            arcArgs: [200, 400, 100, 0 / 180 * Math.PI, 120 / 180 * Math.PI],
            color: '#09f'
        });
        // 扇形
        this.drawArcShape({
            arcArgs: [400, 400, 100, 0 / 180 * Math.PI, 120 / 180 * Math.PI],
            color: '#f90',
        });
        // 椭圆
        this.drawEllipse();
    },
    methods: {
        drawEllipse() {
            let {ctx} = this;
            ctx.save();
            ctx.beginPath();
            this.ctx.ellipse(300, 700, 200, 40, Math.PI / 4, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawArc({
            arcArgs = [],
            type = 'fill',
            color = '#ccc',
        } = {}) {
            let {ctx} = this;
            ctx.save();
            ctx.beginPath();
            ctx[type + 'Style'] = color;
            ctx.arc(...arcArgs);
            ctx.closePath();
            ctx[type]();
            ctx.restore();
        },
        drawArcShape({
            arcArgs = [],
            type = 'fill',
            color = '#ccc',
        } = {}) {
            let [x, y, r, s, e] = arcArgs;
            let {ctx} = this;
            ctx.save();
            ctx.beginPath();
            ctx[type + 'Style'] = color;
            ctx.moveTo(x, y);
            ctx.lineTo(x + r, y);
            ctx.arc(...arcArgs);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx[type]();
            ctx.restore();
        }
    }
}
</script>
