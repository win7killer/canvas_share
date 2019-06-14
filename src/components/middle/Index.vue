<template>
<div>
    <img :src="imgSrc" width=400 ref="img" alt="11">
</div>
</template>

<script>
import mixin from '@/components/mixin.js'
import imgSrc from '@/assets/3.png';
export default {
    mixins: [mixin],
    data() {
        return {
            imgSrc: '',
        }
    },
    mounted() {

        this.radiusRect({
            x: 100,
            y: 100
        });

        // this.radiusRectByRotate({
        //     x: 500, y: 500, w: 300, h: 300, r: 50
        // })

        // this.starOdd(5);

        // this.initStarBg(this.starOddBg.bind(this, 5));

    },
    methods: {
        initStarBg(fn) {
            this.imgSrc = imgSrc;
            console.log(this.$refs, 1111)
            this.$refs.img.onload = () => {
               fn();
            }
        },
        radiusRect({
            w = 100,
            h = 100,
            x = 0,
            y = 0,
            r = 20
        } = {}) {
            const {
                ctx
            } = this;

            const {
                x0 = x,
                x1 = x + r,
                x2 = x + w - r,
                x3 = x + w,
                y0 = y,
                y1 = y + r,
                y2 = y + h - r,
                y3 = y + h
            } = {};

            ctx.save();

            ctx.moveTo(x1, y0);

            ctx.beginPath();

            ctx.lineTo(x2, y0);
            ctx.arcTo(x3, y0, x3, y1, r);

            ctx.lineTo(x3, y2);
            ctx.arcTo(x3, y3, x2, y3, r);

            ctx.lineTo(x1, y3);
            ctx.arcTo(x0, y3, x0, y2, r);

            ctx.lineTo(x0, y1);
            ctx.arcTo(x0, y0, x1, y0, r);

            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            ctx.restore();
        },
        radiusRectByRotate({
            w = 100,
            h = 100,
            x = 0,
            y = 0,
            r = 20
        } = {}) {
            const {
                tx1 = - w / 2 + r,
                tx2 = w / 2 - r,
                tx3 = w / 2,
                ty0 = - h / 2,
                ty1 = - h / 2 + r
            } = {};
            ctx.save();
            ctx.fillStyle = 'rgba(200, 0, 0, .5)'
            ctx.translate(x + w / 2, y + h / 2);
            ctx.moveTo(tx1, ty0);

            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                ctx.rotate( 90 / 180 * Math.PI);
                ctx.lineTo(tx2, ty0);
                ctx.arcTo(tx3, ty0, tx3, ty1, r);
            }
            ctx.closePath();

            ctx.stroke();
            ctx.fill();

            ctx.restore();
        },
        starOdd(corner = 5) {
            let {ctx, can} = this;
            ctx.save();
            let x = 300;
            let y = Math.tan(Math.PI * 180 / corner / 2 / 180) * x;
            ctx.translate(can.width / 2, can.height / 2);
            ctx.fillStyle = 'rgb(251, 234, 0)';
            ctx.beginPath();
            ctx.moveTo(-x, -y);
            for (let i = 0; i < corner; i++) {
                ctx.rotate((180 - 180 / corner) / 180  * Math.PI);
                ctx.lineTo(-x, -y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        },
        starOddBg(corner) {
            let {ctx, can} = this;
            let pattern = this.getParrentBg(2);
            ctx.save();
            let x = 300;
            let y = Math.tan(Math.PI * 180 / corner / 2 / 180) * x;

            ctx.translate(can.width / 2, can.height / 2);

            ctx.fillStyle = pattern;
            ctx.beginPath();
            ctx.moveTo(-x, -y);
            for (let i = 0; i < corner; i++) {
                ctx.rotate((180 - 180 / corner) / 180  * Math.PI);
                ctx.lineTo(-x, -y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        },
        getParrentBg(type) {
            let {ctx, can} = this;
            let pattern;
            ctx.save();
            if (type === 1) {
                pattern = ctx.createPattern(this.$refs.img, '')
            } else if (type === 2) {
                pattern = ctx.createLinearGradient(0, 0, 200, 200);
                this.getGradient(pattern);
            } else {
                // ctx.translate(can.width / 2, can.height / 2);
                pattern = ctx.createRadialGradient(0, 0, 0, 0, 0, 200);
                this.getGradient(pattern);
            }
            ctx.restore();
            return pattern;
        },
        getGradient(pattern) {
            let arr = [
                [255, 0, 0],
                [255, 165, 0],
                [255, 255, 0],
                [0, 255, 0],
                [0, 127, 255],
                [0, 0, 255],
                [139, 0, 255],
            ];

            arr.forEach((item, index) => {
                pattern.addColorStop(index / 6, `rgb(${item.join()})`);
            })
        }
    }
}
</script>

<style lang="less" scoped>
.a {
    background-color: rgb(251, 234, 0);
}
</style>
