<template></template>

<script>
import mixin from '../components/mixin.js'
export default {
    mixins: [mixin],
    data() {
        return {
            linePathes: [],
            // eventType: 'click',
            eventType: 'mousemove',
            pointInType: 'isPointInPath',
            // pointInType: 'isPointInStroke',

        };
    },
    computed: {

    },
    mounted() {
        this.ctx.save();
        this.bornLinePathes();
        this.bindEvent();
        this.ctx.fillStyle = 'rgba(200, 0, 200, .5)';
        this.ctx.lineWidth = 10;
        this.paintLine();
    },
    beforeDestroy() {
        this.unBindEvent();
        this.ctx.restore();
    },
    methods: {
        paintLine() {
            this.linePathes.forEach(item => {
                item(this.strokenPath.bind(this));
            })
        },
        strokenPath() {
            let {ctx, can} = this;
            ctx.stroke();
        },
        bornLinePathes() {
            let {linePathes = []} = this;
            linePathes.push(this.atcPath.bind(this, {x: 100, y: 100, r: 50}));
            linePathes.push(this.atcPath.bind(this, {x: 200, y: 100, r: 50}));
            linePathes.push(this.atcPath.bind(this, {x: 300, y: 100, r: 50}));
            linePathes.push(this.atcPath.bind(this, {x: 400, y: 100, r: 50}));
        },
        atcPath({
            x, y, r, anticlockwise = false
        }, fn = () => {}) {
            let {ctx, can} = this;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            fn();
            ctx.restore();
        },
        bindEvent() {
            this.can.addEventListener(this.eventType, this.handleClick);
        },
        unBindEvent() {
            this.can.removeEventListener(this.eventType, this.handleClick);
        },
        handleClick(e) {
            let {can, ctx} = this;
            let domRect = can.getBoundingClientRect();
            let x = e.clientX - domRect.x;
            let y = e.clientY - domRect.y;
            ctx.clearRect(0, 0, can.width, can.height);
            this.linePathes.forEach(item => {
                item(this.inPathAction.bind(this, {x, y}, item, e.type));
            })
        },
        inPathAction({x = 0, y = 0}, pathItem, eType) {
            let {can, ctx, dpr} = this;
            let isIn = ctx[this.pointInType](x * dpr , y * dpr );
            if (isIn) {
                if (!pathItem.acted) {
                    ctx.fill();
                    ctx.stroke();
                } else {
                    ctx.stroke();
                }
                if (eType === 'click') {
                    pathItem.acted = !pathItem.acted;
                }
            } else if (pathItem.acted) {
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.stroke();
            }
        },
    }
}
</script>
