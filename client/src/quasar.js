import Vue from 'vue'

import 'quasar/dist/quasar.css'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import { Quasar, Notify, QPageScroller, Dialog } from 'quasar'

Vue.use(Quasar, {
  config: {
    notify: {
      /* Notify defaults */
    }
  },
  components: {
    QPageScroller
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {
    Notify,
    Dialog
  },
  iconSet: iconSet
})
