import { defineComponent, ref } from "vue";
import Hls from 'hls.js';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Fieldset from 'primevue/fieldset';
import DataTable from 'primevue/datatable';
import VirtualScroller from 'primevue/virtualscroller';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const Monitor = defineComponent({
  render() {

    return (
      <div class="flex flex-column align-items-center">

        {/* top */}
        <div class="flex flex-row justify-content-center align-items-center border-round-sm shadow-2 bg-black-alpha-10 w-11">
          <span class="p-float-label m-5 w-9">
            <InputText id="videoSrc" class="inputfield w-full" type="text" v-model={this.videoSrc} />
            <label for="videoSrc"><span style="color: red;">*</span>HLS - Manifest URL</label>
          </span>
          <Button type="button"
            iconPos="right" icon="pi pi-play"
            class="flex-none mr-5" label="Load & Play"
            loading={this.loading} onClick={(_event) => {
              try {
                this.play()
              } catch (e) {
                console.error(e)
              }
            }} />
        </div>

        <div class="h-1rem"></div>

        {/* bottom */}
        <div class="flex flex-row w-11">
          {/* bottom - left */}
          <div class="w-full bg-black-alpha-10 border-round-sm shadow-2 flex flex-column align-content-start">
            <video id="player" class="w-full border-round-top-sm surface-400" muted controls />
          </div>
        </div>
      </div>
    )
  },

  setup() {

    const videoSrc = ref('');
    const loading = ref(false);
    const player = ref(undefined)

    const hlsjs = ref(undefined)

    const cachedHlsjsLevels = ref([])

    return {
      videoSrc, loading,
      hlsjs,
      player,
    }
  },

  mounted() {
    const queries = this.$route.query
    this.videoSrc = queries['url']
    if (!Hls.isSupported()) {
      console.log("`hls.js' is not supported.")
      return
    }
    this.player = document.getElementById('player')
    if (!this.player) {
      console.log('Unknown player!')
      return
    }

  },

  unmounted() {
    this.destroyHlsjs()
  },

  methods: {


    releasePlayerSource() {
      if (this.player) {
        this.player.pause();
        this.player.removeAttribute('src');
        this.player.load();
      }
    },

    hlsjsDefaults() {
      return {
        debug: true,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      }
    },


    newHlsjsInstance() {
      this.destroyHlsjs()
      this.hlsjs = new Hls(this.hlsjsDefaults())
    },
    destroyHlsjs() {
      if (this.hlsjs) {
        this.hlsjs.destroy()
        this.hlsjs = null
      }
      this.releasePlayerSource()
    },

    play() {
      if (!this.videoSrc) {
        console.log('Empty Manifest URL!')
        return
      }

      this.newHlsjsInstance()

      // handle error
      // this.hlsjs.on(Hls.Events.ERROR, (_event, data) => {
      //   console.warn("hls.js event error", data)
      //   if (data.fatal) {
      //     this.destroyHlsjs()
      //   }
      // })

      this.hlsjs.loadSource(this.videoSrc)
      this.hlsjs.attachMedia(this.player)
      this.player.play()
    },
  }
})

export default Monitor
