# Indy SDK Expo Plugin

Config plugin to auto configure Indy SDK for iOS & Android.

With the Indy SDK Expo Plugin you can generate the required ios and android files using the prebuild command. This removes the need to following the tedious instructions for setting up the indy sdk for react native, and means you don't need to keep the ios and android committed in your repository.

## Install

> Tested against Expo SDK 45

```
yarn add @animo-id/indy-sdk-expo-plugin
```

## Example

In your app.json `plugins` array:

```json
{
  "expo": {
    "plugins": ["@animo-id/indy-sdk-expo-plugin"]
  }
}
```
