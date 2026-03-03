import { HeroSection } from "@/components/hero-section"
import { TableOfContents } from "@/components/table-of-contents"
import { ArticleContent } from "@/components/article-content"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { CustomCursor } from "@/components/custom-cursor"
import { IntroLoader } from "@/components/intro-loader"

export default function Page() {
  return (
    <>
      <IntroLoader />
      <CustomCursor />
      <ScrollProgress />
      <SiteHeader />
      <main>
        <HeroSection />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="flex flex-col gap-16 lg:flex-row">
            <aside className="lg:sticky lg:top-28 lg:h-fit lg:w-64 lg:shrink-0">
              <TableOfContents />
            </aside>
            <article className="min-w-0 flex-1">
              <ArticleContent />
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
