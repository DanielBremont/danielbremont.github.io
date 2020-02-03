---
layout: post
title: Clean Code - Coding for Humans
tags: [hot, summer]
---

Introduction:
 - Clean Code
 - Solid Code
 - Refactoring | Automated Test
 - TDD | DDD

<!--more-->

Books :
 - Code Complete
 - Clean Code
 - The Pragmatic Programmer

What is clean code :
  - It's declarative.
  - It's expressve.
  - It's expressive intent.
  - It's easy to read.
  - Keep signal to noise ratio high.
  - It's no dirty.

02 Principles
 -. Rigth tool for the job.
 -. High signal to noise ratio. (understand the intent and forget about the detail)
 -. Self-documenting 
 -. Our short-term memomory can hold only 7-+ 2 elements at a time, so take in account for the numbers of parameters in a method/function, the number of method/functions in a class, the number of local variables in a method in each point in time.
 -. The dry principle in which each of data/funcionality is defined in a single place. 
 - Fewer lines of codes are correlated with less bugs.
 - Well written code is self-documenting:
   * Clear intent.
   * Layers of abstractions (Ej. Navigate the bussiness domain in one layer of abstraction)
 
03 Naming
  - Good class names :
    - Noum
    - Be specific (smaller and more cohesive class)
    - Single Responsability (ProductRepository - Service Class) 
    - Avoid generic suffixes (Product not ProductInfo) 
  - Method Names
    - Verbs
    - Indicate an action
    - Name indicate action / task.
  - What out for (And, If, Or) in method naming.
  - Whatch out for side effets.
  - Abbreviations in code did not make sense, we have intellisence today, and also make the code harder  to read.
  - Boleans names : should sound like true/false questions,
    good names isOpen, isDone, isActive, isLogin.
  - Symmetrical names (on/off), (fast/slow), (lock, unlock), (min/max)
  - Read(verbalize) the code, if you cant't then maybe something must be changed.

04 Conditionals
  - Convey intent,  clear intent.
  - if (isLogin == true) // bad
  - if (islogin) // good
  - bool isX  = cashInWallet > 6.00;
  - Dont't be anti-negative, the brain did not likes negative stuff.
  - if (!isNotLoggIn) bad
  - if (isLogIn) good
  - Progamming by Coincidence (estoy trabajando en algo no funciona), cambio algo en test/trial fashion works out and job done.
  - Ternary is elegant.
  - registrationFee = isSpeaker ? 0 : 50.
  - Dot make  a compount or nested ternar expression. (Hard to Write)
  - Use enums for strong types, for types and options!
  - EmployeeType.Manager
  - Documents states, because you can see all the options in one place.
  - Magic Numbers, numbers that appear in code, they are hard to explain, and must of the time we need to understand the context in order to undertand why that number and not other.
  - How to factor out complex conditionals :
    - Intermidate variables
    - Delegate the responsability of the conditinal evaluation to a function.    
    - Favor polymorphism over Enums for behavior, for example switch statemens to Indermine behavior, or the state design  pattern.
    - Use Linq as much as you can!
    - Table Driven Design, Some times,  you hard code data in the code, when the data may change, thus it need to be in the database. Insurance rates, pricing structures, and complex and dynamic busines rules. 


05 Functions
  - High signal functions
  - When to create of functions.
  - How to maintain simplicity   
  - Code smells and refactoring tecnniques
  - Error handling

When to create a function :
  - When we need to avoid dupplication.
  - Hide complexiy.
  - With good functions names, we convey intent.
  - Do one thing, and one thing well. (Explain to a cat)
  - Control cyclomatic complexity.
  - Comprehension decreases beyond three levels of nested 'if blocks'
 
Extracting a method, is like a footnote.
Because the method definition is the detail, the name and call represents the intent.

Return early, when ej. validating when you found the answer please return the value did not run more logic, for avoid arrow code.


Fail fast, when i unexpected condition happend, (bad arguments) that cannot be handle plis fail, "this principle is realted with the return early principle", you can use guard clausess for implement this technique.

Do one thing mantr for a function:
 - . Easy to read.
 - . Promotes reause.
 - . Easy naming and testing
 - . Avoid side-effects.
 - Could you read a book with one paragraph.

Introduction is done when need it, so declare a variable when need it!
Keep the variable scope as minimal as possible, avoid metal overload.

Functions creates structures in code, are a tool similar to footnotes.
They allow to show structue, and high view of the intent, when you need the details go to a function definition (food note!)

06 Classes
  - When to create a class.
  - Cohesion
  - Organization
  - Primitive obsession
  - Outline Rule, How to outline, to allow the reader to see the intent. 

When to create a class:
  - Model an object.
  - Bundle toghether a set of  static method.
  - Low Cohesion (Method should relate) 
  - Reduce complexity
  - Clasify parameters
  - If you pass the same data to different functions maybe those functions and data should be boundle togheter in a class.
  - If a class name is generic then the cohesion is close.
  - High cohesive class <--> single responsability. 

A class that is to small:
  - Too many pieces.
  - When to classes a too coupled. 

Primitive obsession :
  - SaveUser (firstName, lastName, age, state, ...) bad
  - SaveUser (aUser) 

Principle of Proximity :
  - Keep realated actions togheter.
  - It's good to read top down!

The outline rule
  - Collapsed code should read like an outline, strive for multiple layers of abstraction.


07 Comments
   - Comments are signal or noise.
   - Prefer expressive code over comments.
   - Use comments when the code alone can't documents itself easily.

Zoombie code : Codigo comentado, para eso usar control de versiones.
 - Siempre hay que mejorar el codigo, un chin mas de como lo encontramos


Refactor the code that need to be change.

The boy scote rule : Always leve the code a litle bit better than you fount it!

Thanks for reading!