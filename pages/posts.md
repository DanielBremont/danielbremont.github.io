---
layout: page
title: Posts
orden: 5
---

<ul>
{% for cat in site.categories %}
<li>
  <a href="#{{ cat[0] }}"> {{ cat[0] }} ({{ cat[1].size }})</a>
  </li>
{% endfor %}
</ul>

{% for cat in site.categories %}
  <h2 id="{{ cat[0] }}">{{ cat[0] }}</h2>
  <ul>
    
    {% assign sortedPosts = cat[1] | sort: 'title' %}

    {% for post in sortedPosts %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}

  </ul>
{% endfor %}