<template>

</template>

<script>
import mixin from './mixin.js';
export default {
    mixins: [mixin],
    data() {
        return {
            line3: [[100, 100], [200, 200], [0, 200]],
            line4: [[300, 300], [400, 400], [300, 500], [200, 400]],
            line5: [[500, 300], [600, 400], [500, 500], [400, 400], [400, 300]],
            line8: [[800, 200], [830, 270], [900, 300], [830, 330], [800, 400], [770, 330], [700, 300], [770, 270]]
        }
    },
    mounted() {
        // 三角形
        this.drawShape(this.line3);
        // 四边形
        this.drawShape(this.line4);
        // 五边形
        this.drawShape(this.line5);
        // 内六边形
        this.drawShape(this.line8);
    },
    methods: {
        drawShape(points = []) {
            let {ctx} = this;
            ctx.save();
            ctx.strokeStyle = '#f00';
            ctx.beginPath();
            ctx.moveTo(...points.shift());
            while (points.length) {
                ctx.lineTo(...points.shift());
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
    }
}
</script>
