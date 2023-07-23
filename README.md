# [In progress: Not ready for publish yet]

# Addition and Subtraction

![logo](/src/assets/icons/icon128.png)

(AS) is a browser extension that helps you practice simple addition and subtraction expression. It is like a quiz extension.

![preview_opz](https://github.com/biplobsd/as/assets/43641536/be8cfb52-bb45-4ce3-8855-59e2e5e1bd49)

## Quick tutorial in 60 second (Youtube #Shorts)

[![Use case](https://img.youtube.com/vi/tH3DBDNKc8c/0.jpg)](https://youtu.be/tH3DBDNKc8c)

## Usage scenario

Case 1 - Practicing Addition and Subtraction
Suppose you want to practice addition and subtraction, and also need some breaks while working in your browser. With this extension, you can easily do that. Pin it on your extension panel, then just click on the icon, and you will see a random expression and options button.

Case 2 - Increase your interactivity
Suppose you want to increase your mouse or keyboard interaction. Also, you want to refresh your basic addition and subtraction skills. With this simple extension, you can do that. Just pin it on your extension panel, and then click on the icon. You will see an expression and an options button.

## Installation

| Edge Add-ons | Chrome Web Store |
| ------------ | ---------------- |
| Coming soon  | Coming soon      |

Or get the built zip from the [release](https://github.com/biplobsd/as/releases/latest) tab. Then follow the instructions in the [Load unpacked extensions](#load-unpacked-extensions) section. The **_/dist_** folder should be considered as the unpacked zip files.

## Usages

To use the extension, open the (3+3, 5-5) (AS) icon from the extension panel. Now you will see a random expression and below are 4 buttons.

![Home page](https://github.com/biplobsd/as/assets/43641536/e6e31107-2967-4fe3-b82a-8b9530cf2485)

In the countdown (easy mode 30s), choose your answer. If you choose correctly, you will get 1 star. After that, you will receive a new expression. This will continue until you have failed 10 times or your countdown is over.

If you continue (easy mode 50 stars), you will have your expression numbers increased (easy mode 5) as continue.

### Settings

![Settings](https://github.com/biplobsd/as/assets/43641536/030f9865-e39d-42cd-9677-a7711d6d629b)

#### Mode

Below are the presets for each mode.
| Action | Easy | Medium | Hard |
| ----------- | ----------- | ----------- | ----------- |
| Timeout | 20s | 10s | 5s |
| Number Range | 5 | 10 | 30 |
| Increase number after N star | 30 | 20 | 5 |

- Mode in details

  > Timeout - Countdown to choose your options within this time.

  > Number Range - Numbers between the minimum and maximum values. For example, for a number range of 5, if your current score is 0, then your minimum is 0 and maximum is 5.

  > Increase number after N star - After correctly answering 50 expression (in Easy mode), your base score will increase to the maximum value.

  > Only (+ or -) - You can choose between only addition for (+), only subtraction for (-), or random for (+) or (-) expression.

- Reset

  > Setting - Resets only the settings. This action will not remove your star values.

  > Back to First - Resets both the settings and star count to 0. This will also update the leaderboard page.

### Dark or Light theme

Switch between Dark or Light themes by simply pressing the icon in the top right corner.
![Theme switching](https://github.com/biplobsd/as/assets/43641536/287afe8d-2cd8-419b-b68d-42fbe01e9ac8)

### Linking your star count with Google Account

If you want to save your star count in the cloud or save your progress and settings, you need to log in to your Google account. To do this, click on the user icon located in the top right corner. On the popup window, choose your account.

![Sign in with Google](https://github.com/biplobsd/as/assets/43641536/ffbe511b-8ca4-4b77-bb51-2bbfe2dddddd)

Now you also use your account to other browser. Your prgress will sync automatictly.

## Development

```bash
# install dependencies
npm i

# build files to `/dist` directory
# HMR for extension pages and content scripts
npm run dev
```

## Build

```bash
# build files to `/dist` directory
$ npm run build
```

## Load unpacked extensions

[Getting Started Tutorial](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to `Developer mode`.
3. Click the `LOAD UNPACKED` button and select the `/dist` directory.

![Example](https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vOu7iPbaapkALed96rzN.png?auto=format&w=571)

## Related information

- (AS) was just modified from the YST project. Check out [biplobsd/yst](https://github.com/biplobsd/yst)
- This project starts with using the [NekitCorp/chrome-extension-svelte-typescript-boilerplate](https://github.com/NekitCorp/chrome-extension-svelte-typescript-boilerplate) boilerplate project. So don't forget to check out their project.

## Donation

<a href="https://www.buymeacoffee.com/biplobsd" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
