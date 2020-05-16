---
proyecto: blog.dbremont.dev
title: Game Programming Patterns
categories: libros
---

<!--more-->

# Introduction
[Ir](http://gameprogrammingpatterns.com/introduction.html)

In fifth grade, my friends and I were given access to a little unused classroom housing a couple of very beat-up TRS-80s. Hoping to inspire us, a teacher found a printout of some simple BASIC programs for us to tinker with.

The audio cassette drives on the computers were broken, so any time we wanted to run some code, we’d have to carefully type it in from scratch. This led us to prefer programs that were only a few lines long:

```
10 PRINT "BOBBY IS RADICAL!!!"
20 GOTO 10
```

# Design Patterns Revisited
[Ir](http://gameprogrammingpatterns.com/design-patterns-revisited.html)

Design Patterns: Elements of Reusable Object-Oriented Software is nearly twenty years old by my watch. Unless you’re looking over my shoulder, there’s a good chance Design Patterns will be old enough to drink by the time you read this. For an industry as quickly moving as software, that’s practically ancient. The enduring popularity of the book says something about how timeless design is compared to many frameworks and methodologies.

While I think Design Patterns is still relevant, we’ve learned a lot in the past couple of decades. In this section, we’ll walk through a handful of the original patterns the Gang of Four documented. For each pattern, I hope to have something useful or interesting to say.

# Sequencing Patterns
[Ir](http://gameprogrammingpatterns.com/sequencing-patterns.html)

Videogames are exciting in large part because they take us somewhere else. For a few minutes (or, let’s be honest with ourselves, much longer), we become inhabitants of a virtual world. Creating these worlds is one of the supreme delights of being a game programmer.

One aspect that most of these game worlds feature is time — the artificial world lives and breathes at its own cadence. As world builders, we must invent time and craft the gears that drive our game’s great clock.

The patterns in this section are tools for doing just that. A Game Loop is the central axle that the clock spins on. Objects hear its ticking through Update Methods. We can hide the computer’s sequential nature behind a facade of snapshots of moments in time using Double Buffering so that the world appears to update simultaneously.

# Behavioral Patterns
[Ir](http://gameprogrammingpatterns.com/behavioral-patterns.html)

Once you’ve built your game’s set and festooned it with actors and props, all that remains is to start the scene. For this, you need behavior — the screenplay that tells each entity in your game what to do.

Of course all code is “behavior”, and all software is defining behavior, but what’s different about games is often the breadth of it that you have to implement. While your word processor may have a long list of features, it pales in comparison with the number of inhabitants, items, and quests in your average role-playing game.

The patterns in this chapter help to quickly define and refine a large quantity of maintainable behavior. Type Objects create categories of behavior without the rigidity of defining an actual class. A Subclass Sandbox gives you a safe set of primitives you can use to define a variety of behaviors. The most advanced option is Bytecode, which moves behavior out of code entirely and into data.

# Decoupling Patterns
[Ir](http://gameprogrammingpatterns.com/decoupling-patterns.html)

Once you get the hang of a programming language, writing code to do what you want is actually pretty easy. What’s hard is writing code that’s easy to adapt when your requirements change. Rarely do we have the luxury of a perfect feature set before we’ve fired up our editor.

A powerful tool we have for making change easier is decoupling. When we say two pieces of code are “decoupled”, we mean a change in one usually doesn’t require a change in the other. When you change some feature in your game, the fewer places in code you have to touch, the easier it is.

Components decouple different domains in your game from each other within a single entity that has aspects of all of them. Event Queues decouple two objects communicating with each other, both statically and in time. Service Locators let code access a facility without being bound to the code that provides it.

# Optimization Patterns
[Ir](http://gameprogrammingpatterns.com/optimization-patterns.html)

While the rising tide of faster and faster hardware has lifted most software above worrying about performance, games are one of the few remaining exceptions. Players always want richer, more realistic and exciting experiences. Screens are crowded with games vying for a player’s attention — and cash! — and the game that pushes the hardware the furthest often wins.

Optimizing for performance is a deep art that touches all aspects of software. Low-level coders master the myriad idiosyncrasies of hardware architectures. Meanwhile, algorithms researchers compete to prove mathematically whose procedure is the most efficient.

Here, I touch on a few mid-level patterns that are often used to speed up a game. Data Locality introduces you to the modern computer’s memory hierarchy and how you can use it to your advantage. The Dirty Flag pattern helps you avoid unnecessary computation while Object Pools help you avoid unnecessary allocation. Spatial Partitioning speeds up the virtual world and its inhabitants’ arrangement in space.
