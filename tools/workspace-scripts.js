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
          script: 'nx clean demo',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx debug demo ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx debug demo android',
          description: '⚆  Run Android  🤖',
        },
      },
      '...Angular...': {
        script: `npx cowsay "Test all the Angles!"`,
        description: ` 🔻 Angular`,
      },
      'demo-angular': {
        clean: {
          script: 'nx clean demo-angular',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx debug demo-angular ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx debug demo-angular android',
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
      // @angelengineering/audio-player
			'audio-player': {
				build: {
					script: 'nx run audio-player:build.all',
					description: '@angelengineering/audio-player: Build',
				},
			},
			// @angelengineering/audio-recorder
			'audio-recorder': {
				build: {
					script: 'nx run audio-recorder:build.all',
					description: '@angelengineering/audio-recorder: Build',
				},
			},
			// @angelengineering/camera
			'camera': {
				build: {
					script: 'nx run camera:build.all',
					description: '@angelengineering/camera: Build',
				},
			},
			// @angelengineering/downloader
			'downloader': {
				build: {
					script: 'nx run downloader:build.all',
					description: '@angelengineering/downloader: Build',
				},
			},
			// @angelengineering/filepicker
			'filepicker': {
				build: {
					script: 'nx run filepicker:build.all',
					description: '@angelengineering/filepicker: Build',
				},
			},
			// @angelengineering/flashlight
			'flashlight': {
				build: {
					script: 'nx run flashlight:build.all',
					description: '@angelengineering/flashlight: Build',
				},
			},
			// @angelengineering/sleepcontrol
			'sleepcontrol': {
				build: {
					script: 'nx run sleepcontrol:build.all',
					description: '@angelengineering/sleepcontrol: Build',
				},
			},
			// @angelengineering/transcoder
			'transcoder': {
				build: {
					script: 'nx run transcoder:build.all',
					description: '@angelengineering/transcoder: Build',
				},
			},
			// @angelengineering/videoplayer
			'videoplayer': {
				build: {
					script: 'nx run videoplayer:build.all',
					description: '@angelengineering/videoplayer: Build',
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
      'audio-player': {
				script: 'nx run audio-player:focus',
				description: 'Focus on @angelengineering/audio-player',
			},
			'audio-recorder': {
				script: 'nx run audio-recorder:focus',
				description: 'Focus on @angelengineering/audio-recorder',
			},
			'camera': {
				script: 'nx run camera:focus',
				description: 'Focus on @angelengineering/camera',
			},
			'downloader': {
				script: 'nx run downloader:focus',
				description: 'Focus on @angelengineering/downloader',
			},
			'filepicker': {
				script: 'nx run filepicker:focus',
				description: 'Focus on @angelengineering/filepicker',
			},
			'flashlight': {
				script: 'nx run flashlight:focus',
				description: 'Focus on @angelengineering/flashlight',
			},
			'sleepcontrol': {
				script: 'nx run sleepcontrol:focus',
				description: 'Focus on @angelengineering/sleepcontrol',
			},
			'transcoder': {
				script: 'nx run transcoder:focus',
				description: 'Focus on @angelengineering/transcoder',
			},
			'videoplayer': {
				script: 'nx run videoplayer:focus',
				description: 'Focus on @angelengineering/videoplayer',
			},
			reset: {
        script: 'nx g @nativescript/plugin-tools:focus-packages',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
