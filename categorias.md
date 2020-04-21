---
layout: page
title: Categorias
date: 2020-01-01 00:00:00
---

**Post :** {{site.posts | size}}

{% for cat in site.categories %}
  <h2 id="{{ cat[0] }}">{{ cat[0] }} ({{ cat[1].size }})</h2>
  <ul>
    
    {% for post in cat[1] reversed %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}

  </ul>
{% endfor %}