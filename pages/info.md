---
layout: page
title: Información
orden: 9
---

<div class="message">
<strong> Monozukuri :</strong> Making Things <strong>"that matter to me 😉"</strong>. <br/>
Log/blog agregación de la información que consulto.
 </div>

> What one fool can do, another can. <br/> *Ancient Simian Proverb*
 
# Temas

- Matemáticas aplicadas
- Inteligencia Artificial
- Programación
- Autoreflección/Autoanálisis

# Proyectos

- Hacer un word cloud sobre los temas del blog.
- dlogme, analiticas personales, con su interfaz web.
    - Integracion con correos
    - Google Tasks
- Detector de autores en la escritura

# Estadísticas
- Ultima Compilacion: {{site.time | date_to_string}} <br/>
- Cantidad de Posts: {{site.posts | size}}

# Search

<form action="/search.html" method="get">
  <label for="search-box">Search</label>
  <input type="text" id="search-box" name="query">
  <input type="submit" value="search">
</form>

<ul id="search-results"></ul>

<script>
  window.store = {
    {% for post in site.posts %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "category": "{{ post.category | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="/public/js/search.js"></script>
