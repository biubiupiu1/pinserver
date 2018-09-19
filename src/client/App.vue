<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {

            }
        },
        created() {
            this.setRem();
        },
        methods: {
            setRem() {
                let rem = document.body.clientWidth / 1000;
                document.documentElement.style.fontSize = rem + "px";
            }
        }
    }
</script>

<style>
  body, html {
    width: 100%;
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  .center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .centerX {
    left: 50%;
    transform: translate(-50%, 0);
  }

  .centerY {
    top: 50%;
    transform: translate(0, -50%);
  }
</style>
