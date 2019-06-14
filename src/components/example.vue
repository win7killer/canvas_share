<template></template>

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
            let {ctx} = this;
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
