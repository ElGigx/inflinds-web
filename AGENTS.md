# AGENTS.md

Instrucciones para cualquier agente de código (Claude Code, Codex u otro) que trabaje en este repositorio.

## Qué es esto

El sitio público de **Inflinds** (inflinds.com), hecho con Next.js y desplegado en **Vercel** desde la rama `main`. Tiene su propio desarrollo y sigue su propio camino: este archivo no cambia dónde ni cómo se despliega.

Está conectado a **Merez**, la plataforma que guarda el blog, los autores, el CRM y la marca del negocio. Merez puede proponer cambios aquí, **siempre como pull request**: nada llega a la rama de producción sin que una persona lo revise y lo apruebe.

## Reglas

- Cambia el sitio con una rama y un pull request. No empujes directo a `main`.
- No toques la configuración de despliegue (`vercel.json`, dominios, variables de Vercel) como parte de otro cambio.
- Ninguna llave, token ni contraseña va en el código, en un `.env.example` ni en un commit. Los valores viven en Vercel y, en local, en `.env.local`.
- Antes de empujar: `npm run build` tiene que pasar y `npm run lint` no puede empeorar (hoy arrastra 3 errores y varias advertencias anteriores).

## De dónde sale cada dato

| Dato | Dónde vive | Cómo se lee |
|---|---|---|
| Artículos, categorías y autores del blog | Merez | API pública con `src/lib/content.ts` (se revalida cada 5 minutos) |
| Leads de contacto y chat | Merez (CRM) | SDK de Merez, cargado en `src/components/MerezSdk.tsx` |
| Servicios, planes, clientes, metodología | Este repositorio | `src/lib/site.ts`, `src/lib/plans.ts` y `src/lib/service-pages.ts` |
| Herramientas | Este repositorio | `src/lib/tools*.ts` |

Los servicios y los planes están escritos a mano en el código. Mientras sigan así, un cambio de precio o de texto es un cambio de código y va por pull request.

## Conexión con Merez

`merez.json` dice a qué sitio de Merez pertenece este repositorio (`site`) y a qué API apunta (`api`). Lo puede actualizar Merez cuando se conecta el repositorio; los demás campos que se agreguen aquí no se tocan.

Las variables de entorno están en `.env.example` (solo nombres). `docs/MEREZ-API.md` explica las llamadas que hace el sitio.

## Qué no existe todavía

Los textos del negocio no son «claves de contenido» editables desde Merez: ninguna etiqueta del sitio lleva `data-merez-content`. Si algún día se adopta, el cambio es aparte y se discute antes.
