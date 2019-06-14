<template>
<div>
    <div class="wrap">
        <canvas id="canImage" class="canImage" width="800" height="600"></canvas>
        <canvas class="canPaint" id="canPaint" width="800" height="600"></canvas>
    </div>
    <div class="change">
        <a href="javascript:;" class="draw">涂一涂</a>
        <a href="javascript:;" class="clear">擦一擦</a>
        <a href="javascript:;" class="scrape">刮一刮</a>
    </div>
</div>
</template>

<script>
import mixin from '../components/mixin.js'
export default {
    mixins: [mixin],
    mounted() {

        this.drawRect({
            type: 'stroke',
            color: '#f90'
        });

    },
    methods: {
        drawRect({
            type = 'fill',
            color = 'rgba(200, 0, 0, .5)',
            nums = [0, 0, 100, 100]
        } = {}) {
            let {
                ctx
            } = this;
            // ctx.closePath();
            ctx.save();
            ctx[type + 'Style'] = color;
            ctx[type + 'Rect'](...nums);
            // ctx.closePath();
            ctx.restore();
        },
    }
}
</script>
