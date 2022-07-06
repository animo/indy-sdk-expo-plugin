import type { ConfigPlugin } from '@expo/config-plugins'

const pkg = require('../package.json')
import { createRunOncePlugin } from '@expo/config-plugins'

import { withAndroidIndy } from './withAndroidIndy'
import { withIosIndy } from './withIosIndy'

const withIndySdk: ConfigPlugin = (config) => {
  const androidIndy = withAndroidIndy(config)
  const iosIndy = withIosIndy(androidIndy)

  return iosIndy
}

export default createRunOncePlugin(withIndySdk, pkg.name, pkg.version)
