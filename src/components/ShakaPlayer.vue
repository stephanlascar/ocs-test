<template>
    <div class="shaka-player">
        <video ref="video" controls autoplay></video>
    </div>
</template>

<script>
    import shaka from 'shaka-player';

    export default {
        name: 'ShakaPlayer',
        props: ['video'],
        mounted() {
            console.log('[ShakaPlayer] - init');
            console.log('[ShakaPlayer] - version:', shaka.Player.version);
            console.log('[ShakaPlayer] - isBrowserSupported:', shaka.Player.isBrowserSupported());
            shaka.polyfill.installAll();

            const player = new shaka.Player(this.$refs.video);
            player.load("https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd").then(() => {

            }).catch((err) => {
                console.error('[ShakaPlayer] - error ', err);
            });
        },
    }
</script>

<style>
    .shaka-player {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
        z-index: 2000;
    }

    video {
        min-width: 100%;
        min-height: 100%;
    }
</style>