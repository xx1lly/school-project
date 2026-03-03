"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// Smooth scroll-triggered reveal with multiple animation types
function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "fadeUp",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "blur"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const animations = {
    fadeUp: {
      from: { opacity: 0, transform: "translateY(50px)" },
      to: { opacity: 1, transform: "translateY(0) " },
    },
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideLeft: {
      from: { opacity: 0, transform: "translateX(-60px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },
    slideRight: {
      from: { opacity: 0, transform: "translateX(60px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },
    scale: {
      from: { opacity: 0, transform: "scale(0.9)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    blur: {
      from: { opacity: 0, filter: "blur(10px)", transform: "translateY(20px)" },
      to: { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
    },
  }

  const anim = animations[animation]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? anim.to : anim.from),
        transition: `all 0.9s cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  )
}

// Stagger-reveal wrapper using IntersectionObserver
function StaggerReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`stagger-reveal ${className}`}>
      {children}
    </div>
  )
}

function ExampleBlock({ text, explanation }: { text: string; explanation: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group cursor-default border-l-2 border-foreground/15 py-3 pl-6 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? "oklch(0.1 0 0)" : undefined,
        paddingLeft: isHovered ? "28px" : "24px",
        transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <p className="font-serif text-lg italic leading-relaxed text-foreground sm:text-xl">
        {text}
      </p>
      <p
        className="mt-2 text-sm leading-relaxed text-muted-foreground"
        style={{
          opacity: isHovered ? 1 : 0.7,
          transition: "opacity 0.4s ease",
        }}
      >
        {explanation}
      </p>
    </div>
  )
}

// Interactive magnetic card
function MagneticCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("")

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8
    setTransform(`perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(5px)`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)")
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-card ${className}`}
      style={{
        transform,
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  )
}

function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = "scaleX(1)"
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="h-px w-full bg-border"
      style={{
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    />
  )
}

function SectionHeading({
  id,
  number,
  title,
}: {
  id: string
  number: string
  title: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div id={id} className="mb-12 scroll-mt-28" ref={ref}>
      <div className="flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-foreground font-mono text-sm font-bold text-foreground"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-10deg)",
            transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {number}
        </span>
        <div
          className="h-px flex-1 bg-border"
          style={{
            transform: isVisible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
          }}
        />
      </div>
      <h2
        className="mt-6 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
          filter: isVisible ? "blur(0)" : "blur(3px)",
        }}
      >
        {title}
      </h2>
    </div>
  )
}

// Marquee divider between sections
function MarqueeDivider({ text }: { text: string }) {
  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="mx-8 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/40"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ArticleContent() {
  return (
    <div className="space-y-32">
      {/* SECTION 1: Definition */}
      <section>
        <SectionHeading id="definition" number="01" title="Визначення" />

        <AnimatedSection delay={100} animation="blur">
          <MagneticCard className="mb-8 border border-border bg-secondary p-8">
            <p className="text-sm leading-relaxed text-foreground">
              <strong>Безсполучникове складне речення (БСР)</strong> — це складне речення, предикативні частини якого
              {"з'єднані"} без сполучників і сполучних слів, лише за допомогою інтонації, а на письмі — розділових знаків (коми, крапки з комою, двокрапки, тире).
            </p>
          </MagneticCard>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="mb-6 text-base leading-relaxed text-foreground/80">
            На відміну від складносурядних та складнопідрядних речень, де {"зв'язок"} між частинами виражається за допомогою сполучників
            (<em>і, а, але, що, який, бо</em> тощо), у безсполучниковому реченні {"зв'язок"} між частинами встановлюється
            лише інтонаційно та за змістом.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300} animation="blur">
          <p className="mb-8 text-base leading-relaxed text-foreground/80">
            Безсполучникові речення широко використовуються в усному мовленні, художній літературі та публіцистиці,
            оскільки вони надають висловлюванню динамічності, лаконічності та виразності.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={400} animation="scale">
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <MagneticCard className="border border-border p-6">
              <p className="mb-3 text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground">Складносурядне</p>
              <p className="font-serif text-lg italic text-foreground">
                {"Сонце зайшло, і зорі засяяли."}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{"зв'язок через сполучник «і»"}</p>
            </MagneticCard>
            <MagneticCard className="border-2 border-foreground p-6">
              <p className="mb-3 text-[10px] font-bold tracking-[0.3em] uppercase text-foreground">Безсполучникове</p>
              <p className="font-serif text-lg italic text-foreground">
                {"Сонце зайшло — зорі засяяли."}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{"зв'язок без сполучника"}</p>
            </MagneticCard>
          </div>
        </AnimatedSection>
      </section>

      <MarqueeDivider text="Безсполучникове складне речення" />

      {/* SECTION 2: Types */}
      <section>
        <SectionHeading id="types" number="02" title="Типи смислових відношень" />

        <AnimatedSection delay={100}>
          <p className="mb-12 text-base leading-relaxed text-foreground/80">
            Між частинами безсполучникового складного речення можуть виникати різноманітні смислові відношення.
            Саме від цих відношень залежить вибір розділового знака.
          </p>
        </AnimatedSection>

        {/* Type cards with staggered reveal */}
        <StaggerReveal className="flex flex-col gap-8">
          {[
            {
              num: "01", title: "Перелічувальні", sign: ",",
              desc: "Частини речення перелічують одночасні або послідовні дії та події. Між ними ставиться кома або крапка з комою.",
              example: "Дощ перестав, хмари розійшлися, сонце засяяло.",
              exDesc: "Перелічуються послідовні події. Між частинами ставиться кома.",
            },
            {
              num: "02", title: "Причиново-наслідкові", sign: ":",
              desc: "Друга частина розкриває причину того, про що йдеться в першій, або пояснює її зміст. Ставиться двокрапка.",
              example: "Я не вийшов на вулицю: надворі лив дощ.",
              exDesc: "Друга частина пояснює причину (бо надворі лив дощ).",
            },
            {
              num: "03", title: "Пояснювальні", sign: ":",
              desc: "Друга частина доповнює або розкриває зміст першої. Ставиться двокрапка.",
              example: "Я знав: він не прийде.",
              exDesc: "Друга частина доповнює зміст першої (що саме я знав).",
            },
            {
              num: "04", title: "Зіставно-протиставні", sign: "—",
              desc: "Зміст однієї частини протиставляється або зіставляється із змістом іншої. Ставиться тире.",
              example: "Літо збирає — зима поїдає.",
              exDesc: "Зіставлення двох протилежних дій. Між частинами ставиться тире.",
            },
            {
              num: "05", title: "Умовно-наслідкові", sign: "—",
              desc: "Перша частина виражає умову, друга — наслідок або результат. Ставиться тире.",
              example: "Назвався груздем — полізай у кузов.",
              exDesc: "Перша частина — умова (якщо назвався), друга — наслідок (то полізай).",
            },
            {
              num: "06", title: "Часові", sign: "—",
              desc: "Зміст однієї частини вказує на час дії, описаної в іншій частині. Ставиться тире.",
              example: "Пройшла гроза — засяяла веселка.",
              exDesc: "Перша частина вказує на час (коли пройшла гроза), друга — на результат.",
            },
          ].map((type) => (
            <MagneticCard key={type.num} className="group border border-border p-8 transition-colors duration-500 hover:border-foreground">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                    {"Тип"} {type.num}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">{type.title}</h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center border border-border text-2xl text-foreground transition-all duration-500 group-hover:border-foreground group-hover:bg-foreground group-hover:text-primary-foreground">
                  {type.sign}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                {type.desc}
              </p>
              <div
                className="mt-6 border-t border-border pt-6"
                style={{
                  borderImage: "linear-gradient(to right, oklch(0.88 0 0), transparent) 1",
                }}
              >
                <ExampleBlock text={type.example} explanation={type.exDesc} />
              </div>
            </MagneticCard>
          ))}
        </StaggerReveal>
      </section>

      <MarqueeDivider text="Кома   Крапка з комою   Двокрапка   Тире" />

      {/* SECTION 3: Punctuation */}
      <section>
        <SectionHeading id="punctuation" number="03" title="Розділові знаки" />

        <AnimatedSection delay={100}>
          <p className="mb-12 text-base leading-relaxed text-foreground/80">
            Вибір розділового знака в безсполучниковому складному реченні залежить від смислових відношень між його частинами та інтонації.
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-0">
          {[
            {
              sign: ",", title: "Кома",
              desc: "Ставиться між частинами, які перелічують одночасні або послідовні дії, пов'язані перелічувальною інтонацією.",
              example: "Зірки згасли, небо посвітлішало, подув свіжий вітерець.",
            },
            {
              sign: ";", title: "Крапка з комою",
              desc: "Ставиться, коли частини далекі за змістом або значно поширені, мають свої розділові знаки.",
              example: "Промінь сонця впав на землю; дерева, покриті інеєм, заблищали.",
            },
            {
              sign: ":", title: "Двокрапка",
              desc: "Ставиться, коли друга частина вказує на причину, пояснює або доповнює зміст першої. Можна підставити сполучники бо, тому що, а саме.",
              example: "Мати радіє: син повернувся додому.",
            },
            {
              sign: "—", title: "Тире",
              desc: "Ставиться при зіставленні, протиставленні, коли перша частина виражає умову або час, а також при швидкій зміні подій.",
              example: "Вийшов на вулицю — повітря було свіже і прохолодне.",
            },
          ].map((item, idx) => (
            <AnimatedSection key={item.sign} delay={idx * 120} animation={idx % 2 === 0 ? "slideLeft" : "slideRight"}>
              <div className="group flex gap-8 border-b border-border py-10 transition-all duration-500 hover:bg-secondary/50 hover:px-6">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center border border-foreground font-serif text-4xl font-bold text-foreground transition-all duration-500 group-hover:bg-foreground group-hover:text-primary-foreground"
                >
                  {item.sign}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/70">{item.desc}</p>
                  <p
                    className="mt-4 font-serif text-sm italic text-muted-foreground transition-all duration-500 group-hover:text-foreground/60 group-hover:pl-2"
                  >
                    {item.example}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* SECTION 4: Examples */}
      <section>
        <SectionHeading id="examples" number="04" title="Приклади з літератури" />

        <AnimatedSection delay={100} animation="blur">
          <p className="mb-12 text-base leading-relaxed text-foreground/80">
            Безсполучникові складні речення широко використовуються у творах класиків української літератури,
            надаючи тексту особливу ритмічність та емоційність.
          </p>
        </AnimatedSection>

        <StaggerReveal className="flex flex-col gap-6">
          {[
            {
              text: "Тихесенький вечір на землю спадає, горить Запад золотий.",
              explanation: "Тарас Шевченко. Перелічувальні відношення — кома.",
            },
            {
              text: "Серце не камінь — воно болить.",
              explanation: "Народна мудрість. Протиставлення / наслідок — тире.",
            },
            {
              text: "Я оглянувся: за мною ніхто не йшов.",
              explanation: "Пояснення причини / додаткова інформація — двокрапка.",
            },
            {
              text: "Ліс зашумів, вітер загудів, хмари небо затягли.",
              explanation: "Перелічування одночасних подій — коми.",
            },
            {
              text: "Хочеш мати друзів — будь сам другом.",
              explanation: "Народна мудрість. Умова → наслідок — тире.",
            },
            {
              text: "Зайде сонце — зорі сяють, місяць променіє.",
              explanation: "Тарас Шевченко. Часові відношення — тире.",
            },
          ].map((item, idx) => (
            <MagneticCard key={idx} className="border border-border bg-secondary p-8 transition-colors duration-500 hover:bg-background">
              <ExampleBlock text={item.text} explanation={item.explanation} />
            </MagneticCard>
          ))}
        </StaggerReveal>
      </section>

      <MarqueeDivider text="Синтаксис   Граматика   Пунктуація   Мовознавство" />

      {/* SECTION 5: Comparison Table */}
      <section>
        <SectionHeading id="comparison" number="05" title="Порівняльна таблиця" />

        <AnimatedSection delay={100}>
          <p className="mb-12 text-base leading-relaxed text-foreground/80">
            Порівняння основних типів складних речень в українській мові за засобом {"зв'язку"} між частинами.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200} animation="scale">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="py-5 pr-6 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Тип речення</th>
                  <th className="py-5 pr-6 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">{"Засіб зв'язку"}</th>
                  <th className="py-5 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Приклад</th>
                </tr>
              </thead>
              <tbody>
                <tr className="group border-b border-border transition-colors duration-300 hover:bg-secondary/50">
                  <td className="py-5 pr-6 font-medium text-foreground transition-all duration-300 group-hover:pl-2">Складносурядне</td>
                  <td className="py-5 pr-6 text-foreground/70">Сурядні сполучники</td>
                  <td className="py-5 font-serif italic text-foreground/70">{"Сонце зійшло, і птахи заспівали."}</td>
                </tr>
                <tr className="group border-b border-border transition-colors duration-300 hover:bg-secondary/50">
                  <td className="py-5 pr-6 font-medium text-foreground transition-all duration-300 group-hover:pl-2">Складнопідрядне</td>
                  <td className="py-5 pr-6 text-foreground/70">Підрядні сполучники</td>
                  <td className="py-5 font-serif italic text-foreground/70">{"Коли сонце зійшло, птахи заспівали."}</td>
                </tr>
                <tr className="group bg-secondary transition-colors duration-300">
                  <td className="py-5 pr-6 font-bold text-foreground transition-all duration-300 group-hover:pl-2">Безсполучникове</td>
                  <td className="py-5 pr-6 font-medium text-foreground">Інтонація</td>
                  <td className="py-5 font-serif font-medium italic text-foreground">{"Сонце зійшло — птахи заспівали."}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </section>

      {/* SECTION 6: Sources */}
      <section>
        <SectionHeading id="sources" number="06" title="Джерела" />

        <AnimatedSection delay={100}>
          <p className="mb-12 text-base leading-relaxed text-foreground/80">
            Список джерел, використаних при підготовці цієї статті.
          </p>
        </AnimatedSection>

        <StaggerReveal className="flex flex-col gap-0">
          {[
            "Глазова О. П. Українська мова. 9 клас: підручник для закладів загальної середньої освіти. Київ: Освіта, 2022.",
            "Заболотний О. В., Заболотний В. В. Українська мова. 9 клас: підручник. Київ: Генеза, 2022.",
            "Пентилюк М. І. Сучасна українська літературна мова: Синтаксис. Київ: Вища школа, 2004.",
            "Шульжук К. Ф. Синтаксис української мови: підручник. Київ: Академія, 2004.",
            "Український правопис / НАН України. Київ: Наукова думка, 2019.",
            "Ющук І. П. Українська мова: підручник. 4-те вид. Київ: Либідь, 2008.",
          ].map((source, i) => (
            <div key={i} className="group flex gap-4 border-b border-border py-5 transition-all duration-500 hover:bg-secondary/50 hover:px-4">
              <span className="shrink-0 font-mono text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <p className="text-sm leading-relaxed text-foreground/80 transition-all duration-300 group-hover:text-foreground">
                {source}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* Bottom decoration */}
      <AnimatedSection animation="fadeIn">
        <div className="flex items-center gap-6 pt-10">
          <AnimatedLine />
          <span className="shrink-0 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Кінець статті
          </span>
          <AnimatedLine />
        </div>
      </AnimatedSection>
    </div>
  )
}
