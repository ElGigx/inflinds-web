# Llamadas a Merez

Lo que el sitio le pide hoy a Merez. Todo sale de `src/lib/content.ts` y `src/components/MerezSdk.tsx`.

## Lectura pública del blog

Sin credencial. Base: `${NEXT_PUBLIC_MEREZ_API_URL}` (o `MEREZ_CONTENT_API_URL` si está definida), por defecto `https://api.merez.co/api/v1`, más `/public/sites/{slug}`. El slug es `MEREZ_SITE_SLUG`, por defecto `inflinds`.

| Qué | Llamada |
|---|---|
| Lista de artículos indexables | `GET /blog/posts?indexable=1&per_page=100&page=N` |
| Un artículo por su ruta | `GET /blog/resolve?path={categoria}/{slug}` |
| Autores | `GET /blog/authors` |
| Un autor | `GET /blog/authors/{slug}` |

Las respuestas se guardan 300 segundos (`REVALIDATE_SECONDS`). Si Merez no responde, la función devuelve `null` o una lista vacía y el sitio muestra su página de «sin publicaciones» en vez de romperse.

## SDK de Merez

`MerezSdk` carga `NEXT_PUBLIC_MEREZ_SDK_URL` solo si existe `NEXT_PUBLIC_MEREZ_INGEST_KEY`, y lo inicia con la API, el nombre del socio del chat (`NEXT_PUBLIC_MEREZ_PORTAL_PARTNER`) y la versión de la política de privacidad. Ahí vive la analítica, los formularios y el chat.

## Credenciales

La llave de ingest del SDK es pública por diseño (va en el navegador). Cualquier credencial de servidor es otra cosa y no se pone en el código ni en `NEXT_PUBLIC_*`.
