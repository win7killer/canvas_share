<template></template>
<script>
import mixin from '../components/mixin.js'
const dpr = 2;
export default {
    mixins: [mixin],
    data () {
        return {
            // width: 500 * dpr,
            // height: 500 * dpr,
            // font: `${48 * dpr}px Consolas`,
            // lineWidth: 1 * dpr,
            dpr: dpr,
            // can: null,
            // ctx: null,
            // fillStyle: '#000'
        };
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            // this.can = this.$root.can;
            // this.ctx = this.$root.ctx;
            console.log(this.$root, this.$root.ctx)
            // this.initCan();
            this.drawText();
            this.drawRect();
            this.drawArc();
            this.drawLine()
            this.drawArc();
        },

        drawText() {
            let {ctx} = this;
            ctx.save();
            ctx.fillText('hello canvas', 0, 10);
            ctx.restore();
        },
        drawRect() {
            let {ctx} = this;
            ctx.save();
            ctx.fillStyle = 'rgba(200, 0, 0, .5)';
            ctx.fillRect(100, 100, 200, 200);
            ctx.restore();
        },
        drawArc() {
            let {ctx} = this;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = 'rgba(100, 200, 200, .5)';
            ctx.arc(300, 300, 100, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawLine() {
            let {ctx} = this;
            let points = [[400, 400], [500, 500], [400, 500], [400, 600], [500, 700]];
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(...points.shift());
            while (points.length) {
                ctx.lineTo(...points.shift());
            }
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    flex: 1;
}

</style>
