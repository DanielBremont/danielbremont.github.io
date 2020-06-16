---
layout: page
title: Proyectos
orden: 3
---

<ul>

{% for post in site.posts %} 
   {% if post.categories contains "proyectos" %}
       <li><a href="{{ post.url }}">{{ post.title }}</a></li>
   {% endif %}
{% endfor %}

</ul>