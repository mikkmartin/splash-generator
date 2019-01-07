<template>
  <div id="container">

    <div class="editor">
      <h1>MyDrive splash screen generator</h1>
      <select>
        <option value="harmonics">MyDrive Harmonics</option>
        <option value="connect" disabled>MyDrive Connect</option>
      </select>
      <br/>
      <br/>
      <form method="post" :action="finalUrl" target="_blank">
      <div class="row" v-for="(item, i) in items" :key="i">
        <input v-if="item === picked" type="hidden" name="resolution" :value="item.width +'x'+ item.height" />
        <input type="radio" :id="'o-'+i" name="res" :value="item" v-model="picked" />
        <label :for="'o-'+i">
          <span class="label">{{item.width +'x'+ item.height}}</span>
          <input type="checkbox" :name="'check-'+i" checked>
          <label :for="'check-'+i">@2x</label>
          <button disabled>remove</button>
          <button type="submit">↓</button>
        </label>
        </div>
      </form>
      <a :href="finalUrl" target="_blank">get selected</a>
    </div>

    <iframe :style="{width: picked.width+'px', height: picked.height+'px'}" src="https://s.codepen.io/skorpa/debug/XojedQ/GnAnbNGPXypA"></iframe>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    postUrl: process.env.NODE_ENV === 'development' ?
      `https://splash-generator.now.sh/screenshot/` :
      '/screenshot/',
    picked: {width: 320, height: 568},
    items: [
      {width: 320, height: 568},
      {width: 750, height: 1334},
      {width: 1334, height: 750},
      {width: 1080, height: 1920},
      {width: 1920, height: 1080},
      {width: 1440, height: 2960},
      {width: 2960, height: 1440},
      {width: 1440, height: 2560},
      {width: 2560, height: 1440},
      {width: 720, height: 1280},
      {width: 1280, height: 720},
      {width: 640, height: 1136},
      {width: 1136, height: 640},
      {width: 1125, height: 2436},
      {width: 480, height: 854},
      {width: 854, height: 480},
    ]
  }),
  computed: {
    finalUrl: vm => `${vm.postUrl}s.codepen.io/skorpa/debug/XojedQ/GnAnbNGPXypA?width=${vm.picked.width}&height=${vm.picked.height}&deviceScaleFactor=2`
  }
}
</script>

<style scoped>
#container {
  padding: 1rem;
}
.editor {
  position: fixed;
  height: 100vh;
  width: 270px;
  padding: 3rem;
  left: 0;
  top: 0;
  background: white;
}
.label {
  display: inline-block;
  width: 100px;
}
input[type=checkbox] {
  margin-left: 1rem;
}
button[disabled] {
  opacity: .5;
}
iframe {
  resize: both;
  transition: all .35s;
  border: 0;
  margin-left: calc(270px + 6rem);
}
iframe:hover,
iframe:active {
  transition: all 0s;
}
</style>
