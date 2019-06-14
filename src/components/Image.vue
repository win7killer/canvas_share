<template>
<div>
    <img :src="imgLogo" ref="imgDom" alt="" width=200 height=200>
    <div class="css-img" ref="cssImg"></div>
    <video v-if="videoSrc" ref="video" class="video" autoplay loop :src="videoSrc" width=150 height=200></video>
</div>
</template>

<script>
import mixin from '../components/mixin';
import imgLogo from '@/assets/logo.png';
import catImg from '@/assets/cat_1.jpg';
import video from '@/assets/video.mp4';
import initAnimate from '../animation_frame_lock.js';

export default {
    mixins: [mixin],
    data() {
        return {
            imgLogo,
            videoSrc: '',
            animateRes: {
                id: ''
            }
        }
    },
    mounted() {
        // console.log(this.$refs.imgDom)
        // this.$refs.imgDom.onload = () => {
        //     this.drawImage(this.$refs.imgDom, 100, 0);
        //     this.drawImage(this.$refs.imgDom, 200, 200, 200, 200);
        //     this.drawImage(this.$refs.imgDom, 50, 50, 200, 200, 500, 500, 600, 300);
        // }
        // 离屏图片
        // this.offScrenImg();
        // video
        // this.drawVideo();
        // this.drawVideoLoop();
        // canvas
        this.drawCssImg();

    },
    beforeDestroy() {
        window.cancelAnimationFrame(window.animationFrameId)
        this.initCan();
    },
    methods: {
        offScrenImg() {
            let img = new Image();
            img.src = catImg;
            img.onload = () => {
                this.drawImage(img, 600, 0);
            }
        },
        drawCssImg() {
            let img = this.$refs.cssImg;
            this.drawImage(img, 600, 0);
        },
        drawVideo() {
            this.videoSrc = video;
            this.$nextTick().then(() => {
                this.$refs.video.onplay = () => {
                    this.drawImage(this.$refs.video, 0, 0);
                }
            })
        },
        drawVideoLoop() {
            this.videoSrc = video;
            this.$nextTick().then(() => {
                this.$refs.video.onplay = () => {
                    initAnimate(() => {
                        this.drawImage(this.$refs.video, 0, 0);
                    })
                }
            })
        },
        drawImage(...args) {
            let {ctx} = this;
            ctx.save();
            ctx.drawImage(...args);
            ctx.restore();
        },

    }
}
</script>

<style lang="less" scoped>
.video {
    position: fixed;
    top: 200px;
    left: 50%;
    margin-left: -600px;
}
.css-img {
    width: 100px;
    height: 100px;
    background: url("~@/assets/logo.png");
    background-size: cover;
}
</style>
