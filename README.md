# Path Finder:

This project was designed to visualise some sorting algorithms in an intuitive and interactive way. It was built with React js and MUI for icons and controllers. 

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
│   │   └── SpeedSlider.tsx
│   ├── imgs
│   │   ├── dog.svg
│   │   ├── paw.svg
│   │   └── steak-svgrepo-com.svg
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
│       └── Node.tsx
├── index.js
├── model
│   ├── algorithms
│   │   ├── A*.ts
│   │   ├── BFS.ts
│   │   ├── BiderectionalBfs.ts
│   │   ├── DFS.ts
│   │   ├── Dijkstra.ts
│   │   └── outils
│   │       ├── AlgorithmsEngine.ts
│   │       ├── BinaryHeap.js
│   │       └── PriorityQueue.js
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
│       ├── Prim2.ts
│       ├── RecursiveDivision.ts
│       ├── outils.ts
│       └── random.tsx
└── react-app-env.d.ts
```