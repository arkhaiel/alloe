import { visit } from 'unist-util-visit'
import { useDateFormat } from '@vueuse/core'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file) => {
    console.log(file);
    console.log('next');
    
    
    if (file._id.endsWith('.md') && file.date) {
      file.body.children = file.body.children.slice(0,1).concat([{ type: 'element', tag: 'p', props: { class: 'date text-center mt-0' }, children: [{ type: 'text', value: useDateFormat(file.date, 'DD-MM-YYYY').value }]}], file.body.children.slice(1))
    }
  })
})

