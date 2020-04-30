---
layout: post
title: Code Reading
categories: [articles]
tags: [cs]
---

[Ir](https://changelog.com/posts/one-sure-fire-way-to-improve-your-coding){:target="_blank"}

<!--more-->

The most obvious way to improve your coding is to write more code. Everybody knows that. However, another activity which I guarantee will improve your coding is the complete opposite of writing. I will state this as plainly as I possibly can:

If you want to dramatically increase your programming skills you need to be reading other people’s code.

Maybe you believe that, maybe you don’t. You should. And if you’re willing to give it a shot, I believe you will be rewarded greatly for your time.

In this article I will help you choose what to read and give you practical advice on how to go about reading it. If you’re already a code reader you may find a few ways to get more from your efforts. If you aren’t, you absolutely must read on.

# What to Read

This is a big decision, and one that is difficult to advise on. I won’t simply point you toward code I think you should read, because it really comes down to what you’re in to. However, I will provide some guidelines which you can follow to help you choose what to read.

# Read code that you rely on

A great place to start is with any plugins or libraries that you are already using.

- A WordPress plugin that you really like
- A Ruby gem that you’ve found useful
- A jQuery plugin that you keep going back to

These are all great candidates for learning. You are already familiar with their public APIs so the barrier to understanding their inner workings is lower. Also, as a user of the code you have an opportunity to add documentation, implement a new feature, or generally give back to the project in some way.

# Read code that impresses you

I remember the first time I saw 280 Slides and I thought to myself, “Now that is impressive.” I quickly learned that the code driving that site was the open-source Cappuccino project. I tucked that knowledge into the far recesses of my brain and when I eventually came across another impressive app running on Cappuccino I knew I had a project that I could learn a lot from. What have you been impressed by lately? Is it open-source? If so, it’s a great choice for reading since the code is likely to impress you as much as the resulting application.

# Read code written by somebody you respect

If you’ve been coding with open-source software for more than a little while, there are probably other programmers who have earned your respect. I can think of a few developers off the top of my head whose code is downright enviable.

If you don’t have a respected developer in mind, it’s easy to find one. S/he has probably authored some code in one of the previous two sections (code you rely upon, or that impresses you).

# Read code that you can actually grok

If you’re the adventurous type you may be considering diving into a large project like Ruby on Rails, Drupal, or jQuery. I suggest avoiding projects like these for now unless you are an experienced code reader.

Large projects have a lot more moving pieces, and you may end up struggling too much with the concepts to learn anything of immediate value. Confusion leads to discouragement, and larger projects more likely to confuse and discourage you in your reading. The advantage of picking a small project to read is that you can hold the entire program logic in your head at once. This leaves you with just the details to discover and learn from.

# How to Read

Now that you’ve chosen some code to read, what is the best way to go about reading it? I’ve read a lot of code in my days, and I can suggest a few ways to maximize your ROI.

# See the big picture

I’m going to assume that you at least know at a macro level what the code you’re reading accomplishes. If not, I suggest reading the project’s website, tutorials, documentation, and anything else you can get your hands on except the code.

Okay, with that cleared I suggest your first step is to wrap your head around the project’s structure. This is a variable amount of work depending on the size of the codebase you’ve chosen, but anything larger than one file will require a little bit of time.

First, note the file structure. This step is aided by an editor that has a folder hierarchy view like TextMate. For example, here is a nice overview of the Twitter Ruby gem.

The goal with this step is to just get familiar with the source. Find out which files include/require/load other files, where the bulk of the code is, the namespaces used if any, and things of this nature. Once you’ve got the big picture you’ll be ready to dig into the details.

![code structure](https://changelog-assets.s3.amazonaws.com/twitter-folder-structure.png "code structure")

# Document your findings

Reading code should not be a passive activity. I encourage you to add comments as you go, documenting your assumptions and your conclusions as you begin to understand the program flow. When you first get started your comments will probably look something like:

- I think this function is called after 'initialize'
- What does this equation even do?
- Pretty sure this variable loses scope after line 17

As your understanding progresses you can remove the little breadcrumb comments you left yourself and perhaps write more meaningful and authoritative comments that could possibly be committed back to the project.

# Use the tests, Luke

Hopefully the project you’ve chosen has a test suite. If not, you can skip this section altogether (or find one that does).

Tests are a great place to start whenever you read somebody else’s code because they document what the code is supposed to accomplish. Some tests are more informative than others, but no matter how well written, you’ll often find the programmer’s intent in the tests much more easily than you’ll find it in the implementation. While you’re reading, try to get the test suite to run successfully. This will make sure your development environment is configured properly and will make you more confident when making changes.

# Execute, change stuff, execute

Who said reading code had to be hands off? You’ll really start to understand things once you’ve broken everything and put it back together again. Remember those tests you got passing? Make them fail, add some more, or try changing the implementation without breaking them. Try adding a small feature that you think is cool, or setup project-wide logging so you can print output at various stages of the code. Is this still reading? Absolutely, but at this point its more of a choose your own adventure than a mystery novel. And that’s a good thing!

# Rinse and repeat

Once you finish reading one codebase, pick another one and start the process over again. The more code you read, the better you get at reading it and the more you get out of it in less time. I think you’ll find that the ROI increases quite quickly and that it’s actually a very enjoyable way to learn.

# Where To Start

The single most influential factor in my code reading is GitHub. The site makes it so easy to find new projects and great coders that you’re doing yourself a disservice if you’re not leveraging it. I suggest starting on GitHub and reading code right on the site until you find a project you know you can learn from. Then git clone that baby and get to reading!

How about you? Do you read code as a learning tool? Which projects would you recommend to others? Read any good code lately?


