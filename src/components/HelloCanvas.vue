<template>
<div>
    文字 <textarea type="text" rows="5" cols="30" v-model="inputVal" placeholder="输入文字"></textarea>
</div>
</template>

<script>
import mixin from '../components/mixin.js'

export default {
    mixins: [mixin],
    data() {
        return {
            fontSize: 60,
            fontFamily: 'Consolas',
            inputVal: 'hello canvas'
        }
    },
    mounted() {
        this.drawText();
        this.drawTextBr(this.inputVal);
    },
    watch: {
        inputVal(newVal) {
            this.initCan();
            this.drawTextBr(this.inputVal);
        }
    },
    methods: {
        drawText(text = 'hello canvas') {
            let {ctx} = this;
            ctx.save();
            ctx.fillText(text, 0, 0, 300);
            ctx.restore();
        },
        drawTextBr(text = 'hello canvas') {
            let {ctx} = this;
            ctx.save();
            // console.log(ctx)
            this.wrapText(text, 20, 200, 800);
            ctx.restore();
        },
        wrapText(text, x, y, width) {
            let {ctx} = this;
            let str = '';
            let arr = [];
            let lineHeight = this.fontSize * 1.4;
            this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            let maxWidth = Math.min(ctx.canvas.width - x, width);
            for (let i = 0; i < text.length; i++) {
                str += text[i];
                let w = ctx.measureText(str).width;
                if (w >= maxWidth) {
                    arr.push(str);
                    str = '';
                }
            }
            arr.push(str);
            // console.log(maxWidth, arr, this.ctx.font);
            let top = y;
            arr.forEach(item => {
                // console.log(item, x, top)
                ctx.fillText(item, x, top);
                top += lineHeight;
            });
        }
    }
}
</script>
