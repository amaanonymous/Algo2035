ALGORITHM 2035 - Adaptive Algorithm Selection Framework for Smart Cities
Design and Analysis of Algorithms | Assignment 1

HOW TO RUN
  Double-click index.html (any modern browser: Chrome, Edge, Firefox, Safari).
  No install, no server, no build step.

INTERNET NEEDED (loaded from CDNs when the page opens)
  - three.js r128   https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js   (3D scenes, India map)
  - anime.js 3.2.1  https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js   (animations)
  - Google Fonts    Roboto Flex, Roboto Mono, Inter
  Without internet the 3D scenes will not draw. To run offline, download the two .js files
  above into js/vendor/ and change the two <script src="..."> lines at the top of index.html.

PROJECT STRUCTURE
  index.html                  page markup only (all pages/modules live here)
  assets/images/              assignment_brief.jpeg (the assignment sheet this project answers)
  css/
    base/                     variables, reset, body
    layout/                   side rail, page sections and cards, responsive rules
    components/               intro screen, buttons, reveal/stats/tiles, controls and canvases
    sections/                 hero, city-impact, feasibility board + selector, intro eyebrow
    themes/                   gold, google and premium colour themes, reveal tuning
  js/
    core/                     helpers, intro animation, router + scroll reveal
    data/                     India outline and city coordinates (shared by every 3D map)
    scene/                    3D background world, stage helpers, per-module 3D stages
    algorithms/               shared algorithm cores, B-Tree / Red-Black / Binomial / Fibonacci
    modules/                  per-module UI logic (Roads, Budget, Zones, Puzzle, Limits, ...)

IMPORTANT: LOAD ORDER
  The files are plain (non-module) scripts and stylesheets that share one global scope, exactly
  as they did inside the single index.html. The order of the <link> and <script> tags in
  index.html matters (later CSS overrides earlier CSS; later JS uses functions and variables
  defined by earlier JS). Do not reorder them.

MODULES (left rail)
  Home    framework overview + "Ask the framework" selector
  Roads   Prim vs Kruskal (MST)
  Zones   Floyd-Warshall (all-pairs)
  Budget  Fractional vs 0/1 Knapsack
  Data    B-Tree vs Red-Black Tree, Binomial vs Fibonacci Heap
  Puzzle  N-Queens sensor placement (backtracking)
  Limits  NP-Hard / NP-Complete, feasibility board, time-explosion chart
Each module page shows time and space complexity and a "Why the city needs this" section.
