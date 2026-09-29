**7512 · LABORATORIO DE DESARROLLO DE APLICACIONES WEB**

# Plantilla de contrato de APIInformación general

|     |     |
| --- | --- |
| **Campo** | **Definición** |
| Nombre de la API | API de publicaciones |
| URL base | /api |
| Formato principal | application/json |
| Responsable | Armeni Fabricio – Becchio Martin – Gomez Santiago |
| Versión o fecha | 28/9/2026 |

# Endpoint: GET /api/publicaciones

|     |     |
| --- | --- |
| **Campo** | **Definición** |
| Recurso | Coleccion de publicaciones |
| Propósito | Listar publicaciones |
| Método HTTP | GET |
| Endpoint | /api/publicaciones |
| Parámetros de ruta | No utiliza |
| Query string | Autor, categoria, etiqueta, pagina, limite |
| Encabezados de solicitud | Accept: application/json (opcional) |
| Cuerpo JSON | No utiliza |
| Reglas de validación | No requiere |
| Respuesta exitosa | 200 OK con arreglo JSON |
| Encabezados de respuesta | Content-Type: application/json |
| Respuestas de error | 400 Solicitud inválida |

## Ejemplo de solicitud

GET /api/publicaciones

## Ejemplo de respuesta

200 OK

\[{"titulo":"Venta de apuntes","descripcion":"Vendo apuntes de matemática para estudiar","autor": "Juan","categoria": "general","fechaPublicacion": "2026-09-28T22:24:15.214Z","activa": true,"destacado": false,"id":1,"etiquetas":\[\],"reportes":\[\],"estado":"pendiente"}\]

# Endpoint: GET /api/publicaciones/:id

|     |     |
| --- | --- |
| **Campo** | **Definición** |
| Recurso | Una publicacion |
| Propósito | Consultar una publicación por identificador |
| Método HTTP | GET |
| Endpoint | /api/publicaciones/:id |
| Parámetros de ruta | Id: numero entero |
| Query string | No utiliza |
| Encabezados de solicitud | Accept: application/json (opcional) |
| Cuerpo JSON | No utiliza |
| Reglas de validación | Convertir id a número y buscarlo |
| Respuesta exitosa | 200 OK con la publicación |
| Encabezados de respuesta | Content-Type: application/json |
| Respuestas de error | 404 si la publicación no existe |

## Ejemplo de solicitud

GET /api/publicaciones/:id

## Ejemplo de respuesta

200 OK

{"titulo":"Venta de apuntes","descripcion":"Vendo apuntes de matemática para estudiar","autor": "Juan","categoria": "general","fechaPublicacion": "2026-09-28T22:24:15.214Z","activa": true,"destacado": false,"id":1,"etiquetas":\[\],"reportes":\[\],"estado":"pendiente"}

# Endpoint: POST /api/publicaciones

|     |     |
| --- | --- |
| **Campo** | **Definición** |
| Recurso | Coleccion de publicaciones |
| Propósito | Crear una publicacion |
| Método HTTP | POST |
| Endpoint | /api/publicaciones |
| Parámetros de ruta | No utiliza |
| Query string | No utiliza |
| Encabezados de solicitud | Content-Type: application/json |
| Cuerpo JSON | titulo: string obligatorio; descripcion: string obligatorio; autor: string obligatorio; categoria: string opcional; |
| Reglas de validación | Titulo: entre 5 y 80 caracteres; descripcion: entre 20 y 500 caracteres; autor: no vacío, categoria: \[“general”,”aviso”,”evento”,”compraventa”\] |
| Respuesta exitosa | 201 OK con la publicación creada |
| Encabezados de respuesta | Content-Type: application/json; Location: /api/sabores/{id} |
| Respuestas de error | 400 ante datos inválidos |

## Ejemplo de solicitud

POST /api/publicaciones

{"titulo":"Vendo apuntes de Matemática I","descripcion":"Vendo apuntes de Matemática I para preparar los exámenes","autor":"Juan","categoria":"compraventa”}

## Ejemplo de respuesta

201 Created

{"titulo":"Venta de apuntes","descripcion":"Vendo apuntes de matemática para estudiar","autor": "Juan","categoria": "general","fechaPublicacion": "2026-09-28T22:24:15.214Z","activa": true,"destacado": false,"id":1,"etiquetas":\[\],"reportes":\[\],"estado":"pendiente"}

400 Bad Request

{ "error": "El autor es obligatorio"}

# Endpoint: PUT /api/publicaciones/:id

|     |     |
| --- | --- |
| **Campo** | **Definición** |
| Recurso | Una publicacion |
| Propósito | Reemplazar datos de una publicacion |
| Método HTTP | PUT |
| Endpoint | /api/publicaciones/:id |
| Parámetros de ruta | Id: numero entero |
| Query string | No utiliza |
| Encabezados de solicitud | Content-Type: application/json |
| Cuerpo JSON | titulo: string opcional; descripcion: string opcional; autor: string opcional; categoria: string opcional; |
| Reglas de validación | Titulo: entre 5 y 80 caracteres; descripcion: entre 20 y 500 caracteres; autor: no vacío; categoria: \[“general”,”aviso”,”evento”,”compraventa”\] |
| Respuesta exitosa | 200 OK con la publicacion actualizada |
| Encabezados de respuesta | Content-Type: application/json; |
| Respuestas de error | 400 por datos inválidos; 404 si no existe |

## Ejemplo de solicitud

PUT /api/publicaciones/1

{"titulo":"Vendo apuntes de Lengua y Literatura IV","descripcion":"Vendo apuntes de Lengua y Literatura IV para estudiar","}

## Ejemplo de respuesta

201 Created

{"titulo":" Vendo apuntes de Lengua y Literatura IV ","descripcion":" Vendo apuntes de Lengua y Literatura IV para estudiar","autor": "Juan","categoria": "general","fechaPublicacion": "2026-09-28T22:24:15.214Z","activa": true,"destacado": false,"id":1,"etiquetas":\[\],"reportes":\[\],"estado":"pendiente"}

400 Bad Request

{ "error": "La descripcion debe tener entre 20 y 500 caracteres"}

404 Not Found

{"error": "No encontrada"}

# Endpoint: DELETE /api/publicaciones/:id

|     |     |
| --- | --- |
| **Campo** | **Definición** |
| Recurso | Una publicacion |
| Propósito | Eliminar una publicacion |
| Método HTTP | DELETE |
| Endpoint | /api/publicaciones/:id |
| Parámetros de ruta | Id: numero entero |
| Query string | No utiliza |
| Encabezados de solicitud | No requiere |
| Cuerpo JSON | No utiliza |
| Reglas de validación | Comprobar que el identificador exista |
| Respuesta exitosa | 204 No Content |
| Encabezados de respuesta | No require Location |
| Respuestas de error | 404 si no existe |

## Ejemplo de solicitud

DELETE /api/publicaciones/1

## Ejemplo de respuesta

204 No Content, sin cuerpo

404 Not Found

{"error": "No encontrada"}

# Endpoint: POST /api/publicaciones/:id/reportes

|     |     |
| --- | --- |
| **Campo** | **Definición** |
| Recurso | Una publicacion |
| Propósito | Reportar una publicacion |
| Método HTTP | POST |
| Endpoint | /api/publicaciones/:id/ reportes |
| Parámetros de ruta | Id: numero entero |
| Query string | No utiliza |
| Encabezados de solicitud | Content-Type: application/json |
| Cuerpo JSON | Usuario: string obligatorio; motivo: string obligatorio |
| Reglas de validación | El mismo usuario no puede reportar varias veces la misma publicación. |
| Respuesta exitosa | 201 Created |
| Encabezados de respuesta | Content-Type: application/json; |
| Respuestas de error | 400 ante datos inválidos, 404 si no encuentra la publicacion |

## Ejemplo de solicitud

POST /api/publicaciones/1/reportes

{"usuario”:”Juan”,”motivo”:”Contenido inapropiado”}

## Ejemplo de respuesta

201 Created

400 Bad Request

{ "error": " El usuario ya reportó esta publicación"}

404 Not Found

{"error": "No encontrada"}

# Endpoint: GET /api/libros

|     |     |
| --- | --- |
| **Campo** | **Definición** |
| Recurso | Una coleccion de libros |
| Propósito | Buscar libros |
| Método HTTP | GET |
| Endpoint | /api/libros |
| Parámetros de ruta | No utiliza |
| Query string | q string |
| Encabezados de solicitud | No utiliza |
| Cuerpo JSON | No utiliza |
| Reglas de validación | Q: Al menos 3 caracteres |
| Respuesta exitosa | 200 OK con los libros |
| Encabezados de respuesta | Content-Type: application/json |
| Respuestas de error | 400 si los datos son invalidos, 502 no fue possible consultar el servicio de libros, 504 timeout |

## Ejemplo de solicitud

GET /api/libros/?q=metamorfosis

## Ejemplo de respuesta

200 OK

\[{“titulo”:” La metamorfosis”,”autores”:”Franz Kafka”,”anio”: 1915}\]

400 Bad Request

{ "error": "Ingresá al menos 3 caracteres"}

504 Timeout

{ "error": "El servicio de libros demoró demasiado"}

502 Bad Gateway

{ "error": "No fue posible consultar el servicio de libros"}