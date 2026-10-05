const API = (process.env.MEREZ_CONTENT_API_URL ?? process.env.NEXT_PUBLIC_MEREZ_API_URL ?? "https://api.merez.co/api/v1").replace(/\/$/, "");

const SITE = process.env.MEREZ_SITE_SLUG ?? "inflinds";

export const REVALIDATE_SECONDS = 300;

export const EMPTY_SLUG = "sin-publicaciones";

export interface ContentSource {
  title: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ContentType = "help" | "hero" | "timely" | "research";

export const CONTENT_TYPES: Record<ContentType, { label: string; section: string; blurb: string }> = {
  hero: { label: "Destacado", section: "Destacados", blurb: "Lanzamientos, hitos y las guías de referencia de Inflinds." },
  timely: { label: "Actualidad", section: "Actualidad", blurb: "Lo que acaba de pasar y cómo te afecta." },
  research: { label: "Investigación", section: "Investigación", blurb: "Datos y análisis propios, firmados por su autor." },
  help: { label: "Guía", section: "Guías", blurb: "Respuestas claras para decidir y hacer." },
};

export const TYPE_ORDER: ContentType[] = ["hero", "timely", "research", "help"];

export interface Author {
  id?: number;
  name: string;
  slug: string;
  role: string | null;
  bio: string | null;
  expertise: string | null;
  photo_url: string | null;
  same_as: string[] | null;
  posts_count?: number;
}

export interface PostCard {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string | null;
  content_type?: ContentType;
  written_by?: "ai" | "author";
  byline?: string;
  author_profile?: Author | null;
  reviewer?: Author | null;
  event_date?: string | null;
  featured_image: string | null;
  featured_image_alt: string | null;
  published_at: string | null;
  updated_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  reading_minutes?: number;
  category?: { id: number; name: string; slug: string } | null;
}

export interface PostDetail extends PostCard {
  faq: FaqItem[] | null;
  sources: ContentSource[] | null;
  target_keyword: string | null;
  og_image: string | null;
}

export interface PostPage {
  post: PostDetail;
  contentHtml: string;
  readingMinutes: number;
  related: PostCard[];
}

export interface LogEntry {
  id: number;
  type: string;
  type_label?: string | null;
  happened_on: string;
  headline: string;
  slug: string | null;
  body: string | null;
  main_image: string | null;
  source_url: string | null;
  sources: ContentSource[] | null;
  updated_at: string | null;
}

async function get<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API}/public/sites/${SITE}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function paginate<T>(path: string): Promise<T[]> {
  const items: T[] = [];
  for (let page = 1; page <= 50; page++) {
    const separator = path.includes("?") ? "&" : "?";
    const data = await get<{ data: T[]; last_page?: number; meta?: { last_page?: number } }>(`${path}${separator}per_page=100&page=${page}`);
    if (!data) break;
    items.push(...data.data);
    const last = data.last_page ?? data.meta?.last_page ?? 1;
    if (page >= last) break;
  }
  return items;
}

export function postPath(post: Pick<PostCard, "slug" | "category">): string {
  return `/blog/${post.category?.slug ?? "blog"}/${post.slug}/`;
}

export async function allPosts(): Promise<PostCard[]> {
  return paginate<PostCard>("/blog/posts?indexable=1");
}

export async function postPage(category: string, slug: string): Promise<PostPage | null> {
  const data = await get<{ type: string; post: PostDetail; content_html: string; reading_minutes: number; related: PostCard[] }>(
    `/blog/resolve?path=${encodeURIComponent(`${category}/${slug}`)}`,
  );
  if (!data || data.type !== "post") return null;
  return { post: data.post, contentHtml: data.content_html, readingMinutes: data.reading_minutes, related: data.related ?? [] };
}

export function authorPath(author: Pick<Author, "slug">): string {
  return `/authors/${author.slug}/`;
}

export async function allAuthors(): Promise<Author[]> {
  return (await get<Author[]>("/blog/authors")) ?? [];
}

export async function authorPage(slug: string): Promise<{ author: Author; written: PostCard[]; reviewed: PostCard[] } | null> {
  return get(`/blog/authors/${encodeURIComponent(slug)}`);
}

export function typeOf(post: Pick<PostCard, "content_type">): ContentType {
  return post.content_type && post.content_type in CONTENT_TYPES ? post.content_type : "help";
}

export function entryPath(entry: Pick<LogEntry, "slug">): string {
  return `/log/${entry.slug}/`;
}

export async function allEntries(): Promise<LogEntry[]> {
  const entries = await paginate<LogEntry>("/project-log/entries");
  return entries.filter((e) => e.slug);
}

export function paragraphs(text: string | null): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function longDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Bogota" }).format(
    new Date(iso.length === 10 ? `${iso}T12:00:00-05:00` : iso),
  );
}
