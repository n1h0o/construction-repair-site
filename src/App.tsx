import { useRef, useState } from 'react';
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Clipboard, Hammer, House, Layers3, Menu, Paintbrush2, Ruler, X,
} from 'lucide-react';
import { company, faqs, services } from './config';

type Brief = { object: string; work: string; area: string; city: string; timing: string; note: string };
const emptyBrief: Brief = { object: '', work: '', area: '', city: company.city, timing: '', note: '' };

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);
  const location = [company.city, company.country].filter(Boolean).join(', ');
  const addressLine = location || 'Город и страна настраиваются под ваш проект';

  const openBrief = () => {
    setMobileOpen(false);
    setToast('');
    setCopied(false);
    dialogRef.current?.showModal();
  };
  const closeBrief = () => dialogRef.current?.close();
  const setField = (field: keyof Brief, value: string) => setBrief((current) => ({ ...current, [field]: value }));
  const briefText = [
    `Здравствуйте! Хочу обсудить проект с компанией «${company.brand}».`,
    `Тип объекта: ${brief.object || 'не указан'}`,
    `Что нужно сделать: ${brief.work || 'нужно обсудить'}`,
    brief.area ? `Площадь: ${brief.area} м²` : '',
    brief.city ? `Город: ${brief.city}` : '',
    brief.timing ? `Планируемые сроки: ${brief.timing}` : '',
    brief.note ? `Комментарий: ${brief.note}` : '',
  ].filter(Boolean).join('\n');

  const submitBrief = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedPhone = company.phone.replace(/[^\d+]/g, '');
    const whatsappNumber = company.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(briefText);
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
      setToast('Бриф открыт в WhatsApp. Проверьте сообщение и отправьте его.');
      return;
    }
    if (company.telegram) {
      window.open(company.telegram, '_blank', 'noopener,noreferrer');
      try {
        await navigator.clipboard.writeText(briefText);
        setCopied(true);
        setToast('Бриф скопирован. Вставьте его в открывшийся Telegram.');
      } catch {
        setToast('Telegram открыт. Скопируйте текст брифа вручную.');
      }
      return;
    }
    if (company.email) {
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Обсудить проект')}&body=${message}`;
      setToast('Почтовый клиент открыл письмо с вашим брифом.');
      return;
    }
    if (normalizedPhone) {
      window.location.href = `tel:${normalizedPhone}`;
      setToast('Позвоните по номеру компании и расскажите о проекте.');
      return;
    }
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
      setToast('Бриф скопирован. Добавьте контакты компании, чтобы получать обращения напрямую.');
    } catch {
      setToast('Не удалось скопировать автоматически. Выделите и скопируйте текст брифа.');
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label={`${company.brand} — на главную`}>
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span className="brand-copy"><strong>{company.brand}</strong><small>{company.tagline}</small></span>
          </a>
          <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Основная навигация">
            <a href="#services" onClick={() => setMobileOpen(false)}>Услуги</a>
            <a href="#approach" onClick={() => setMobileOpen(false)}>Подход</a>
            <a href="#projects" onClick={() => setMobileOpen(false)}>Проекты</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>Вопросы</a>
          </nav>
          <div className="header-actions">
            {company.phone ? <a className="header-phone" href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>{company.phone}</a> : null}
            <button className="button button-dark button-small header-cta" onClick={openBrief}>Обсудить проект <ArrowUpRight size={15} /></button>
            <button className="icon-button menu-toggle" aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> {location || 'Работаем там, где нужен ваш проект'}</div>
              <h1>Пространства,<br />в которых <em>хочется</em><br />жить.</h1>
              <p className="hero-lead">Строительство и ремонт с вниманием к деталям — от первого разговора до финального штриха.</p>
              <div className="hero-actions">
                <button className="button button-blue" onClick={openBrief}>Обсудить задачу <ArrowUpRight size={17} /></button>
                <a className="text-link" href="#projects">Смотреть проекты <ArrowDownRight size={17} /></a>
              </div>
              <div className="hero-footnote"><span>01 / 03</span><span>Продумываем. Создаём. Передаём.</span></div>
            </div>
            <figure className="hero-visual">
              <img src="/images/residence-editorial.webp" alt="Светлая гостиная с отделкой из натурального дерева и акцентами приглушённого голубого" />
              <figcaption><span>Жилое пространство</span><span>Демонстрационный проект студии</span></figcaption>
              <a className="image-index" href="#projects" aria-label="Перейти к проектам"><ArrowDown size={19} /></a>
            </figure>
          </div>
          <div className="hero-orbit" aria-hidden="true" />
        </section>

        <section className="intro-section section-pad">
          <div className="container intro-grid">
            <p className="eyebrow section-label">01 — О компании</p>
            <div className="intro-content"><h2>Строим с ясным планом.<br /><span>Делаем с чувством меры.</span></h2><div className="intro-bottom"><p>Каждый объект начинается с понимания того, как вам предстоит жить и пользоваться пространством. Затем — последовательные решения, аккуратное исполнение и открытый диалог на всём пути.</p><a href="#approach" className="round-link" aria-label="Узнать о подходе"><ArrowDownRight size={20} /></a></div></div>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow section-label">02 — Чем помогаем</p><h2>Работаем с целым.<br /><span>И с каждой деталью.</span></h2></div><p className="heading-note">Выберите нужный формат работ — мы обсудим объём, последовательность и детали вашего объекта.</p></div>
            <div className="service-list">
              {services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><div className="service-icon" aria-hidden="true">{service.icon === 'interior' ? <Layers3 /> : service.icon === 'house' ? <House /> : service.icon === 'systems' ? <Ruler /> : <Paintbrush2 />}</div><div className="service-copy"><h3>{service.title}</h3><p>{service.text}</p></div><button className="service-arrow" onClick={openBrief} aria-label={`Обсудить: ${service.title}`}><ArrowUpRight size={20} /></button></article>)}
            </div>
            <p className="service-note"><Hammer size={15} /> Состав работ подбирается под задачу и особенности объекта.</p>
          </div>
        </section>

        <section className="approach-section section-pad" id="approach">
          <div className="container approach-grid">
            <div className="approach-title"><p className="eyebrow section-label">03 — Наш подход</p><h2>Спокойная<br />уверенность<br /><span>на каждом этапе.</span></h2><p>Заранее объясняем, что будет происходить. Не скрываем важные решения за сложными формулировками.</p><button className="button button-outline" onClick={openBrief}>Начать разговор <ArrowUpRight size={16} /></button></div>
            <div className="steps-list">
              <article className="step-card"><span>01</span><div><h3>Слушаем</h3><p>Знакомимся с вашим запросом, объектом и ожиданиями. Уточняем главное до начала работ.</p></div></article>
              <article className="step-card"><span>02</span><div><h3>Планируем</h3><p>Обсуждаем состав работ, последовательность и исходные данные, необходимые для оценки.</p></div></article>
              <article className="step-card"><span>03</span><div><h3>Выполняем</h3><p>Двигаемся по согласованному плану и остаёмся на связи по текущим вопросам.</p></div></article>
              <article className="step-card"><span>04</span><div><h3>Передаём</h3><p>Проверяем результат вместе, фиксируем завершение работ и передаём пространство вам.</p></div></article>
            </div>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="container">
            <div className="section-heading project-heading"><div><p className="eyebrow section-label">04 — Портфолио</p><h2>Проекты с<br /><span>характером.</span></h2></div><p className="heading-note">Примеры того, как материалы, свет и внимание к пропорциям складываются в цельное пространство.</p></div>
            <div className="project-grid">
              <article className="project-card project-large"><button type="button" onClick={openBrief} className="project-image"><img src="/images/residence-editorial.webp" alt="Современная гостиная, натуральное дерево и мягкая голубая палитра" loading="lazy" /><span className="project-open"><ArrowUpRight size={19} /></span></button><div className="project-meta"><div><span className="project-kicker">Демонстрационный проект студии</span><h3>Тихий свет</h3><p>Комплексное обновление жилого пространства</p></div><span className="project-type">Интерьер</span></div></article>
              <article className="project-card project-small"><button type="button" onClick={openBrief} className="project-image"><img src="/images/bathroom-editorial.webp" alt="Ванная комната в светлом камне с приглушённой голубой плиткой" loading="lazy" /><span className="project-open"><ArrowUpRight size={19} /></span></button><div className="project-meta"><div><span className="project-kicker">Демонстрационный проект студии</span><h3>Фактура утра</h3><p>Ванная комната и отделка</p></div><span className="project-type">Отделка</span></div></article>
              <article className="project-card project-small"><button type="button" onClick={openBrief} className="project-image"><img src="/images/house-editorial.webp" alt="Современный загородный дом среди берёз" loading="lazy" /><span className="project-open"><ArrowUpRight size={19} /></span></button><div className="project-meta"><div><span className="project-kicker">Демонстрационный проект студии</span><h3>Дом у берёз</h3><p>Загородный дом и терраса</p></div><span className="project-type">Строительство</span></div></article>
            </div>
            <div className="projects-foot"><p>Каждый проект можно адаптировать под задачи и фирменный стиль вашей компании.</p><button className="text-link" onClick={openBrief}>Обсудить свой объект <ArrowRight size={17} /></button></div>
          </div>
        </section>

        <section className="estimate-section section-pad">
          <div className="container estimate-card"><div className="estimate-mark" aria-hidden="true"><Ruler size={25} /></div><div className="estimate-copy"><p className="eyebrow">Честно о стоимости</p><h2>Смета начинается<br />с правильных вопросов.</h2><p>Для расчёта важны состав работ, состояние объекта, площадь и выбранные материалы. Расскажите о своей задаче — мы подскажем, какие данные понадобятся.</p></div><button className="button button-light" onClick={openBrief}>Заполнить бриф <ArrowUpRight size={17} /></button><div className="estimate-glow" aria-hidden="true" /></div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="container faq-grid"><div><p className="eyebrow section-label">05 — Вопросы</p><h2>Коротко<br />о важном.</h2><p className="faq-contact">Не нашли ответ? <button onClick={openBrief}>Расскажите о задаче <ArrowUpRight size={15} /></button></p></div><div className="faq-list">{faqs.map((item, index) => <details className="faq-item" key={item.q} open={index === 0}><summary>{item.q}<ChevronDown size={18} /></summary><p>{item.a}</p></details>)}</div></div>
        </section>

        <section className="contact-section" id="contacts"><div className="container contact-inner"><div><p className="eyebrow">{company.address || addressLine}</p><h2>Есть пространство<br />для нового?</h2><p className="contact-lead">Расскажите, каким вы хотите его видеть.</p><button className="button button-blue" onClick={openBrief}>Обсудить ваш проект <ArrowUpRight size={17} /></button></div><div className="contact-aside"><span className="contact-aside-line" /><p>Начнём с короткого знакомства<br />и понятного плана действий.</p>{company.serviceArea && <p className="contact-fact">География: {company.serviceArea}</p>}{company.hours && <p className="contact-fact">Время связи: {company.hours}</p>}<div className="contact-links">{company.phone && <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>{company.phone}</a>}{company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}{company.telegram && <a href={company.telegram} target="_blank" rel="noreferrer">Telegram</a>}{company.whatsapp && <a href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp</a>}</div><a className="contact-scroll" href="#top">Вернуться наверх <ArrowUpRight size={15} /></a></div><div className="contact-gradient" aria-hidden="true" /></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><span /></span><span className="brand-copy"><strong>{company.brand}</strong><small>{company.tagline}</small></span></a><p>Делаем пространство частью вашей жизни.</p><nav aria-label="Навигация в подвале"><a href="#services">Услуги</a><a href="#projects">Проекты</a><a href="#contacts">Контакты</a></nav></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {company.brand}</span><span>{location || 'Строительство и ремонт'}</span><span>Продуманный путь от идеи до пространства</span></div></footer>

      <dialog className="brief-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) closeBrief(); }} aria-labelledby="brief-title">
        <div className="dialog-inner"><button className="icon-button dialog-close" onClick={closeBrief} aria-label="Закрыть форму"><X size={20} /></button><p className="eyebrow section-label">Короткий бриф</p><h2 id="brief-title">Расскажите<br />о вашем проекте.</h2><p className="dialog-intro">Это поможет подготовить разговор по делу. Точные цены появятся после уточнения объёма и исходных данных.</p>
          <form onSubmit={submitBrief}>
            <label>Тип объекта<select value={brief.object} onChange={(e) => setField('object', e.target.value)} required><option value="" disabled>Выберите вариант</option><option>Квартира</option><option>Частный дом</option><option>Коммерческое помещение</option><option>Другое</option></select></label>
            <label>Какие работы нужны?<select value={brief.work} onChange={(e) => setField('work', e.target.value)} required><option value="" disabled>Выберите вариант</option><option>Ремонт под ключ</option><option>Отдельные ремонтные работы</option><option>Строительство дома</option><option>Инженерные системы</option><option>Пока хочу обсудить</option></select></label>
            <div className="form-row"><label>Площадь, м² <input type="number" min="1" max="100000" inputMode="numeric" placeholder="Например, 68" value={brief.area} onChange={(e) => setField('area', e.target.value)} /></label><label>Город <input type="text" maxLength={80} placeholder={company.city || 'Ваш город'} value={brief.city} onChange={(e) => setField('city', e.target.value)} /></label></div>
            <label>Когда планируете начать?<select value={brief.timing} onChange={(e) => setField('timing', e.target.value)}><option value="">Пока не определились</option><option>В ближайший месяц</option><option>В течение 3 месяцев</option><option>Позже</option><option>Хочу сначала оценить</option></select></label>
            <label>Что ещё важно знать? <span className="optional-label">необязательно</span><textarea maxLength={800} rows={3} placeholder="Ваши пожелания или детали об объекте" value={brief.note} onChange={(e) => setField('note', e.target.value)} /></label>
            <p className="privacy-note">Данные не отправляются на сервер. Бриф откроется только в настроенном вами канале связи или скопируется для отправки вручную.</p>
            <button className="button button-dark form-submit" type="submit">Подготовить обращение <ArrowUpRight size={17} /></button>
            {toast && <div className="toast-message" role="status">{copied ? <Clipboard size={16} /> : <Check size={16} />}{toast}</div>}
          </form>
        </div>
      </dialog>
    </>
  );
}

export default App;
