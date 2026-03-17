import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  BookOpen,
  Headphones,
  PenTool,
  Globe,
  Play,
  Volume2,
  Award,
  Star,
  CheckCircle,
  Menu,
  X,
} from 'lucide-react'

const LEVELS = [
  {
    id: 1,
    key: 'beginner',
    name: 'المبتدئ (Beginner)',
    description: 'أساسيات اللغة: التحية، العائلة، الوقت، الجمل البسيطة.',
  },
  {
    id: 2,
    key: 'intermediate',
    name: 'المتوسط (Intermediate)',
    description: 'توسيع المهارات: الماضي، المستقبل، المقارنة، المحادثة.',
  },
  {
    id: 3,
    key: 'advanced',
    name: 'المتقدم (Advanced)',
    description: 'لغة أكثر عمقاً: العمل، المقابلات، الكتابة المتقدمة، القواعد المركبة.',
  },
]

const LESSONS = [
  {
    id: 1,
    level: 0,
    unit: 1,
    title: 'التحيات والتعارف',
    type: 'قراءة',
    grammar: 'Verb to Be + Subject Pronouns',
    content: 'Hello. My name is Ahmed. I am from Riyadh. Nice to meet you.',
    explanation:
      'في هذا الدرس ستتعلم كيف تبدأ التعارف باللغة الإنجليزية. نستخدم Hello أو Hi للتحية، ونستخدم My name is للتعريف بالاسم، ونستخدم I am للتحدث عن النفس مثل الجنسية أو المدينة.',
    writingTask: 'اكتب 3 جمل تعرف فيها بنفسك: الاسم، المدينة، والهواية.',
    listeningTip: 'ركز على نطق الكلمات: Hello, name, from, meet.',
    examples: ['Hello, my name is Sara.', 'I am from Jeddah.', 'Nice to meet you.'],
  },
  {
    id: 2,
    level: 0,
    unit: 2,
    title: 'الأرقام والألوان',
    type: 'مفردات',
    grammar: 'Adjectives Before Nouns',
    content: 'One red bag. Two blue books. Ten green apples.',
    explanation:
      'في الإنجليزية تأتي الصفة قبل الاسم. نقول red bag وليس bag red. هذا الدرس يساعدك على بناء تراكيب بسيطة ومفيدة في الحياة اليومية.',
    writingTask: 'اكتب 5 تراكيب تجمع بين رقم + لون + اسم.',
    listeningTip: 'استمع جيداً إلى الفرق بين red و green و blue.',
    examples: ['A blue car.', 'Three black pens.', 'Five yellow flowers.'],
  },
  {
    id: 3,
    level: 0,
    unit: 3,
    title: 'العائلة',
    type: 'استماع',
    grammar: 'Possessive Adjectives',
    content: 'This is my father. Her sister is a doctor. Their family is big.',
    explanation:
      'ستتعلم كلمات العائلة وكيف تستخدم صفات الملكية مثل my و her و their. هذه الكلمات تساعدك على وصف العلاقات بين الناس بسهولة.',
    writingTask: 'اكتب 4 جمل عن أفراد عائلتك باستخدام my.',
    listeningTip: 'انتبه لنطق كلمات father و mother و brother و sister.',
    examples: ['My mother is kind.', 'His brother is tall.', 'Their family is happy.'],
  },
  {
    id: 4,
    level: 0,
    unit: 4,
    title: 'أدوات التعريف',
    type: 'قواعد',
    grammar: 'Articles: A / An / The',
    content: 'A book. An orange. The sun is hot.',
    explanation:
      'نستخدم a قبل الكلمات التي تبدأ بصوت ساكن، ونستخدم an قبل الكلمات التي تبدأ بصوت علة، ونستخدم the عندما يكون الشيء معروفاً أو محدداً.',
    writingTask: 'اكتب 6 أمثلة: مثالين بـ a ومثالين بـ an ومثالين بـ the.',
    listeningTip: 'انتبه لنطق an orange و a car والفرق بينهما.',
    examples: ['A teacher.', 'An umbrella.', 'The moon is bright.'],
  },
  {
    id: 5,
    level: 0,
    unit: 5,
    title: 'أيام الأسبوع والروتين',
    type: 'قراءة',
    grammar: 'Prepositions of Time: On',
    content: 'I study English on Monday. We visit grandma on Friday.',
    explanation:
      'عندما نتحدث عن أيام الأسبوع نستخدم حرف الجر on. هذا الدرس يساعدك على وصف جدولك الأسبوعي بطريقة بسيطة وواضحة.',
    writingTask: 'اكتب جدولاً بسيطاً من 5 أيام باستخدام on.',
    listeningTip: 'استمع لنطق Monday و Tuesday و Thursday جيداً.',
    examples: ['He works on Sunday.', 'They play football on Tuesday.'],
  },
  {
    id: 6,
    level: 0,
    unit: 6,
    title: 'المنزل والأثاث',
    type: 'كتابة',
    grammar: 'There is / There are',
    content: 'There is a sofa in the living room. There are two chairs in the kitchen.',
    explanation:
      'نستخدم There is للمفرد و There are للجمع عند وصف الأشياء الموجودة في مكان ما. هذه قاعدة أساسية في الوصف.',
    writingTask: 'اكتب 5 جمل تصف منزلك باستخدام There is و There are.',
    listeningTip: 'انتبه للفرق بين is و are في الجمل.',
    examples: ['There is a bed in my room.', 'There are books on the table.'],
  },
  {
    id: 7,
    level: 0,
    unit: 7,
    title: 'الوقت والمواعيد',
    type: 'استماع',
    grammar: 'Telling Time',
    content: "It is seven o'clock. It is half past nine. It is quarter to five.",
    explanation:
      'ستتعلم كيف تسأل عن الوقت وتجيب بشكل طبيعي. هذا مهم جداً في الحياة اليومية، المدرسة، والعمل.',
    writingTask: 'اكتب 6 أوقات مختلفة باللغة الإنجليزية.',
    listeningTip: 'ركز على العبارات: o’clock, half past, quarter to.',
    examples: ['It is ten o’clock.', 'It is quarter past three.'],
  },
  {
    id: 8,
    level: 0,
    unit: 8,
    title: 'المشاعر والحالات',
    type: 'مفردات',
    grammar: 'Present Simple with Be',
    content: 'I am happy. She is tired. They are excited.',
    explanation:
      'في هذا الدرس تتعلم وصف المشاعر والحالات باستخدام am و is و are. هذه التراكيب مهمة جداً للمحادثة اليومية.',
    writingTask: 'اكتب 5 جمل تصف شعورك أو شعور الآخرين.',
    listeningTip: 'استمع إلى الفرق بين happy و tired و excited.',
    examples: ['He is angry.', 'We are ready.', 'I am nervous.'],
  },
  {
    id: 9,
    level: 0,
    unit: 9,
    title: 'الأفعال اليومية',
    type: 'قواعد',
    grammar: 'Present Simple',
    content: 'I eat breakfast. She goes to school. We sleep early.',
    explanation:
      'المضارع البسيط يستخدم للروتين والعادات اليومية. ستتعلم كيف تبني جملة بسيطة للتحدث عن أنشطة يومية متكررة.',
    writingTask: 'اكتب 6 جمل عن روتينك اليومي.',
    listeningTip: 'انتبه لصيغة الفعل مع he و she مثل goes.',
    examples: ['He drinks coffee.', 'They study every day.', 'She reads at night.'],
  },
  {
    id: 10,
    level: 0,
    unit: 10,
    title: 'مراجعة شاملة للمبتدئ',
    type: 'اختبار',
    grammar: 'Level 1 Review',
    content: 'Introduce yourself, describe your family, your home, and your daily routine.',
    explanation:
      'هذا الدرس يجمع أهم ما تعلمته في المستوى الأول: التعارف، العائلة، المنزل، الوقت، والروتين اليومي. الهدف هو تثبيت الأساس قبل الانتقال إلى المستوى المتوسط.',
    writingTask: 'اكتب فقرة قصيرة من 8 إلى 10 جمل عن نفسك وحياتك اليومية.',
    listeningTip: 'أعد سماع الدروس السابقة ثم حاول قراءة الفقرة بنفسك.',
    examples: ['My name is Ali.', 'There is a desk in my room.', 'I study on Monday.'],
  },
]

const ARABIC_FEMALE_HINTS = [
  'female',
  'woman',
  'zira',
  'helena',
  'samantha',
  'susan',
  'naayf',
  'hoda',
  'leila',
  'amira',
  'arabic',
  'ar-',
]

const ENGLISH_HINTS = ['en-', 'english', 'united states', 'united kingdom', 'google us english']

function normalizeText(value) {
  return String(value || '').trim()
}

function buildLessonNarration(lesson) {
  return [
    `أهلاً بك في درس ${lesson.title}.`,
    `نوع الدرس هو ${lesson.type}.`,
    `قاعدة الدرس هي ${lesson.grammar}.`,
    `الشرح: ${lesson.explanation}`,
    `أمثلة الدرس: ${lesson.examples.join(' ثم ')}`,
    `مهمة الكتابة: ${lesson.writingTask}`,
    `ملاحظة الاستماع: ${lesson.listeningTip}`,
    `والآن سنقرأ محتوى الدرس باللغة الإنجليزية: ${lesson.content}`,
  ].join(' ')
}

function pickVoice(voices, langPrefix, preferFemale = false) {
  if (!voices?.length) return null

  const langMatches = voices.filter((voice) =>
    voice.lang?.toLowerCase().startsWith(langPrefix.toLowerCase())
  )

  if (!langMatches.length) return voices[0] || null

  if (preferFemale) {
    const female = langMatches.find((voice) => {
      const sample = `${voice.name} ${voice.voiceURI} ${voice.lang}`.toLowerCase()
      return ARABIC_FEMALE_HINTS.some((hint) => sample.includes(hint))
    })
    if (female) return female
  }

  const better = langMatches.find((voice) => {
    const sample = `${voice.name} ${voice.voiceURI} ${voice.lang}`.toLowerCase()
    return ENGLISH_HINTS.some((hint) => sample.includes(hint)) || sample.includes(langPrefix.toLowerCase())
  })

  return better || langMatches[0]
}

function useSpeechEngine() {
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null)
  const [voices, setVoices] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechError, setSpeechError] = useState('')

  useEffect(() => {
    if (!synthRef.current) return undefined

    const loadVoices = () => {
      const availableVoices = synthRef.current.getVoices()
      if (availableVoices?.length) setVoices(availableVoices)
    }

    loadVoices()
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null
      }
      synthRef.current?.cancel()
    }
  }, [])

  const stop = () => {
    synthRef.current?.cancel()
    setIsSpeaking(false)
  }

  const speak = ({ text, lang = 'ar-SA', rate = 0.95, pitch = 1, volume = 1, preferFemale = false }) => {
    const cleanText = normalizeText(text)
    if (!cleanText) return

    if (!('speechSynthesis' in window)) {
      setSpeechError('المتصفح الحالي لا يدعم ميزة القراءة الصوتية.')
      return
    }

    try {
      setSpeechError('')
      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = lang
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume

      const selectedVoice = pickVoice(voices, lang.split('-')[0], preferFemale)
      if (selectedVoice) utterance.voice = selectedVoice

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => {
        setSpeechError('تعذر تشغيل الصوت حالياً. جرّب مرة أخرى أو غيّر المتصفح.')
        setIsSpeaking(false)
      }

      synthRef.current.speak(utterance)
    } catch (error) {
      setSpeechError('حدث خطأ أثناء تشغيل الصوت.')
      setIsSpeaking(false)
    }
  }

  return { isSpeaking, speechError, speak, stop }
}

function LessonSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  currentLevel,
  setCurrentLevel,
  selectedLesson,
  setSelectedLesson,
  levels,
  lessons,
}) {
  return (
    <>
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <BookOpen size={20} color="#2563eb" />
            <span>منهج اللغة الإنجليزية</span>
          </div>

          <button className="close-btn mobile-toggle" onClick={() => setIsSidebarOpen(false)} aria-label="إغلاق القائمة">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-levels">
          {levels.map((lvl, idx) => (
            <button
              key={lvl.id}
              onClick={() => {
                setCurrentLevel(idx)
                setSelectedLesson(null)
              }}
              className={`level-button ${currentLevel === idx ? `active ${lvl.key}` : ''}`}
            >
              مستوى {idx + 1}
            </button>
          ))}
        </div>

        <div className="level-description">{levels[currentLevel]?.description}</div>

        <div className="lesson-list">
          {lessons.map((lesson, idx) => {
            const active = selectedLesson?.id === lesson.id
            return (
              <button
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson)
                  if (window.innerWidth < 1024) setIsSidebarOpen(false)
                }}
                className={`lesson-card ${active ? 'active' : ''}`}
              >
                <div className="lesson-card-top">
                  <span className="lesson-badge">درس {idx + 1}</span>
                  {active ? <CheckCircle size={15} color="#3b82f6" /> : null}
                </div>
                <h3>{lesson.title}</h3>
              </button>
            )
          })}
        </div>
      </aside>
    </>
  )
}

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <div className="welcome-icon">
        <Globe size={62} color="#3b82f6" />
      </div>
      <h3>مرحباً بك في رحلة التعلم!</h3>
      <p>اختر درساً من القائمة الجانبية لتبدأ الشرح الصوتي وقراءة الجمل بسهولة.</p>
    </div>
  )
}

function LessonDetails({ lesson, onSpeakLesson, onSpeakEnglish, isSpeaking, speechError, onStop }) {
  return (
    <div>
      <div className="tags">
        <span className="tag">
          <Star size={14} color="#f59e0b" />
          {lesson.type}
        </span>
        <span className="tag">
          <Award size={14} color="#3b82f6" />
          {lesson.grammar}
        </span>
      </div>

      <h2 className="lesson-title">{lesson.title}</h2>

      {speechError ? <div className="error-box">{speechError}</div> : null}

      <div className="grid-2">
        <div className="panel">
          <div className="panel-label">
            <Globe size={16} />
            <span>الشرح بالعربية</span>
          </div>

          <p className="panel-text">{lesson.explanation}</p>

          <div className="info-section" style={{ marginBottom: '18px' }}>
            <h5>مهمة الكتابة</h5>
            <p>{lesson.writingTask}</p>
          </div>

          <div className="info-section">
            <h5>تلميحة الاستماع</h5>
            <p>{lesson.listeningTip}</p>
          </div>
        </div>

        <div className="panel-dark">
          <div className="panel-label">
            <Headphones size={16} />
            <span>النطق الإنجليزي</span>
          </div>

          <p className="english-text">{lesson.content}</p>

          <button onClick={onSpeakEnglish} className="play-floating-btn" aria-label="تشغيل النطق الإنجليزي">
            <Play size={24} fill="currentColor" />
          </button>
        </div>

        <div className="full-panel gradient-panel">
          <div className="gradient-header">
            <div className="gradient-icon-box">
              <PenTool size={22} />
            </div>
            <h4 style={{ margin: 0, fontSize: '22px', fontWeight: 900 }}>تلميحة القواعد</h4>
          </div>

          <p>
            يركز هذا الدرس على قاعدة <strong>{lesson.grammar}</strong>. حاول استخدامها داخل جملك الخاصة ثم اقرأ الأمثلة بصوت مرتفع.
          </p>
        </div>

        <div className="full-panel panel">
          <h4 className="examples-title">أمثلة إضافية</h4>

          <div className="examples-grid">
            {lesson.examples.map((example, index) => (
              <div key={`${lesson.id}-example-${index}`} className="example-box">
                <p>{example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="actions-row">
        <button onClick={onSpeakLesson} disabled={isSpeaking} className="btn btn-primary">
          {isSpeaking ? (
            <span className="speaking-dots">
              <span></span>
              <span></span>
              <span></span>
              جاري الشرح...
            </span>
          ) : (
            <>
              <Volume2 size={18} style={{ marginLeft: 8, verticalAlign: 'middle' }} />
              شرح الدرس صوتياً
            </>
          )}
        </button>

        <button onClick={onStop} className="btn btn-secondary">
          إيقاف الصوت
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024)
  const { isSpeaking, speechError, speak, stop } = useSpeechEngine()

  const filteredLessons = useMemo(
    () => LESSONS.filter((lesson) => lesson.level === currentLevel),
    [currentLevel]
  )

  useEffect(() => {
    if (!selectedLesson || selectedLesson.level !== currentLevel) {
      setSelectedLesson(filteredLessons[0] || null)
    }
  }, [filteredLessons, selectedLesson, currentLevel])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(true)
      else setIsSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleSpeakLesson = (lesson) => {
    speak({
      text: buildLessonNarration(lesson),
      lang: 'ar-SA',
      rate: 0.95,
      pitch: 1.05,
      preferFemale: true,
    })
  }

  const handleSpeakEnglish = (lesson) => {
    speak({
      text: `${lesson.content}. ${lesson.examples.join('. ')}`,
      lang: 'en-US',
      rate: 0.9,
      pitch: 1,
      preferFemale: false,
    })
  }

  return (
    <div className="app-shell">
      <LessonSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
        selectedLesson={selectedLesson}
        setSelectedLesson={setSelectedLesson}
        levels={LEVELS}
        lessons={filteredLessons}
      />

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(true)} aria-label="فتح القائمة">
              <Menu size={24} />
            </button>

            <div>
              <div className="topbar-label">{LEVELS[currentLevel].name}</div>
              <h1 className="topbar-title">أكاديمية اللغة الإنجليزية</h1>
            </div>
          </div>

          {selectedLesson ? (
            <button onClick={() => handleSpeakLesson(selectedLesson)} disabled={isSpeaking} className="btn btn-primary">
              {isSpeaking ? (
                <span className="speaking-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  جاري الشرح...
                </span>
              ) : (
                <>
                  <Volume2 size={18} style={{ marginLeft: 8, verticalAlign: 'middle' }} />
                  شرح الدرس صوتياً
                </>
              )}
            </button>
          ) : null}
        </header>

        <div className="page-body">
          {selectedLesson ? (
            <LessonDetails
              lesson={selectedLesson}
              onSpeakLesson={() => handleSpeakLesson(selectedLesson)}
              onSpeakEnglish={() => handleSpeakEnglish(selectedLesson)}
              isSpeaking={isSpeaking}
              speechError={speechError}
              onStop={stop}
            />
          ) : (
            <WelcomeScreen />
          )}
        </div>
      </main>
    </div>
  )
}
