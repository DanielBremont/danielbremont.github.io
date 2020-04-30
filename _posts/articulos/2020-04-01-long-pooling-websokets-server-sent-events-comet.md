---
layout: post
title: What are Long-Polling, Websockets, Server-Sent Events (SSE) and Comet?
categories: [articles]
tags: []
---

[Ir](https://stackoverflow.com/a/12855533){:target="_blank"}

In the examples below the client is the browser and the server is the webserver hosting the website.
Before you can understand these technologies, you have to understand classic HTTP web traffic first.

<!--more-->

# Regular HTTP

- A client requests a webpage from a server.
- The server calculates the response
- The server sends the response to the client.


![regular http](https://i.stack.imgur.com/TK1ZG.png "regular http")

# Ajax Polling

- A client requests a webpage from a server using regular HTTP (see HTTP above).
- The client receives the requested webpage and executes the JavaScript on the page which requests a file from the server at regular intervals (e.g. 0.5 seconds).
- The server calculates each response and sends it back, just like normal HTTP traffic.

![ajax polling](https://i.stack.imgur.com/qlMEU.png "ajax polling")

# Ajax Long-Polling

- A client requests a webpage from a server using regular HTTP (see HTTP above).
- The client receives the requested webpage and executes the JavaScript on the page which requests a file from the server.
- The server does not immediately respond with the requested information but waits until there's new information available.
- When there's **new** information available, the server responds with the new information.
- The client receives the new information and immediately sends another request to the server, re-starting the process.

![long-pooling](https://i.stack.imgur.com/zLnOU.png "long-pooling")

# HTML5 Server Sent Events (SSE) / EventSource

- A client requests a webpage from a server using regular HTTP (see HTTP above).
- The client receives the requested webpage and executes the JavaScript on the page which opens a connection to the server.
- The server sends an event to the client when there's new information available.
    - Real-time traffic from server to client, mostly that's what you'll need
    - You'll want to use a server that has an event loop
    - Connections with servers from other domains are only possible [with correct CORS settings](https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource)

![server send events](https://i.stack.imgur.com/ziR5h.png "server send events")

# HTML5 Websockets

- A client requests a webpage from a server using regular http (see HTTP above).
- The client receives the requested webpage and executes the JavaScript on the page which opens a connection with the server.
- The server and the client can now send each other messages when new data (on either side) is available.
    - Real-time traffic from the server to the client and from the client to the server
    - You'll want to use a server that has an event loop
    - With WebSockets it is possible to connect with a server from another domain.
    - It is also possible to use a third party hosted websocket server, for example Pusher or others. This way you'll only have to implement the client side, which is very easy!


![sockets](https://i.stack.imgur.com/CgDlc.png "sockets")


# Comet

Comet is a collection of techniques prior to HTML5 which use streaming and long-polling to achieve real time applications. Read more on [wikipedia](https://en.wikipedia.org/wiki/Comet_%28programming%29) or [this](https://www.ibm.com/developerworks/web/library/wa-reverseajax1/index.html) article.