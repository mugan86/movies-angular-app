# Instrucciones de uso para uso y mantenimiento

En este directorio principal se van a guardar todos los ficheros de extensión JSON con los valores clave y su traducción para los diferentes idiomas que pueda tener la aplicación. ...

...Por el momento está configurado de tal manera para que solo cargue el español, pero si en el futuro quisieramos habilitar más idiomas como el Inglés, Euskera, Italiano,... tendríamos que realizar los siguientes pasos.

## 1.- Crear un servicio para gestionar el estado del idioma / selección del idioma

Creamos un servicio
```ng g s @core/services/i18n```

En el constructor añadimos el servicio

```constructor(private translate: TranslateService) {}```

## 2.- El idioma que vamos a usar

Tendremos que implementar lo siguiente en el constructor
```this.translate.use(<código_idioma>);```
Al querer especificar el Español (es), lo haremos así:
```this.translate.use('es');```

## 3.- Añadir los textos para el idioma Español

La estructura principal la vamos a encontrar en **assets/@data/i18n** y dentro de ello he añadido las siguientes carpetas para poder tener la carga perezosa junto con los móddulos, a medida que vamos cargando diferentes páginas:

* app: En esta carpeta se almacenan los textos como información de alertas, textos de las opciones del menú principal,...todo lo que se cargará en la primera página.
* movies: Textos relacionados a la página principal de las películas.
* movies-details: Todo lo que conlleva a la página de detalles de una película seleccionada.
* movies-forms: Textos del formulario de crear / editar información de películas.
* companies: Textos para mostrar los estudios (companies)
* actors: Lista de actores.

Ahora bien, teniendo en cuenta esto, para trabajar con el Español, dentro de cada carpeta añadiremos un fichero **es.json** con sus textos y eso lo haremos en cada apartado para cargar de manera escalonada lo que iremos necesitando.

## 4.- Añadir más idiomas

Para añadir más idiomas, tendremos que hacer lo siguiente. Por ejemplo, si queremos añadir el Inglés, tendremos que crear en cada carpeta un fichero **en.json** y si fuese Euskera **eu.json** y así sucesivamente con los códigos de idiomas necesarios. ...
...Para asignar correctamente el código, seguimos [este enlace](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) para coger el código (**ISO 639-1**) acorde al idioma seleccionado.

## 5.- Adaptar para seleccionar idiomas desde la app








