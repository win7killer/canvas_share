<template>
<div class="radar-box">

</div>
</template>

<script>
import mixin from '../components/mixin.js'
export default {
    mixins: [mixin],
    data() {
        return {
            list: [{
                    k: 'a',
                    num: 77,
                    text: '人际'
                },
                {
                    k: 'b',
                    num: 70,
                    text: '财力'
                },
                {
                    k: 'c',
                    num: 80,
                    text: '身高'
                },
                {
                    k: 'd',
                    num: 70,
                    text: '品味'
                },
                {
                    k: 'e',
                    num: 66,
                    text: '人品'
                },
                {
                    k: 'f',
                    num: 55,
                    text: '性格'
                },
                {
                    k: 'g',
                    num: 40,
                    text: '工作'
                },
                {
                    k: 'h',
                    num: 90,
                    text: '相貌'
                },
            ],
            radius: 400,
        };
    },
    computed: {
        deg() {
            let nums = this.list.length;
            let deg = Math.round(360 / nums);
            return deg;
        },
        points() {
            let {
                deg,
                list,
                radius
            } = this;
            let arr = [];
            let temp = 180;
            for (let i = 0, l = list.length; i < l; i++) {
                let x = Math.round(Math.sin(temp / 180 * Math.PI) * radius);
                let y = Math.round(Math.cos(temp / 180 * Math.PI) * radius);
                arr.push([x, y]);
                temp -= deg;
            }
            return arr;
        },
        dataPoints() {
            let {
                deg,
                list,
                radius
            } = this;
            let arr = [];
            let temp = 180;
            for (let i = 0, l = list.length; i < l; i++) {
                let max = list[i].num / 100 * radius;
                let x = Math.round(Math.sin(temp / 180 * Math.PI) * max);
                let y = Math.round(Math.cos(temp / 180 * Math.PI) * max);
                arr.push({
                    x,
                    y,
                    ...list[i]
                });
                temp -= deg;
            }
            return arr;
        }

    },
    mounted() {
        this.randerCtx();
    },
    methods: {
        randerCtx() {
            this.translate([this.drawBg, this.drawBgText, this.drawData, this.drawText]);
        },
        drawData() {
            const {
                ctx,
                dataPoints
            } = this;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
            for (let i = 1, l = dataPoints.length; i < l; i++) {
                let temp = dataPoints[i];
                ctx.lineTo(temp.x, temp.y);
            }
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#09f';
            ctx.fillStyle = 'rgba(100, 255, 100, 0.5)';
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        },
        drawText() {
            const {
                ctx,
                dataPoints,
                radius
            } = this;
            ctx.save();
            ctx.strokeStyle = '#f90';
            ctx.fillStyle = 'rgba(200, 100, 100, 1)';
            for (let i = 0, l = dataPoints.length; i < l; i++) {
                let temp = dataPoints[i];
                let text = temp.num;
                let w = ctx.measureText(text).width;
                let textParams = [text, temp.x * 0.9 - w / 2, temp.y * 0.9 - this.fontSize / 2];
                ctx.strokeText(...textParams);
                ctx.fillText(...textParams);
            }
            ctx.restore();
        },
        drawBgText() {
            const {
                ctx,
                points,
                list
            } = this;
            ctx.save();
            for (let i = 0, l = points.length; i < l; i++) {
                let text = list[i].text || '111';
                let w = ctx.measureText(text).width;
                ctx.fillStyle = '#f30';
                let textParams = [text, points[i][0] * 1.15 - w / 2, points[i][1] * 1.15 - this.fontSize / 2];
                // ctx.strokeText(...textParams);
                ctx.fillText(...textParams);
            }
            ctx.restore();
        },
        drawCircleLine(scale = 1) {
            const {
                ctx,
                points,
                list
            } = this;
            ctx.save();
            ctx.beginPath();
            let fn = 'moveTo';
            for (let i = 0, l = points.length; i < l; i++) {
                let [x, y] = points[i];
                ctx[fn](x * scale, y * scale);
                fn = 'lineTo';
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        },
        drawBg() {
            const {
                ctx,
                points,
                list
            } = this;
            ctx.save();
            for (let i = 1; i > 0; i -= 0.2) {
                this.drawCircleLine(i);
            }
            // 内部线条
            for (let i = 0, l = points.length; i < l; i++) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(...points[i]);
                ctx.stroke();
                ctx.closePath();
            }
            ctx.restore();
        },
        translate(callBacks = [], x = this.can.width / 2, y = this.can.height / 2) {
            let {
                ctx,
                can
            } = this;
            ctx.save();
            ctx.translate(x, y);
            callBacks.forEach(fn => {
                fn.call(this);
            })
            ctx.restore();
        },
        rotate(fn = () => {}, deg = 30) {
            let {
                ctx,
                can
            } = this;
            ctx.save();
            ctx.rotate(deg / 180 * Math.PI);
            fn.call(this);
            ctx.restore();
        },
    },

}
</script>

<style lang="less" scoped>

</style>
