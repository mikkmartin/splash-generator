<template>
  <div id="container">

    <div class="editor-container">
      <div class="editor-content">
        <div class="padding">
          <h1>MyDrive splash screen generator</h1>
          <select @change="projectChange">
            <option value="harmonics" :selected="projectIsSelected('harmonics')">MyDrive Harmonics</option>
            <option value="connect" :selected="projectIsSelected('connect')">MyDrive Connect</option>
          </select>
          <br/>
          <br/>
        </div>
        <form method="post" :action="finalUrl" target="_blank">
        <div class="row" v-for="(item, i) in items" :key="i">
          <input v-if="item === picked" type="hidden" name="resolution" :value="item.width +'x'+ item.height +'@'+ item.scale + 'x'" />
          <input type="radio" :id="'o-'+i" name="res" :value="item" v-model="picked" />
          <label :for="'o-'+i">
            <span class="label">{{item.width +' x '+ item.height}} pt</span>
            <label :for="'check-'+i">x{{item.scale}}</label>
            <button type="submit" :disabled="!isSelected(item)">Generate</button>
          </label>
          </div>
        </form>
        <div class="new-resolution">
          <input type="number" min="320" max="5000" v-model="newResolution.width"/>
          x
          <input type="number" min="320" max="5000" v-model="newResolution.height"/>
          pt
          <input type="number" v-model="newResolution.scale" min="1" max="4"/>
          <button v-on:click="addResolution">Add</button>
        </div>
        <br/>
        <div class="padding align-right">
          <button type="submit" disabled>Generate all</button>
        </div>
      </div>
    </div>

    <iframe :style="{width: picked.width+'px', height: picked.height+'px'}" :src="'https://'+selectedProject.sourceUrl"></iframe>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    postUrl: process.env.NODE_ENV === 'development' ?
      `https://splash-generator.now.sh/screenshot/` :
      '/screenshot/',
    selectedProject: {},
    projects: [
      {name: 'harmonics', sourceUrl: 's.codepen.io/skorpa/debug/XojedQ'},
      {name: 'connect', sourceUrl: 's.codepen.io/skorpa/debug/QzxQJp'}
    ],
    picked: {width: 320, height: 568, scale: 2},
    items: [
      {width: 320, height: 568, scale: 2}, //iPhone SE
      {width: 568, height: 320, scale: 2},

      {width: 375, height: 667, scale: 2}, //iPhone 6,7,8
      {width: 667, height: 375, scale: 2},

      {width: 375, height: 812, scale: 3}, //iPhone X
      {width: 812, height: 375, scale: 3},

      {width: 1024, height: 768, scale: 1}, //old iPad
      {width: 768, height: 1024, scale: 1},

      {width: 1024, height: 768, scale: 2}, //iPad
      {width: 768, height: 1024, scale: 2},

      {width: 1024, height: 1366, scale: 2}, //iPad pro
      {width: 1366, height: 1024, scale: 2},

      {width: 1536, height: 2048, scale: 2}, //iPad pro
      {width: 2048, height: 1536, scale: 2},

      //Android devices...
      {width: 1080, height: 1920, scale: 2}, //some mobile android device?
      {width: 1920, height: 1080, scale: 2},

      {width: 1440, height: 2960, scale: 2}, //some mobile android device?
      {width: 2960, height: 1440, scale: 2},

      {width: 1440, height: 2560, scale: 2}, //some mobile android device?
      {width: 2560, height: 1440, scale: 2},

      {width: 720, height: 1280, scale: 2}, //some mobile android device?
      {width: 1280, height: 720, scale: 2},

      {width: 480, height: 854, scale: 2}, //some mobile android device?
      {width: 854, height: 480, scale: 2},

      {width: 1280, height: 800, scale: 2}, //some mobile android device?
      {width: 800, height: 1280, scale: 2},
    ],
    newResolution: {width: 800, height: 600, scale: 2}
  }),
  computed: {
    finalUrl: vm => `${vm.postUrl + vm.selectedProject.sourceUrl}?width=${vm.picked.width}&height=${vm.picked.height}&deviceScaleFactor=${vm.picked.scale}`
  },
  created () {
    this.readParams()
  },
  methods: {
    addResolution () {
      this.items.push(this.newResolution)
    },
    isSelected (item) {
      return this.picked === item
    },
    projectIsSelected (name) {
      return this.selectedProject.name === name
    },
    readParams () {
      if (this.$route.query.project) {
        this.setProject(this.$route.query.project)

      } else {
        this.setProject(this.projects[0].name)
      }
    },
    setProject (name) {
      this.selectedProject = this.projects.find(project => project.name === name)
    },
    projectChange (ev) {
      const selectedName = ev.srcElement.value
      this.setProject(selectedName)
      const query = Object.assign({}, this.$route.query)
      query.project = selectedName
      this.$router.replace({ query })
    }
  }
}
</script>

<style scoped>
#container {
  padding: 1rem;
}
.editor-container {
  position: fixed;
  height: 100vh;
  width: calc(270px + 6rem);
  padding: 3rem 0;
  left: 0;
  top: 0;
  background: white;
  overflow-y: auto;
}
.editor-content {
  padding-bottom: 5rem;
}
.padding {
  padding-left: 2rem;
  padding-right: 2rem;
}
.padding.align-right {
  display: flex;
  align-items: flex-end;
}
.padding.align-right button {
  margin-left: auto;
  width: 100%;
}
input[type=radio] {
  flex: 0;
}
label {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
}
.label {
  display: inline-block;
  width: 120px;
}
input[type=checkbox] {
  margin-left: 1rem;
}
.new-resolution {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}
.new-resolution > input {
  width: 50px;
}
button {
  margin-left: 2rem;
  width: 60px;
}
button[disabled] {
  opacity: .5;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: .1rem 2rem;
}
.row:nth-child(odd) {
  background: rgba(0,0,0,0.05);
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
