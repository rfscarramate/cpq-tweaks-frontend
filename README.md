Signify CPQ - Android WebView wrapper with modular OTA userscript loader

Project summary:
- Application ID: com.carramate.signifycpq
- Name: Signify CPQ
- Min SDK: 24
- WebView loads: https://www.cpq.signify.com/quotes/
- Embedded asset loader: app/src/main/assets/loader.js
  -> Fetches https://rfscarramate.github.io/cpq-tweaks/loader.js
  -> Caches in localStorage (persistent)
  -> If loader missing, app continues without tweaks

How to build:
1) Open this folder in Android Studio.
2) Let Gradle sync and install SDK if necessary.
3) Run app on device or emulator.

Publishing:
- Follow previous instructions to create repo rfscarramate/cpq-tweaks and enable GitHub Pages.
