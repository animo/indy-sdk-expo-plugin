import type { ConfigPlugin } from '@expo/config-plugins'

import path from 'path'
import fs from 'fs/promises'
import { withDangerousMod } from '@expo/config-plugins'
import { mergeContents, MergeResults, removeContents } from '@expo/config-plugins/build/utils/generateCode'
import resolveFrom from 'resolve-from'

function isIndySdkReactNativeInstalled(projectRoot: string): string | null {
  const resolved = resolveFrom.silent(projectRoot, 'indy-sdk-react-native/package.json')
  return resolved ? path.dirname(resolved) : null
}

// We need to include the default pod source. By default it is registered implicitly,
// but if a custom source is specified, you need to specify it explicitly
const podSource = `source 'https://github.com/hyperledger/indy-sdk-react-native'
source 'https://cdn.cocoapods.org'`

/**
 * @param src
 * @returns
 */
export function addIndyCocoaPods(src: string): MergeResults {
  return mergeContents({
    tag: 'indy-sdk-expo-plugin',
    src,
    newSrc: podSource,
    anchor: /use_native_modules/,
    offset: 0,
    comment: '#',
  })
}

export function removeIndyCocoaPods(src: string): MergeResults {
  return removeContents({
    tag: 'indy-sdk-expo-plugin',
    src,
  })
}

const withIosIndyPodSource: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const filePath = path.join(config.modRequest.platformProjectRoot, 'Podfile')
      const contents = await fs.readFile(filePath, 'utf-8')
      let results: MergeResults

      // Only add the block if indy-sdk-react-native is installed in the project (best effort).
      // Generally prebuild runs after a yarn install so this should always work as expected.
      const indySdkReactNativePath = isIndySdkReactNativeInstalled(config.modRequest.projectRoot)

      if (indySdkReactNativePath) {
        try {
          results = addIndyCocoaPods(contents)
        } catch (error: any) {
          if (error.code === 'ERR_NO_MATCH') {
            throw new Error(
              `Cannot add indy-sdk-react-native to the project's ios/Podfile because it's malformed. Please report this with a copy of your project Podfile.`
            )
          }
          throw error
        }
      } else {
        // If the package is no longer installed, then remove the block.
        results = removeIndyCocoaPods(contents)
      }
      if (results.didMerge || results.didClear) {
        await fs.writeFile(filePath, results.contents)
      }
      return config
    },
  ])
}

const withIosIndy: ConfigPlugin = (config) => {
  // 1. https://github.com/hyperledger/indy-sdk-react-native#ios
  const indySdkInCocoaPods = withIosIndyPodSource(config)

  return indySdkInCocoaPods
}

export { withIosIndy }
