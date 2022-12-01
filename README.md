# Path Finder:

This project was designed to visualise some sorting algorithms in an intuitive and interactive way. It was built with React js and MUI for icons and controllers, and based on the work of Clement Mihailescu. 

### Project Structure

```
src
├── App.tsx
├── MainApp.tsx
├── components
│   ├── colors.js
│   ├── controllers
│   │   ├── AlgorithmMenu.tsx
│   │   ├── ClearButton.tsx
│   │   ├── MazesMenu.tsx
│   │   ├── SolveButton.tsx
│   │   ├── SpeedSlider.tsx
│   │   └── weightedMazeOption.tsx
│   ├── imgs
│   │   ├── crumbs.svg
│   │   ├── dog.svg
│   │   └── steak.svg
│   ├── presentation
│   │   ├── WelcomeGuide.tsx
│   │   └── tutorial
│   │       ├── AlgorithmMazeExplanation.tsx
│   │       ├── CanvasInformation.tsx
│   │       ├── FunctionButtonsExplanation.tsx
│   │       ├── InformationBoxExplanation.tsx
│   │       └── Tutorial.tsx
│   └── viewer
│       ├── Canvas.tsx
│       ├── InformationBox.tsx
│       ├── InformationBoxMaze.tsx
│       ├── Node.tsx
│       └── unweightedAlgorithm.tsx
├── index.js
├── model
│   ├── algorithms
│   │   ├── AlgorithmsEngine.ts
│   │   ├── BFS.ts
│   │   ├── BiderectionalBfs.ts
│   │   ├── DFS.ts
│   │   └── Dijkstra.ts
│   ├── animations
│   │   ├── AnimationsEngine.css
│   │   ├── AnimationsEngine.ts
│   │   ├── gridSelectionAnimation.tsx
│   │   └── toggleWallAnimation.ts
│   ├── grid
│   │   ├── GridEngine.tsx
│   │   └── NodeEngine.ts
│   └── mazes
│       ├── MazesEngine.ts
│       ├── RecursiveDivision.ts
│       ├── elevationAnimations.ts
│       └── random.tsx
├── outils.ts
└── react-app-env.d.ts
```
