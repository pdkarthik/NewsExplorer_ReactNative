# NewsExplorer - React Native

A high-performance news discovery application built with React Native CLI, featuring real-time data fetching, local persistence, and a polished UI.

## 🔗 Live Demo & Download

Explore the application immediately without setting up a local environment:

[![Browser Demo](https://img.shields.io/badge/Live%20Demo-Appetize.io-orange?style=for-the-badge&logo=googlechrome&logoColor=white)](https://appetize.io/app/b_b7pj3buhratytsouasvqxqh7om)
[![Download APK](https://img.shields.io/badge/Download-Android%20APK-green?style=for-the-badge&logo=android&logoColor=white)](https://drive.google.com/file/d/1rbnH6jZoRo4BDch2tuCT-tgEMQg-aUzd/view?usp=drive_link)

## 📱 App Functionality

- **Live Feed**: Fetches real-time space news from the Spaceflight News API.
- **Infinite Scrolling**: Lazy-loads articles as you scroll to ensure smooth performance.
- **Search**: Integrated search functionality to filter articles by title or content.
- **Bookmarks**: Save your favorite articles locally to read them later.
- **Persistence**: All bookmarks and app settings are saved on the device disk, so they remain available even after restarting the app.
- **Responsive Design**: Fully optimized for various screen sizes and notches using Safe Area handling.

## 🚀 How to Run the Project

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start Metro Bundler**:
   ```bash
   npx react-native start
   ```
4. **Run on Android**:
   ```bash
   npx react-native run-android
   ```
5. **Run on iOS** (macOS required):
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

## 🛠 Key Technical Decisions

- **Redux Toolkit**: Chosen for its robust state management and built-in middleware handling (Thunks).
- **Nested Redux Persistence**: To prevent UI lag, I implemented a nested persistence configuration that blacklists the massive news feed and only persists the essential bookmarks. This keeps the disk I/O operations fast and the UI responsive.
- **Spaceflight News API**: Selected because it provides high-quality, real-world data with images without requiring complex API key configurations, making the evaluation process seamless.
- **Safe Area Context**: Implemented `useSafeAreaInsets` to ensure the UI is fully responsive and professional on devices with notches or home indicators.
- **Memoization**: Used `React.memo` on list items to prevent unnecessary re-renders during infinite scrolling.

## 📈 Future Improvements

Given more time, I would implement:
- **Unit & Integration Testing**: Adding Jest and React Native Testing Library suites for critical logic.
- **Dark Mode Support**: Implementing a dynamic theme provider for better user experience in low-light environments.
- **News Categories**: Adding a category filter (e.g., Blogs, Reports, News) to the Home screen.
- **Offline Mode**: Full caching of the last 20 articles for reading without any internet connection.
