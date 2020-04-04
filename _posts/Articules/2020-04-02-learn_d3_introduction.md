---
layout: post
title: Learn D3 Introduction
tags: [books]
---

This series of notebooks will guide you through your first steps with D3.js.

Before we embark, it’s worth briefly considering: Why bother learning D3? And why learn here in Observable?

For one, D3 is popular (80M downloads and [90K stars](https://github.com/d3/d3)), so you’re in good company. There are plenty of community-developed resources, including tutorials, videos, classes, and books. And the D3 team has published hundreds of its own forkable examples and tutorials to boost your learning and productivity.

For another, D3 is flexible. D3’s superpower is that you can do whatever you want—creative freedom! The [D3 gallery](https://observablehq.com/@d3/gallery) is a veritable zoo of forms: [treemap](https://observablehq.com/@d3/treemap), [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling/2), [Sankey diagram](https://observablehq.com/@d3/sankey-diagram), [density contours](https://observablehq.com/@d3/density-contours), [force-directed graph](https://observablehq.com/@d3/disjoint-force-directed-graph), to name a few. (And nearly a hundred [map projections](https://observablehq.com/@d3/world-map)!) This flexibility stems from D3’s low-level approach, focusing on composable primitives such as [shapes](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12) and [scales](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f) rather than configurable charts. D3 imposes no constraints, so avail yourself of all bells and whistles supported by modern browsers.

And D3 is renowned for animation and interaction. If you’ve got a few minutes, watch a [bar chart race](https://observablehq.com/@d3/bar-chart-race) or an [animated treemap](https://observablehq.com/@d3/animated-treemap). Dive into a [hierarchical bar chart](https://observablehq.com/@d3/hierarchical-bar-chart), [collapsible tree](https://observablehq.com/@d3/collapsible-tree), or zoomable sunburst, treemap, or packed circles. Or brush a scatterplot matrix or zoom into an [area chart](https://observablehq.com/@d3/zoomable-area-chart). Animation can be a powerful device for storytelling, while interaction allows active readers to explore.

This power, of course, comes at a cost. There’s much to learn: D3 has more than thirty modules and a thousand methods! And D3 can be more tedious than tools expressly intended for exploratory visualization, such as Vega-Lite.

But that’s where Observable comes in.

Observable is the ideal environment for learning D3 because it simplifies code with dataflow, like a spreadsheet. As you edit, cells run automatically for rapid feedback. You can add interaction or animation with almost no code! We’ll cover Observable’s quirks and features as we go along.

And Observable revolves around collaboration, helping you learn from and give back to the community. Go beyond copy-and-paste. Any notebook can be forked or imported. Notebooks can export reusable components, such as a color legend or scrubber. You can comment on cells, suggest and merge changes, or ask for help.

Enough overture. Let’s raise the curtain and get our first glimpse of D3


Topics:

- Introduction - you are here!
- [By Example](https://observablehq.com/@d3/learn-d3-by-example?collection=@d3/learn-d3) - finding, forking, importing examples
- [Data](https://observablehq.com/@d3/learn-d3-data?collection=@d3/learn-d3) - loading, parsing, transforming data
- [Scales](https://observablehq.com/@d3/learn-d3-scales?collection=@d3/learn-d3) - making the abstract visual
- [Shapes](https://observablehq.com/@d3/learn-d3-shapes?collection=@d3/learn-d3) - geometric primitives for visualization
- [Animation](https://observablehq.com/@d3/learn-d3-animation?collection=@d3/learn-d3) - graphics that change over time
- [Joins](https://observablehq.com/@d3/learn-d3-joins?collection=@d3/learn-d3) - D3’s pattern for manipulating the DOM
- [Interaction](https://observablehq.com/@d3/learn-d3-interaction?collection=@d3/learn-d3) - responding to user input
- [Further Topics](https://observablehq.com/@d3/learn-d3-further-topics?collection=@d3/learn-d3) - where to go next