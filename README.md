<p align="center">
  <picture>
   <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656578320/animo-logo-light-no-text_ok9auy.svg">
   <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656578320/animo-logo-dark-no-text_fqqdq9.svg">
   <img alt="Animo Logo" height="200px" />
  </picture>
</p>

<h1 align="center" ><b>Indy SDK Expo Plugin</b></h1>

<h4 align="center">Powered by &nbsp; 
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656579715/animo-logo-light-text_cma2yo.svg">
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656579715/animo-logo-dark-text_uccvqa.svg">
    <img alt="Animo Logo" height="12px" />
  </picture>
</h4><br>

<p align="center">
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg" />
  </a>
  <a href="https://yarnpkg.com">
    <img src="https://img.shields.io/badge/yarn-workspaces-2188b6" />
  </a>
  <a href="https://www.npmjs.com/package/@animo-id/indy-sdk-expo-plugin">
    <img src="https://img.shields.io/npm/v/@animo-id/indy-sdk-expo-plugin" />
  </a>
  <a
    href="https://raw.githubusercontent.com/animo/indy-sdk-expo-plugin/main/LICENSE"
    ><img
      alt="License"
      src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
  /></a>
</p>

<p align="center">
  <a href="#getting-started">Getting started</a> 
  &nbsp;|&nbsp;
  <a href="#contributing">Contributing</a> 
  &nbsp;|&nbsp;
  <a href="#contributing">License</a> 
</p>

---

An [Expo Config Plugin](https://docs.expo.dev/guides/config-plugins/) to automatically set up and configure the Indy SDK for iOS & Android in React Native.

- 🧽 Clean and minimal repository as you don't need to commit your `ios` and `android` directories.
- ⚡️ Super quick setup of the Indy SDK for iOS & Android in React Native.
- 💰 Save hours of time by leveraging Expo's development tools and Expo Application Service.

With the Indy SDK Expo Plugin you can leverage the `expo prebuild` command to generate the `ios` and `android` directories. This removes the need to following the tedious instructions for setting up the Indy SDK for react native, and means you don't need to commit the `ios` and `android` directories.

> Note: The Expo Indy SDK Plugin has currently only be tested against Expo SDK 45.

## Getting Started

Install the plugin using the following command:

```sh
# yarn
yarn add @animo-id/indy-sdk-expo-plugin

# npm
npm install -s @animo-id/indy-sdk-expo-plugin
```

Then add the plugin to your Expo app config (`app.json`, `app.config.json` or `app.config.js`) `plugins` array:

```json
{
  "expo": {
    "plugins": ["@animo-id/indy-sdk-expo-plugin"]
  }
}
```

That's it, you now have Indy SDK configured for your iOS and Android project. If you're using this plugin with [Aries Framework JavaScript](https://github.com/hyperledger/aries-framework-javascript) you will still need to follow the other setup steps, but you can skip the [Installation](https://aries.js.org/guides/getting-started/installation/react-native) for React Native.

## Contributing

Is there something you'd like to fix or add? Great, we love community
contributions! To get involved, please follow our [contribution guidelines](./CONTRIBUTING.md).

## License

Indy SDK Plugin Expo is licensed under the [Apache License Version 2.0 (Apache-2.0)](./LICENSE).
