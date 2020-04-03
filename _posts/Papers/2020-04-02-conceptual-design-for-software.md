---
layout: post
title: Towards a Theory of Conceptual Design for Software
tags: [article, cs]
---

Author

- Daniel Jackson, MIT


<!--more-->

## Abstract 

Concepts are the building blocks of software systems. They are not just subjective mental constructs, but are objective features of a system’s design: increments of functionality that were consciously introduced by a designer to serve particular purposes.

This essay argues for viewing the design of software in terms of concepts, with their invention (or adoption) and refinement as the central activity of software design. A family of products can be characterized by arranging concepts in a dependence graph from which coherent concept subsets can be extracted. Just as bugs can be found in the code of a function prior to testing by reviewing the programmer’s argument for its correctness, so flaws can be found in a software design by reviewing an argument by the designer. This argument consists of providing, for each concept, a single compelling purpose, and demonstrating how the concept fulfills the purpose with an archetypal scenario called an ‘operational principle’. Some simple conditions (primarily in the relationship between concepts and their purposes) can then be applied to reveal flaws in the conceptual design.