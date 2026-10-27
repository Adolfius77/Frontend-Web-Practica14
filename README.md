## Preguntas
¿por qué en la pestaña red salen dos peticiones al cargar?
es por StrictMode en desarrollo, react monta dos veces para detectar problemas.

¿qué pasa si quitas el arreglo de dependencias del efecto? Muéstralo en la pestaña Red
Si quitas el arreglo de dependencias del efecto se ejecuta en cada render y se dispara un montón de requests en red

¿qué hace e.preventDefault() y qué pasa si lo quitas?
evita que el form recargue la página. Si lo quitas, se refresca y puede interrumpir el flujo del pago
