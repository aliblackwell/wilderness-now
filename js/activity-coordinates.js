---
---
var allLocationsList = [
{% for parent in site.data.parent-activities %}
 {%for activity in site.data.[parent.slug] %}


 {% assign coords = activity.coords | split: ", " %}
 {% assign latitude = coords[0] %}
 {% assign longitude = coords[1] %}
   {% if latitude %}
     // [new kartograph.LonLat({{longitude}}, {{latitude}}), {"title":"{{activity.title}}", "slug": "{{activity.slug}}" }, false],
     {
       "name": "{{activity.title}}",
       "lat": {{latitude}},
       "long": {{longitude}},
       "slug": "{{activity.slug}}"
     },
   {% endif %}
  {% endfor %}
{% endfor %}
]

var allLocationsLabels = [
{% for parent in site.data.parent-activities %}
 {%for activity in site.data.[parent.slug] %}


 {% assign coords = activity.coords | split: ", " %}
 {% assign latitude = coords[0] %}
 {% assign longitude = coords[1] %}
   {% if latitude %}
     [new kartograph.LonLat({{longitude}}, {{latitude}}), {"title":"{{activity.title}}", "slug": "{{activity.slug}}" }, false],

   {% endif %}
  {% endfor %}
{% endfor %}
]

var allLocationsObj = [
{% for parent in site.data.parent-activities %}
 {%for activity in site.data.[parent.slug] %}


 {% assign coords = activity.coords | split: ", " %}
 {% assign latitude = coords[0] %}
 {% assign longitude = coords[1] %}
   {% if latitude %}
     {
       "name": "{{activity.title}}",
       "lat": {{latitude}},
       "long": {{longitude}},
       "slug": "{{activity.slug}}"
     },
   {% endif %}
  {% endfor %}
{% endfor %}
]

