import type { ConfigPlugin } from '@expo/config-plugins'

import path from 'path'
import { withXcodeProject, withDangerousMod } from '@expo/config-plugins'
import { copyFolderRecursiveSync } from './util'

const withIosIndyFrameworkBinary: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'ios',
    (config) => {
      const projectRoot = config.modRequest.projectRoot
      const destIndyFramework = path.join(projectRoot, 'ios', 'Pods', 'Frameworks', 'Indy.framework')
      const srcIndyFramework = path.join(__dirname, '..', 'Frameworks', 'Indy.framework')
      copyFolderRecursiveSync(srcIndyFramework, destIndyFramework)

      return config
    },
  ])
}

const withIosIndyFrameworkInProject: ConfigPlugin = (config) => {
  return withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults

    // FIXME: should only be added once
    const destIndyFramework = path.join('Pods', 'Frameworks', 'Indy.framework')

    // If the build phase object is not present yet add it. It will fail otherwise
    const target = xcodeProject.getFirstTarget()
    if (!xcodeProject.pbxEmbedFrameworksBuildPhaseObj(target.uuid)) {
      xcodeProject.addBuildPhase([], 'PBXCopyFilesBuildPhase', 'Embed Frameworks', target.uuid, 'frameworks', undefined)
    }

    // Add the Indy.framework
    xcodeProject.addFramework(destIndyFramework, { sign: true, embed: true, customFramework: true, link: true })

    return config
  })
}

const withIosIndy: ConfigPlugin = (config) => {
  // 2. https://github.com/hyperledger/indy-sdk-react-native#ios
  const iosIndyFrameworkBinary = withIosIndyFrameworkBinary(config)

  // 4. https://github.com/hyperledger/indy-sdk-react-native#ios
  const iosIndyFrameworkInProject = withIosIndyFrameworkInProject(iosIndyFrameworkBinary)

  return iosIndyFrameworkInProject
}

export { withIosIndy }
