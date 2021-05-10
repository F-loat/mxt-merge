<template>
  <div class="wrapper">
    <div class="nes-btns">
      <label class="nes-btn">
        <span>选择文件</span>
        <input type="file" multiple ref="input" @input="dropFile" />
      </label>
      <button v-if="files.length" type="button" class="nes-btn is-primary" @click="exportFile">
        导出文件
      </button>
    </div>
    <div class="lists">
      <ul class="nes-list is-disc">
        <li v-for="file of files" :key="file.name">{{file.name}}.{{file.format}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { saveAs } from 'file-saver'
import type { File } from '../types'
import { merge } from '../utils'

const readFile: (f: any, e: any) => Promise<string> = (f, e) => new Promise((resolve) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    resolve(e?.target?.result?.toString() || '')
  }
  reader.readAsText(f, e)
})

export default defineComponent({
  setup() {
    const files = ref<File[]>([]);

    const dropFile = async (e: any) => {
      const cfiles = e?.target?.files
      for (let i = 0; i < cfiles.length; i += 1) {
        const source = await readFile(cfiles[i], 'gb2312')
        const format = cfiles[i].name.replace(/.*\./, '')
        const name = cfiles[i].name.replace(`.${format}`, '')
        files.value[i] = {
          raw: cfiles[i],
          source,
          format,
          name
        }
      }
    }

    const exportFile = () => {
      const file = files.value[0]
      const result = JSON.stringify(merge(files.value), null, 2)
      console.log(result)
      const blob = new Blob([result], { type: 'text/plain;charset=gb2312' });
      saveAs(blob, `${file.name}_merged.${file.format}`)
    }

    return {
      dropFile,
      exportFile,
      files
    }
  },
})
</script>

<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nes-btns {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.nes-btn input[type=file] {
  position: absolute;
  pointer-events: none;
  opacity: 0;
}

.choose-file {
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
