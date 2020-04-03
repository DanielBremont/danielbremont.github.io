---
layout: post
title: Python Design Patterns
tags: [conocimiento, libro]
---

<!--Resumen-->

Topics 

- [**The Global Object Pattern**](#1)
- [**Creational Patterns**](#2)
- [**Structural Patterns**](#3)
- [**Behavioral Patterns**](#4)


<div id="1"> </div>
## Python-Specific Patterns

- [The Global Object Pattern](https://python-patterns.guide/python/module-globals/)
    - [The Constant Pattern](https://python-patterns.guide/python/module-globals/#the-constant-pattern)
    - [Import-time computation](https://python-patterns.guide/python/module-globals/#import-time-computation)
    - [Dunder Constants](https://python-patterns.guide/python/module-globals/#dunder-constants)
    - [The Global Object Pattern](https://python-patterns.guide/python/module-globals/#id1)
    - [Global Objects that are mutable](https://python-patterns.guide/python/module-globals/#global-objects-that-are-mutable)
    - [Import-time I/O](https://python-patterns.guide/python/module-globals/#import-time-i-o)


- [The Prebound Method Pattern](https://python-patterns.guide/python/prebound-methods/)
    - [Alternatives](https://python-patterns.guide/python/prebound-methods/#alternatives)
    - [The pattern](https://python-patterns.guide/python/prebound-methods/#the-pattern)

- [The Sentinel Object Pattern](https://python-patterns.guide/python/sentinel-object/)
    - [Sentinel Value](https://python-patterns.guide/python/sentinel-object/#sentinel-value)
    - [The Null Pointer Pattern](https://python-patterns.guide/python/sentinel-object/#the-null-pointer-pattern)
    - [The Null Object Pattern](https://python-patterns.guide/python/sentinel-object/#the-null-object-pattern)
    - [Sentinel Objects](https://python-patterns.guide/python/sentinel-object/#sentinel-objects)
   
<div id="2"> </div>
## Creational Patterns

- [The Abstract Factory Pattern](https://python-patterns.guide/gang-of-four/abstract-factory/)
    - [The Pythonic approach: callable factories](https://python-patterns.guide/gang-of-four/abstract-factory/#the-pythonic-approach-callable-factories)
    - [Restriction: outlaw passing callables](https://python-patterns.guide/gang-of-four/abstract-factory/#restriction-outlaw-passing-callables)
    - [Restriction: outlaw passing classes](https://python-patterns.guide/gang-of-four/abstract-factory/#restriction-outlaw-passing-classes)
    - [Generalizing: the complete Abstract Factory](https://python-patterns.guide/gang-of-four/abstract-factory/#generalizing-the-complete-abstract-factory)

- [The Builder Pattern](https://python-patterns.guide/gang-of-four/builder/)
    - [The Builder as convenience](https://python-patterns.guide/gang-of-four/builder/#the-builder-as-convenience)
    - [Nuance](https://python-patterns.guide/gang-of-four/builder/#nuance)
    - [Dueling builders](https://python-patterns.guide/gang-of-four/builder/#dueling-builders)
    - [A degenerate case: simulating optional arguments](https://python-patterns.guide/gang-of-four/builder/#a-degenerate-case-simulating-optional-arguments)

- [The Factory Method Pattern](https://python-patterns.guide/gang-of-four/factory-method/)
    - [Dodge: use Dependency Injection](https://python-patterns.guide/gang-of-four/factory-method/#dodge-use-dependency-injection)
    - [Instead: use a Class Attribute Factory](https://python-patterns.guide/gang-of-four/factory-method/#instead-use-a-class-attribute-factory)
    - [Instead: use an Instance Attribute Factory](https://python-patterns.guide/gang-of-four/factory-method/#instead-use-an-instance-attribute-factory)
    - [Instance attributes override class attributes](https://python-patterns.guide/gang-of-four/factory-method/#instance-attributes-override-class-attributes)
    - [Any callables accepted](https://python-patterns.guide/gang-of-four/factory-method/#any-callables-accepted)
    - [Implementing](https://python-patterns.guide/gang-of-four/factory-method/#implementing)

- [The Prototype Pattern](https://python-patterns.guide/gang-of-four/prototype/)
    - [The problem](https://python-patterns.guide/gang-of-four/prototype/#the-problem)
    - [Pythonic solutions](https://python-patterns.guide/gang-of-four/prototype/#pythonic-solutions)
    - [Implementing](https://python-patterns.guide/gang-of-four/prototype/#implementing)

- [The Singleton Pattern](https://python-patterns.guide/gang-of-four/singleton/)
    - [Disambiguation](https://python-patterns.guide/gang-of-four/singleton/#disambiguation)
    - [The Gang of Four’s implementation](https://python-patterns.guide/gang-of-four/singleton/#the-gang-of-fours-implementation)
    - [A more Pythonic implementation](https://python-patterns.guide/gang-of-four/singleton/#a-more-pythonic-implementation)
    - [Verdict](https://python-patterns.guide/gang-of-four/singleton/#verdict)
    
<div id="3"> </div>
## Structural Patterns

- [The Composite Pattern](https://python-patterns.guide/gang-of-four/composite/)
    - [Example: the UNIX file system](https://python-patterns.guide/gang-of-four/composite/#example-the-unix-file-system)
    - [On hierarchies](https://python-patterns.guide/gang-of-four/composite/#on-hierarchies)
    - [Example: GUI programming with Tkinter](https://python-patterns.guide/gang-of-four/composite/#example-gui-programming-with-tkinter)
    - [Implementation: to inherit, or not?](https://python-patterns.guide/gang-of-four/composite/#implementation-to-inherit-or-not)

- [The Decorator Pattern](https://python-patterns.guide/gang-of-four/decorator-pattern/)
    - [Definition](https://python-patterns.guide/gang-of-four/decorator-pattern/#definition)
    - [Implementing: Static wrapper](https://python-patterns.guide/gang-of-four/decorator-pattern/#implementing-static-wrapper)
    - [Implementing: Tactical wrapper](https://python-patterns.guide/gang-of-four/decorator-pattern/#implementing-tactical-wrapper)
    - [Implementing: Dynamic wrapper](https://python-patterns.guide/gang-of-four/decorator-pattern/#implementing-dynamic-wrapper)
    - [Caveat: Wrapping doesn’t actually work](https://python-patterns.guide/gang-of-four/decorator-pattern/#caveat-wrapping-doesnt-actually-work)
    - [Hack: Monkey-patch each object](https://python-patterns.guide/gang-of-four/decorator-pattern/#hack-monkey-patch-each-object)
    - [Hack: Monkey-patch the class](https://python-patterns.guide/gang-of-four/decorator-pattern/#hack-monkey-patch-the-class)
    - [Further Reading](https://python-patterns.guide/gang-of-four/decorator-pattern/#further-reading)

- [The Flyweight Pattern](https://python-patterns.guide/gang-of-four/flyweight/)
    - [Factory or Constructor](https://python-patterns.guide/gang-of-four/flyweight/#factory-or-constructor)
    - [Implementing](https://python-patterns.guide/gang-of-four/flyweight/#implementing)
    
<div id="4"> </div>
## Behavioral Patterns

- [The Iterator Pattern](https://python-patterns.guide/gang-of-four/iterator/)
    - [Iterating with the “for” loop](https://python-patterns.guide/gang-of-four/iterator/#iterating-with-the-for-loop)
    - [The pattern: the iterable and its iterator](https://python-patterns.guide/gang-of-four/iterator/#the-pattern-the-iterable-and-its-iterator)
    - [A twist: objects which are their own iterator](https://python-patterns.guide/gang-of-four/iterator/#a-twist-objects-which-are-their-own-iterator)
    - [Implementing an Iterable and Iterator](https://python-patterns.guide/gang-of-four/iterator/#implementing-an-iterable-and-iterator)
    - [Python’s extra level of indirection](https://python-patterns.guide/gang-of-four/iterator/#pythons-extra-level-of-indirection)

Thanks for reading!