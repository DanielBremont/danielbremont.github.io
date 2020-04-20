---
layout: page
title: Categorias
---

**Post :** {{site.posts | size}}

<ul>
{% for cats in site.categories %}
  <li><a href="#{{cats[0]}}">{{ cats[0] }} ({{ cats[1].size }})</a></li>
{% endfor %}
</ul>

{% for cat in site.categories %}
  <h3 id="{{ cat[0] }}">{{ cat[0] }}</h3>
  <ul>
    
    {% for post in cat[1] reversed %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}

  </ul>
{% endfor %}