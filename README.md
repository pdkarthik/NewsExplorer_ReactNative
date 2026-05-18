# NewsExplorer - React Native

A high-performance news discovery application built with React Native CLI, featuring real-time data fetching, local persistence, and a polished UI.

## 🔗 Live Demo & Download

Explore the application immediately without setting up a local environment:

[![Browser Demo](https://img.shields.io/badge/Live%20Demo-Appetize.io-orange?style=for-the-badge&logo=googlechrome&logoColor=white)](https://appetize.io/app/b_b7pj3buhratytsouasvqxqh7om)
[![Download APK](https://img.shields.io/badge/Download-Android%20APK-green?style=for-the-badge&logo=android&logoColor=white)](https://drive.google.com/file/d/1rbnH6jZoRo4BDch2tuCT-tgEMQg-aUzd/view?usp=drive_link)

## ✨ Key Features

- **Stay Updated**: Instantly view a live feed of the latest space news and articles as soon as you open the app.
- **Seamless Browsing**: Scroll endlessly through articles without experiencing lag or loading interruptions (Infinite Scrolling).
- **Find What You Need**: Use the integrated search bar to quickly find articles based on specific topics or keywords.
- **Save for Later**: Found an interesting article? Bookmark it with a single tap to read it later at your convenience.
- **Never Lose Your Data**: Your bookmarked articles are safely saved on your device, meaning they'll still be there even if you close and reopen the app.
- **Share Discoveries**: Easily share fascinating articles with friends or on social media using your phone's native sharing menu.
- **Responsive Experience**: Enjoy a tailored and safe viewing experience across any device size, without content hiding behind notches.

## 💻 Tech Stack

- **Framework**: React Native (CLI)
- **State Management**: Redux Toolkit & Redux Persist
- **Navigation**: React Navigation
- **Data Fetching**: Axios (Spaceflight News API)
- **Styling**: StyleSheet (React Native)

## 💡 Overview of Approach

My development methodology focused on modularity, performance, and user experience:
- **Component-Driven Architecture**: Structured the app with modular, reusable UI components to keep the codebase clean, scalable, and easy to maintain.
- **Performance-First Mindset**: Prioritized smooth 60fps scrolling and rapid interactions by minimizing unnecessary re-renders and keeping heavy data operations off the main thread.
- **User-Centric UI/UX**: Designed a highly intuitive interface that adapts flawlessly to different screen sizes and device constraints (like notches and home indicators).

## 🛠 Key Technical Decisions

- **Nested Redux Persistence**: To prevent UI lag, I configured Redux Persist to *blacklist* the massive news feed and *only* persist the essential bookmarks. This keeps disk I/O operations fast while ensuring user data is saved.
- **Memoization (`React.memo`)**: Applied memoization to list items inside the `FlatList` to prevent expensive re-renders during infinite scrolling.
- **Safe Area Context**: Implemented `useSafeAreaInsets` to programmatically handle padding for notches, ensuring the UI remains professional on all modern devices.
- **Native Share API**: Leveraged the built-in React Native Share module to provide an OS-native sharing experience, avoiding the bloat of external third-party libraries.
- **Spaceflight News API**: Selected because it provides high-quality, real-world data with images out-of-the-box without requiring complex API key configurations.

## 🚀 Getting Started

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

## 📈 Future Improvements

Given more time, I would implement:
- **Unit & Integration Testing**: Adding Jest and React Native Testing Library suites for critical logic.
- **Dark Mode Support**: Implementing a dynamic theme provider for better user experience in low-light environments.
- **News Categories**: Adding a category filter (e.g., Blogs, Reports, News) to the Home screen.
- **Offline Mode**: Full caching of the last 20 articles for reading without any internet connection.
