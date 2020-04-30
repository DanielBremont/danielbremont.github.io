---
layout: post
title: Session replay
categories: [articles]
tags: [cs]
---

[Session replay](https://en.wikipedia.org/wiki/Session_replay){:target="_blank"}

<!--more-->

Session replay is the ability to replay a visitor's journey on a web site or within a mobile application or web application. Replay can include the user's view (browser or screen output), user input (keyboard and mouse inputs), and logs of network events or console logs. It is supposed to help improve customer experience and to identify obstacles in conversion processes on websites. However it can also be used to study web site usability and customer behavior as well as handling customer service questions as the customer journey with all interactions can be replayed. Some organizations even use this capability to analyse fraudulent behavior on websites.

Some solutions augment the session replay with advanced analytics that can identify segments of customers that are struggling to use the website. This means the replay capability can be used much more efficiently and reduce the need to replay customer sessions unnecessarily.

There are generally two ways to capture and replay visitor sessions, client side and tag-free server side.

# Client side

There are many tag-based solutions that offer video-like replay of a visitors session. While replay is analogous to video, it is more accurately a reproduction of a specific user's experience down to mouse movements, clicks, taps, and scrolls. The underlying data for the session recordings is captured by tagging pages. Some advanced tools are able to access the DOM directly and can play back most interactions within the DOM including all mutations with a high degree of accuracy. There are a number of tools out there that provide similar functions. Advantage is that you replay in a movie-like format the full client experience. It also can deal with modern single-page applications. The disadvantage is that the tracking script can easily be detected and blocked by any ad blocker which becomes the normal (2017: 615M devices with active adblock).

# Tag-free server side

Solutions capture all website traffic and replay every visitor interaction, from every device, including all mobile users from any location. Sessions are replayed step-by-step, providing the ability to search, locate and analyze aspects of a visitors session including clicks and form entry. Server-side solutions require hardware and software to be installed "on premises." Advantage of server-side recording is that the solution can't be blocked. Unfortunately, you won't be able to see a video like replay of client-side activities such as scrolling, mouse movements, and deals badly with modern single-page applications.


