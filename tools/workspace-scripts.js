module.exports = {
  message: 'NativeScript Plugins ~ made with ❤️  Choose a command to start...',
  pageSize: 32,
  scripts: {
    default: 'nps-i',
    nx: {
      script: 'nx',
      description: 'Execute any command with the @nrwl/cli',
    },
    format: {
      script: 'nx format:write',
      description: 'Format source code of the entire workspace (auto-run on precommit hook)',
    },
    '🔧': {
      script: `npx cowsay "NativeScript plugin demos make developers 😊"`,
      description: '_____________  Apps to demo plugins with  _____________',
    },
    // demos
    apps: {
      '...Vanilla...': {
        script: `npx cowsay "Nothing wrong with vanilla 🍦"`,
        description: ` 🔻 Vanilla`,
      },
      demo: {
        clean: {
          script: 'nx run demo:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo:android',
          description: '⚆  Run Android  🤖',
        },
      },
    },
    '⚙️': {
      script: `npx cowsay "@angelengineering/* packages will keep your ⚙️ cranking"`,
      description: '_____________  @angelengineering/*  _____________',
    },
    // packages
    // build output is always in dist/packages
    '@angelengineering': {
      // @angelengineering/flashlight
      flashlight: {
        build: {
          script: 'nx run flashlight:build.all',
          description: '@angelengineering/flashlight: Build',
        },
      },
      // @angelengineering/filepicker
      filepicker: {
        build: {
          script: 'nx run filepicker:build.all',
          description: '@angelengineering/filepicker: Build',
        },
      },
      // @angelengineering/audio-recorder
      'audio-recorder': {
        build: {
          script: 'nx run audio-recorder:build.all',
          description: '@angelengineering/audio-recorder: Build',
        },
      },
      // @angelengineering/audio-player
      'audio-player': {
        build: {
          script: 'nx run audio-player:build.all',
          description: '@angelengineering/audio-player: Build',
        },
      },
      'build-all': {
        script: 'nx run-many --target=build.all --all',
        description: 'Build all packages',
      },
    },
    '⚡': {
      script: `npx cowsay "Focus only on source you care about for efficiency ⚡"`,
      description: '_____________  Focus (VS Code supported)  _____________',
    },
    focus: {
      flashlight: {
        script: 'nx run flashlight:focus',
        description: 'Focus on @angelengineering/flashlight',
      },
      filepicker: {
        script: 'nx run filepicker:focus',
        description: 'Focus on @angelengineering/filepicker',
      },
      'audio-recorder': {
        script: 'nx run audio-recorder:focus',
        description: 'Focus on @angelengineering/audio-recorder',
      },
      'audio-player': {
        script: 'nx run audio-player:focus',
        description: 'Focus on @angelengineering/audio-player',
      },
      reset: {
        script: 'nx g @angelengineering/plugin-tools:focus-packages',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
