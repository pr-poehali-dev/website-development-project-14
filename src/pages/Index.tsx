import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/2198a176-23be-4989-9b88-56247940b077/files/7596d611-6e68-419d-bcc1-9612c6d34223.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/2198a176-23be-4989-9b88-56247940b077/files/271f7415-e6e7-400c-ab1e-f22567a92237.jpg";
const CLASS_IMG = "https://cdn.poehali.dev/projects/2198a176-23be-4989-9b88-56247940b077/files/5bc05bf8-6616-45a9-a165-b8ed56972425.jpg";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const specialists = [
  { icon: "Stethoscope", label: "Дифференциальный\nдиагност", color: "#FFE4E4" },
  { icon: "MessageCircle", label: "Логопед", color: "#E4F0FF" },
  { icon: "BookOpen", label: "Дефектолог", color: "#E4FFE9" },
  { icon: "Brain", label: "Нейропсихолог", color: "#FFF4E4" },
  { icon: "Heart", label: "Психолог", color: "#F4E4FF" },
  { icon: "Sparkles", label: "Специалист по\nсенсорной интеграции", color: "#E4FFFD" },
  { icon: "Users", label: "АВА-терапист", color: "#FFECE4" },
];

const individual = [
  "Диагностика", "Логопедический массаж", "Запуск речи", "Коррекция звукопроизношения",
  "Коррекция письма и чтения", "Работа с поведением", "Занятия с дефектологом",
  "Сенсорная интеграция", "АВА занятия", "Нейропсихология и психология",
];

const group = [
  "Подготовка к школе (ЛОГОподготовка)",
  "Логоритмика и логорисование",
  "Каллиграфия",
];

const team = [
  {
    name: "Чернуха Евгения Александровна",
    role: "Дифференциальный диагност, логопед-дефектолог высшей категории",
    badge: "★ Мастер коррекционной педагогики-2025",
    img: "https://cdn.poehali.dev/projects/2198a176-23be-4989-9b88-56247940b077/bucket/57a256cd-24c8-4c31-bc35-85a900ac3ed0.jpeg",
    scheduleIndex: 0,
  },
  {
    name: "Лосева Виктория Александровна",
    role: "Клинический психолог, специалист по сенсорной интеграции",
    badge: null,
    img: CLASS_IMG,
    scheduleIndex: 1,
  },
  {
    name: "Синенкова Елена Валерьевна",
    role: "Дефектолог, магистр",
    badge: "27 лет опыта",
    img: TEAM_IMG,
    scheduleIndex: 2,
  },
  {
    name: "Анисимова Татьяна Григорьевна",
    role: "АВА-терапист, специалист по запуску речи",
    badge: null,
    img: CLASS_IMG,
    scheduleIndex: 3,
  },
  {
    name: "Моисеева Людмила Мидхатовна",
    role: "Логопед-дефектолог",
    badge: "40 лет опыта · Награда Министерства образования",
    img: TEAM_IMG,
    scheduleIndex: 4,
  },
  {
    name: "Стельмах Елена Александровна",
    role: "Магистр психологии, практикующий психолог, сказкотерапевт",
    badge: null,
    img: CLASS_IMG,
    scheduleIndex: 5,
  },
];

const schedule = [
  { spec: "Чернуха Е.А.", days: "Пн, Ср, Пт", time: "9:00 – 18:00" },
  { spec: "Лосева В.А.", days: "Вт, Чт, Сб", time: "10:00 – 17:00" },
  { spec: "Синенкова Е.В.", days: "Пн – Пт", time: "9:00 – 16:00" },
  { spec: "Анисимова Т.Г.", days: "Ср, Пт, Сб", time: "11:00 – 19:00" },
  { spec: "Моисеева Л.М.", days: "Пн, Вт, Чт", time: "9:00 – 15:00" },
  { spec: "Стельмах Е.А.", days: "Вт, Пт, Сб", time: "12:00 – 20:00" },
];

const blog = [
  {
    img: CLASS_IMG,
    title: "Как понять, нужна ли ребёнку логопедическая помощь?",
    desc: "Разбираемся, какие признаки должны насторожить родителей и когда нужно обратиться к специалисту.",
  },
  {
    img: TEAM_IMG,
    title: "Сенсорная интеграция: что это и зачем она детям",
    desc: "Объясняем простыми словами, как работает сенсорная система и почему её развитие так важно.",
  },
  {
    img: CLASS_IMG,
    title: "Подготовка к школе: что должен уметь ребёнок в 6–7 лет",
    desc: "Чеклист для родителей — навыки, которые помогут ребёнку легко войти в школьную жизнь.",
  },
];

export default function Index() {
  const [selectedSpec, setSelectedSpec] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", direction: "" });
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const bookSpecialist = (scheduleIndex: number) => {
    setSelectedSpec(scheduleIndex);
    setTimeout(() => {
      document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="font-golos bg-[#FDFCFB] text-[#1A1A2E] overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#F0EBE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight">
              <span className="text-[#E63030]">ЛОГОСтартУм</span>
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#555]">
            {[["about","О центре"],["specialists","Специалисты"],["team","Команда"],["schedule","Расписание"],["blog","Блог"],["contacts","Контакты"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#E63030] transition-colors">{label}</button>
            ))}
          </nav>
          <button
            onClick={() => scrollTo("schedule")}
            className="hidden md:flex bg-[#E63030] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#c72020] transition-all hover:scale-105 active:scale-95 shadow-md shadow-red-200"
          >
            Записаться
          </button>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#F0EBE3] px-4 py-4 flex flex-col gap-3">
            {[["about","О центре"],["specialists","Специалисты"],["team","Команда"],["schedule","Расписание"],["blog","Блог"],["contacts","Контакты"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm font-medium text-[#555] py-1 hover:text-[#E63030]">{label}</button>
            ))}
            <button onClick={() => scrollTo("schedule")} className="bg-[#E63030] text-white text-sm font-semibold px-5 py-3 rounded-full mt-2">Записаться</button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] via-[#FDFCFB] to-[#FFF8EC]" />
        <div className="absolute top-20 right-0 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full bg-[#FFE4E4] opacity-40 blur-3xl" />
        <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full bg-[#FFF4E4] opacity-50 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <div
              className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#E63030] text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              style={{ animation: "fadeSlideDown 0.6s ease forwards" }}
            >
              <Icon name="Star" size={12} />
              Центр развития и коррекции для детей
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-[#1A1A2E]"
              style={{ animation: "fadeSlideDown 0.6s ease 0.1s both" }}
            >
              Ребёнок развивается<br/>
              <span className="text-[#E63030]">в своём темпе</span>
            </h1>
            <p
              className="text-lg md:text-xl text-[#666] leading-relaxed mb-8 max-w-md"
              style={{ animation: "fadeSlideDown 0.6s ease 0.2s both" }}
            >
              Откройте вашему ребёнку двери гармоничного развития вместе с нами!
            </p>
            <div className="flex flex-wrap gap-3" style={{ animation: "fadeSlideDown 0.6s ease 0.3s both" }}>
              <button
                onClick={() => scrollTo("schedule")}
                className="bg-[#E63030] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#c72020] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-200 text-base"
              >
                Записаться на занятие
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="border-2 border-[#E0D8CF] text-[#555] font-semibold px-8 py-4 rounded-2xl hover:border-[#E63030] hover:text-[#E63030] transition-all text-base"
              >
                Узнать больше
              </button>
            </div>
            <div className="flex gap-8 mt-12" style={{ animation: "fadeSlideDown 0.6s ease 0.4s both" }}>
              {[["7+","специалистов"],["10+","направлений"],["40","лет опыта"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black text-[#E63030]">{num}</div>
                  <div className="text-xs text-[#888] font-medium mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative" style={{ animation: "fadeSlideDown 0.7s ease 0.2s both" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-100">
              <img src={HERO_IMG} alt="Дети в центре развития" className="w-full h-80 md:h-[480px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1A1A2E]">Индивидуальный подход</div>
                <div className="text-xs text-[#888]">к каждому ребёнку</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#E63030] rounded-2xl shadow-xl p-4 text-white text-center">
              <div className="text-2xl font-black">★</div>
              <div className="text-xs font-semibold mt-0.5">Топ-центр<br/>2025</div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#AAA] text-xs"
          style={{ animation: "scrollBounce 2s infinite" }}
        >
          <span>Листайте вниз</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ── О ЦЕНТРЕ ── */}
      <section id="about" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <img src={CLASS_IMG} alt="Занятия в центре" className="rounded-3xl shadow-2xl w-full h-80 md:h-[420px] object-cover" />
              <button
                onClick={() => scrollTo("schedule")}
                className="absolute -bottom-6 right-8 bg-white rounded-2xl shadow-xl p-5 text-left hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-2">
                    {["🧒","👧","🧑"].map((e, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm border-2 border-white">{e}</div>
                    ))}
                  </div>
                  <div className="text-xs text-[#888]">Дети занимаются сейчас</div>
                </div>
                <div className="text-base font-black text-[#E63030] flex items-center gap-1">
                  Записывайтесь сегодня!
                  <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Icon name="Info" size={12} />
                О нас
              </div>
              <h2 className="text-4xl font-black mb-6 leading-tight">
                Полный спектр помощи<br/><span className="text-[#E63030]">с первых лет жизни</span>
              </h2>
              <p className="text-[#555] leading-relaxed mb-4 text-lg">
                <span className="font-bold text-[#1A1A2E]">ЛОГОСтартУм</span> предлагает полный спектр диагностических услуг и занятий для детей с первых лет жизни.
              </p>
              <p className="text-[#555] leading-relaxed mb-4">
                Индивидуальный подход, консилиум ведущих специалистов и профессиональная помощь в областях логопедии, дефектологии, нейропсихологии и психологии — всё это ради будущего вашего ребёнка.
              </p>
              <p className="text-[#555] leading-relaxed mb-8">
                Мы внимательно смотрим на каждого ребёнка и выстраиваем работу так, как нужно именно ему.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Shield", text: "Доказательные методы" },
                  { icon: "Award", text: "Опытные специалисты" },
                  { icon: "Clock", text: "Гибкое расписание" },
                  { icon: "Star", text: "Результат, который виден" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 bg-[#FFF8F5] rounded-xl p-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <Icon name={icon} size={16} className="text-[#E63030]" fallback="Check" />
                    </div>
                    <span className="text-sm font-semibold text-[#333]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── СПЕЦИАЛИСТЫ ── */}
      <section id="specialists" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#FFF8F5] to-[#FDFCFB]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Icon name="Users" size={12} />
              Наши специалисты
            </div>
            <h2 className="text-4xl font-black">Эксперты в каждом направлении</h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {specialists.map((s, i) => (
              <FadeIn key={s.label} delay={i * 60}>
                <div
                  className="flex flex-col items-center text-center p-6 rounded-2xl border border-transparent hover:border-red-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ backgroundColor: s.color }}
                >
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <Icon name={s.icon} size={28} className="text-[#E63030]" fallback="Star" />
                  </div>
                  <span className="font-semibold text-sm text-[#333] whitespace-pre-line leading-snug">{s.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── НАПРАВЛЕНИЯ ── */}
      <section id="directions" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Icon name="Layers" size={12} />
              Направления работы
            </div>
            <h2 className="text-4xl font-black">Что мы делаем</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EBE3]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Icon name="User" size={20} className="text-[#E63030]" />
                  </div>
                  <h3 className="text-xl font-black text-[#1A1A2E]">Индивидуальные занятия</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {individual.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#E63030] flex-shrink-0" />
                      <span className="text-[#444] font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EBE3]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-amber-600" />
                  </div>
                  <h3 className="text-xl font-black text-[#1A1A2E]">Групповые занятия</h3>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  {group.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                      <span className="text-[#444] font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl overflow-hidden">
                  <img src={CLASS_IMG} alt="Групповые занятия" className="w-full h-44 object-cover" />
                  <p className="text-sm text-[#666] text-center font-medium py-3">Дети учатся вместе — весело и эффективно</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── КОМАНДА ── */}
      <section id="team" className="py-24 px-4 sm:px-6 bg-[#FFF8F5]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-[#E63030] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Icon name="Heart" size={12} />
              Наша команда
            </div>
            <h2 className="text-4xl font-black">Профессионалы,<br/>которым доверяют</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 80}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#F0EBE3] group">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-[#1A1A2E] text-base mb-2 leading-tight">{member.name}</h3>
                    <p className="text-sm text-[#777] leading-relaxed mb-3">{member.role}</p>
                    {member.badge && (
                      <div className="inline-flex items-center bg-red-50 border border-red-100 text-[#E63030] text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                        {member.badge}
                      </div>
                    )}
                    <button
                      onClick={() => bookSpecialist(member.scheduleIndex)}
                      className="w-full bg-[#E63030] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#c72020] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-red-200 flex items-center justify-center gap-2"
                    >
                      <Icon name="CalendarPlus" size={15} />
                      Записаться
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── РАСПИСАНИЕ И ЗАПИСЬ ── */}
      <section id="schedule" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Icon name="Calendar" size={12} />
                Расписание
              </div>
              <h2 className="text-4xl font-black mb-8">Запись<br/>на занятие</h2>
              <div className="flex gap-2 flex-wrap mb-6">
                {schedule.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSpec(i)}
                    className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                      selectedSpec === i
                        ? "bg-[#E63030] text-white border-[#E63030]"
                        : "bg-white text-[#555] border-[#E0D8CF] hover:border-[#E63030]"
                    }`}
                  >
                    {s.spec}
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F0EBE3]">
                <div className="text-lg font-black text-[#1A1A2E] mb-4">{schedule[selectedSpec].spec}</div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-[#555]">
                    <Icon name="Calendar" size={18} className="text-[#E63030]" />
                    <span className="font-medium">{schedule[selectedSpec].days}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#555]">
                    <Icon name="Clock" size={18} className="text-[#E63030]" />
                    <span className="font-medium">{schedule[selectedSpec].time}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#F0EBE3]">
              <h3 className="text-xl font-black mb-6 text-[#1A1A2E]">Оставить заявку</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#888] mb-1.5 uppercase tracking-wide">Имя ребёнка или родителя</label>
                  <input
                    type="text"
                    placeholder="Например, Анна"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-[#E0D8CF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#E63030] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#888] mb-1.5 uppercase tracking-wide">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-[#E0D8CF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#E63030] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#888] mb-1.5 uppercase tracking-wide">Направление</label>
                  <select
                    value={formData.direction}
                    onChange={e => setFormData({ ...formData, direction: e.target.value })}
                    className="w-full border border-[#E0D8CF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-[#E63030] transition-all bg-white"
                  >
                    <option value="">Выберите направление</option>
                    {individual.map(item => <option key={item} value={item}>{item}</option>)}
                    {group.map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <button className="w-full bg-[#E63030] text-white font-bold py-4 rounded-xl hover:bg-[#c72020] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-200 mt-2">
                  Записаться на занятие →
                </button>
                <p className="text-xs text-center text-[#AAA]">Мы свяжемся с вами в течение 30 минут</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── БЛОГ ── */}
      <section id="blog" className="py-24 px-4 sm:px-6 bg-[#FFF8F5]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Icon name="BookOpen" size={12} />
              Полезные материалы
            </div>
            <h2 className="text-4xl font-black">Блог центра</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.map((post, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#F0EBE3] group">
                  <div className="h-48 overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-[#1A1A2E] text-base mb-3 leading-snug">{post.title}</h3>
                    <p className="text-sm text-[#888] leading-relaxed mb-4">{post.desc}</p>
                    <button className="text-[#E63030] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      Читать <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-4 sm:px-6">
        <FadeIn>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#E63030] to-[#FF5A5A] rounded-3xl p-10 md:p-16 text-white text-center shadow-2xl shadow-red-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Помогите ребёнку раскрыть потенциал</h2>
              <p className="text-white/80 text-lg mb-8">Запишитесь на первичную консультацию — это бесплатно</p>
              <button
                onClick={() => scrollTo("schedule")}
                className="bg-white text-[#E63030] font-black px-10 py-4 rounded-2xl hover:bg-red-50 transition-all hover:scale-105 active:scale-95 shadow-lg text-base"
              >
                Записаться на консультацию →
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section id="contacts" className="py-24 px-4 sm:px-6 bg-[#1A1A2E]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Icon name="MapPin" size={12} />
              Контакты
            </div>
            <h2 className="text-4xl font-black text-white">Мы рядом</h2>
            <p className="text-white/60 mt-2">Работаем по будням и в выходные дни</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "Phone", title: "Телефон", value: "+7 (___) ___-__-__", sub: "Пн–Вс 9:00–20:00" },
              { icon: "MapPin", title: "Адрес", value: "Уточните у администратора", sub: "Удобное расположение" },
              { icon: "Clock", title: "Режим работы", value: "Будни и выходные", sub: "9:00 – 20:00" },
            ].map(({ icon, title, value, sub }) => (
              <FadeIn key={title}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-[#E63030] rounded-xl flex items-center justify-center mb-4">
                    <Icon name={icon} size={18} className="text-white" fallback="Info" />
                  </div>
                  <div className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1">{title}</div>
                  <div className="text-white font-bold mb-1">{value}</div>
                  <div className="text-white/40 text-xs">{sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
              <div className="bg-[#2A2A3E] rounded-xl h-56 flex items-center justify-center">
                <div className="text-center text-white/30">
                  <Icon name="Map" size={40} className="mx-auto mb-3" />
                  <p className="text-sm">Карта будет добавлена после указания адреса центра</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "MAX", icon: "MessageCircle", color: "bg-violet-600" },
                { label: "Telegram", icon: "Send", color: "bg-sky-500" },
                { label: "ВКонтакте", icon: "Users", color: "bg-indigo-600" },
              ].map(({ label, icon, color }) => (
                <button
                  key={label}
                  className={`${color} text-white flex items-center gap-2 font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95`}
                >
                  <Icon name={icon} size={16} fallback="MessageCircle" />
                  {label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111122] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <span className="font-black text-lg"><span className="text-[#E63030]">ЛОГОСтартУм</span></span>
          <span>© 2025 Центр развития и коррекции</span>
          <span>Все права защищены</span>
        </div>
      </footer>

      <style>{`
        .font-golos { font-family: 'Golos Text', sans-serif; }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }
      `}</style>
    </div>
  );
}