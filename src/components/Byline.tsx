import Link from "next/link";
import { authorPath, type PostCard } from "@/lib/content";

export default function Byline({ post, className = "" }: { post: Pick<PostCard, "written_by" | "author_profile" | "reviewer" | "author">; className?: string }) {
  if (post.written_by === "ai") {
    return (
      <span className={className}>
        Escrito con IA
        {post.reviewer && (
          <>
            {" · revisado por "}
            <Link href={authorPath(post.reviewer)} className="font-semibold text-ink hover:text-magenta">
              {post.reviewer.name}
            </Link>
          </>
        )}
      </span>
    );
  }

  if (post.author_profile) {
    return (
      <span className={className}>
        Por{" "}
        <Link href={authorPath(post.author_profile)} className="font-semibold text-ink hover:text-magenta">
          {post.author_profile.name}
        </Link>
        {post.author_profile.role ? `, ${post.author_profile.role}` : ""}
      </span>
    );
  }

  return <span className={className}>{post.author ?? "Inflinds"}</span>;
}
