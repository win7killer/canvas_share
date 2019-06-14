const dpr = 1 || window.devicePixelRatio;
const mixin = {
    data () {
        return {
            can: null,
            ctx: null,
            fillStyle: '#000',
            strokeStyle: '#000',
            fontSize: 40,
            fontFamily: 'Consolas',
            fontBaseline: 'top',
            dpr: dpr,
            lineWidth: 1 * dpr,
        }
    },
    mounted () {
        this.can = this.$root.can;
        window.ctx = this.ctx = this.$root.ctx;
        this.initCan();
    },
    computed: {
        font () {
            return `${this.fontSize * this.dpr}px ${this.fontFamily}`;
        }
    },
    beforeDestroy () {
        this.initCan();
    },
    methods: {
        initCan () {
            let {
                can,
                ctx,
                fillStyle,
                strokeStyle,
                font,
                fontBaseline,
                lineWidth,
            } = this;
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.font = font;
            ctx.textBaseline = fontBaseline;
            ctx.lineWidth = lineWidth;
            ctx.clearRect(0, 0, can.width, can.height);
        },
    }
};

export default mixin;
