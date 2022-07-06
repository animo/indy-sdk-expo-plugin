import type { ConfigPlugin } from '@expo/config-plugins'

import { withProjectBuildGradle, withAppBuildGradle, withDangerousMod, withMainActivity } from '@expo/config-plugins'
import path from 'path'

import { copyFolderRecursiveSync, addJavaImports } from './util'

const gradleMaven = `allprojects { repositories { maven { url 'https://repo.sovrin.org/repository/maven-public' } } }`
const gradleApp = `dependencies { implementation 'net.java.dev.jna:jna:5.2.0' }`

const loadIndyAndroid = `
    try {
      Os.setenv("EXTERNAL_STORAGE", getExternalFilesDir(null).getAbsolutePath(), true);
      System.loadLibrary("indy");
    } catch (ErrnoException e) {
      e.printStackTrace();
    }`

const withAndroidIndyGradle: ConfigPlugin = (config) => {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      // Only add if not already present
      if (config.modResults.contents.indexOf(gradleMaven) === -1) {
        config.modResults.contents = config.modResults.contents + '\n' + gradleMaven
      }
    } else {
      throw new Error('Cannot add indy maven gradle because the build.gradle is not groovy')
    }
    return config
  })
}

const withAndroidAppIndyGradle: ConfigPlugin = (config) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      // Only add if not already present
      if (config.modResults.contents.indexOf(gradleApp) === -1) {
        config.modResults.contents = config.modResults.contents + '\n' + gradleApp
      }
    } else {
      throw new Error('Cannot add indy maven gradle because the build.gradle is not groovy')
    }
    return config
  })
}

const withAndroidIndyBinaries: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'android',
    (config) => {
      const projectRoot = config.modRequest.projectRoot
      const destJniLibsDir = path.join(projectRoot, 'android', 'app', 'src', 'main', 'jniLibs')
      const sourceJniLibsDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'jniLibs')
      copyFolderRecursiveSync(sourceJniLibsDir, destJniLibsDir)

      return config
    },
  ])
}

const withAndroidIndyMainActivity: ConfigPlugin = (config) => {
  return withMainActivity(config, (config) => {
    if (config.modResults.language === 'java') {
      let content = config.modResults.contents

      const imports = ['android.os.Bundle', 'android.system.ErrnoException', 'android.system.Os', 'java.io.File']
      content = addJavaImports(content, imports)

      // Only add if not already present
      if (content.indexOf(loadIndyAndroid) === -1) {
        const search = new RegExp('super.onCreate(.*);')

        content = content.replace(search, `$&\n${loadIndyAndroid}`)
      }

      config.modResults.contents = content
    } else {
      throw new Error('Cannot add indy main activity because the MainActivity file is not java')
    }
    return config
  })
}

const withAndroidIndy: ConfigPlugin = (config) => {
  // 2. https://github.com/hyperledger/indy-sdk-react-native#2-add-sovrin-maven-repository
  const androidIndyGradle = withAndroidIndyGradle(config)

  // 3. https://github.com/hyperledger/indy-sdk-react-native#3-add-jna-library-dependency
  const androidAppIndyGradle = withAndroidAppIndyGradle(androidIndyGradle)

  // 4. https://github.com/hyperledger/indy-sdk-react-native#4-add-android-libindy-binaries
  const androidIndyBinaries = withAndroidIndyBinaries(androidAppIndyGradle)

  // 5. https://github.com/hyperledger/indy-sdk-react-native#5-load-indy-library
  const androidIndyMainActivity = withAndroidIndyMainActivity(androidIndyBinaries)

  return androidIndyMainActivity
}

export { withAndroidIndy }
