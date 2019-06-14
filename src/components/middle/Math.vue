<template>

</template>

<script>
import mixin from '../../components/mixin.js'
import initAnimate from '../../animation_frame_lock.js';

export default {
    mixins: [mixin],
    mounted() {
        this.mathSin();
        // this.arcLoop();
    },
    computed: {
        half() {
            const {
                can
            } = this;
            return {
                w: can.width / 2,
                h: can.height / 2
            }
        }
    },
    beforeDestroy() {
        cancelAnimationFrame(this.animateId);
        this.initCan();
    },
    methods: {
        mathSin() {
            const {
                ctx,
                can
            } = this;
            this.posXY();

        },
        arcLoop() {
            let r = 10;
            let reg = 0;
            let px = 0;
            const {
                ctx,
                can,
                half
            } = this;
            ctx.save();

            this.animateId = initAnimate(() => {
                ctx.save();
                ctx.strokeStyle = 'rgba(255, 0, 255, .2)';
                ctx.translate(half.w, half.h);
                ctx.rotate(reg / 180 * Math.PI);
                ctx.beginPath();
                ctx.arc(r, r, px, 0, 2 * Math.PI);
                ctx.stroke();
                reg += 1;
                px += 1;
                r += 1;
                ctx.restore();
            })
            // while (reg < 360) {
            //     ctx.beginPath();
            //     ctx.arc(r, 0, r, 0, 2 * Math.PI);
            //     ctx.stroke();
            //     reg += 1;
            //     // r += 0.2;
            //     ctx.rotate(1 / 180 * Math.PI);
            // }
            ctx.restore();
        },
        sinLine() {
            const {
                ctx,
                can,
                half
            } = this;
            let t = 0;
            let r = 300;
            let reg = 90;
            let val = 1;
            ctx.save();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            // ctx.translate(0, half.h);
            // ctx.translate(half.w, half.h);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            // x * x + y * y = r * r
            while (t < can.width) {
                let x = Math.sin(reg / 180 * Math.PI) * r;
                let temp = Math.sqrt(r * r - x * x);
                if (temp === 0) {
                    val = -1 * val;
                }
                let y = temp * val;
                ctx.lineTo(t, y);
                t += 1;
                reg = (reg + 1);

            }
            ctx.stroke();
            ctx.restore();

        },
        posXY() {
            const {
                ctx,
                can,
                half
            } = this;

            ctx.save();
            // ctx.translate(half.w, half.h);
            ctx.translate(100, half.h);

            ctx.beginPath();
            ctx.moveTo(-half.w, 0);
            // ctx.lineTo(half.w, 0);
            ctx.lineTo(can.width, 0);

            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, -half.h);
            ctx.lineTo(0, half.h);
            ctx.stroke();

            this.sinLine();
            ctx.restore();
        }
    }
}
</script>
