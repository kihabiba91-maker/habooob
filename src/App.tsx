import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Timer, 
  Check, 
  X, 
  Award, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import { QUESTIONS } from './questions';
import { QuizStatus } from './types';
import { IslamicBackground } from './components/IslamicBackground';
import { 
  playCorrectSound, 
  playIncorrectSound, 
  toggleMute, 
  getMuteStatus 
} from './sound';

export default function App() {
  const [status, setStatus] = useState<QuizStatus>('WELCOME');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  
  // Timer states
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync mute state on mount
  useEffect(() => {
    setIsAudioMuted(getMuteStatus());
  }, []);

  // Handle count-up timer increment
  useEffect(() => {
    if (status === 'PLAYING') {
      timerRef.current = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  const handleToggleMute = () => {
    const nextMuted = toggleMute();
    setIsAudioMuted(nextMuted);
  };

  const currentQuestion = QUESTIONS[currentIdx];

  // Start the quiz
  const handleStartQuiz = () => {
    // Soft interaction to unlock custom browser AudioContext
    playCorrectSound();
    
    // Reset states
    setCurrentIdx(0);
    setSelectedIdx(null);
    setHasConfirmed(false);
    setScore(0);
    setSecondsElapsed(0);
    setStatus('PLAYING');
  };

  // Confirm choice selection
  const handleConfirmAnswer = () => {
    if (selectedIdx === null || hasConfirmed) return;

    setHasConfirmed(true);
    const isCorrect = selectedIdx === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore(prev => prev + 1);
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  // Move to next question or show results
  const handleNextQuestion = () => {
    setSelectedIdx(null);
    setHasConfirmed(false);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setStatus('RESULT');
    }
  };

  // Formats time into friendly Arabic duration phrase (e.g. دقائق وثواني)
  const formatFriendlyTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    if (mins === 0) {
      return `${secs} ثانية`;
    }
    
    // Plural formatting for Arabic feel
    const minString = mins === 1 
      ? 'دقيقة واحدة' 
      : mins === 2 
        ? 'دقيقتين' 
        : mins >= 3 && mins <= 10 
          ? `${mins} دقائق` 
          : `${mins} دقيقة`;

    const secString = secs === 1 
      ? 'ثانية واحدة' 
      : secs === 2 
        ? 'ثانيتين' 
        : secs >= 3 && secs <= 10 
          ? `${secs} ثوانٍ` 
          : `${secs} ثانية`;

    return `${minString} و ${secString}`;
  };

  // Formats time as standard digital stopwatch style: MM:SS
  const formatDigitalTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 selection:bg-amber-100 selection:text-amber-950" dir="rtl">
      {/* Dynamic Animated Core Background */}
      <IslamicBackground />

      {/* Top Floating Utility Bar (Sound and Brand Decoration) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-10">
        {/* Audio controls */}
        <button
          onClick={handleToggleMute}
          className="p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-200 text-[#967B47] hover:bg-white hover:text-[#C5A059] transition-all shadow-[0_4px_12px_rgba(197,160,89,0.08)] cursor-pointer"
          aria-label="Toggle Sound"
        >
          {isAudioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Small floating brand indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-200 text-amber-900 text-xs font-semibold shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>السيرة النبوية الشريفة</span>
        </div>
      </div>

      {/* Main Content Card Container */}
      <main className="w-full max-w-2xl z-10 px-2 mt-12 md:mt-0">
        <AnimatePresence mode="wait">
          
          {/* 1. Welcome Screen */}
          {status === 'WELCOME' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white/80 backdrop-blur-xl border border-amber-200/60 rounded-[32px] p-6 md:p-10 text-center shadow-[0_24px_60px_rgba(146,102,43,0.1)] relative overflow-hidden"
            >
              {/* Decorative inner corner gold lines */}
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#C5A059]/20 rounded-tr-[32px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#C5A059]/20 rounded-bl-[32px] pointer-events-none" />

              {/* Decorative Floral Header Emblem */}
              <div className="mx-auto mb-6 w-[84px] h-[84px] rounded-full bg-[#FCF7ED] border border-amber-200 flex items-center justify-center shadow-inner relative">
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-200/50" />
                <Sparkles className="w-9 h-9 text-amber-600" />
              </div>

              {/* Main Title with custom styles */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-amber-950 mb-4 tracking-tight leading-relaxed drop-shadow-sm font-serif">
                مسابقة السيرة النبوية
              </h1>
              
              <div className="h-1 w-24 bg-amber-300 mx-auto rounded-full mb-8" />

              <p className="text-base md:text-xl text-amber-900/80 mb-8 leading-relaxed max-w-md mx-auto">
                أهلاً بك في رحلة إيمانية مباركة نُبحر فيها بمحطاتٍ من السيرة النبوية العطرة لنبينا الكريم ﷺ.
              </p>

              {/* Large CTA pulsing button "هيا بنا نبدأ" */}
              <motion.button
                onClick={handleStartQuiz}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(120,53,4,0.15)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 px-8 bg-amber-900 border border-amber-950 text-white font-bold text-xl rounded-full shadow-[0_12px_24px_rgba(120,53,4,0.2)] flex items-center justify-center gap-3 hover:bg-amber-950 active:scale-95 transition-all text-center animate-gentle-glow cursor-pointer"
              >
                <span>هيا بنا نبدأ</span>
                <ChevronLeft className="w-6 h-6 transform rotate-180" />
              </motion.button>
            </motion.div>
          )}

          {/* 2. Gameplay Dashboard */}
          {status === 'PLAYING' && (
            <motion.div
              key="gameplay"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-xl border border-amber-200/60 rounded-[32px] p-5 md:p-8 shadow-[0_24px_60px_rgba(146,102,43,0.1)] relative"
            >
              {/* Question Header Meta Row (Timer & Question Progress) */}
              <div className="flex items-center justify-between mb-5 border-b border-amber-100 pb-4">
                <div className="flex items-center gap-3 bg-white/65 backdrop-blur-md border border-amber-200/80 px-4 py-2 rounded-2xl shadow-sm text-amber-900 font-mono text-xl font-light">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                  <span className="font-bold tracking-wider">{formatDigitalTime(secondsElapsed)}</span>
                  <span className="text-amber-700/60 text-xs border-r border-amber-200 pr-3 mr-1">الوقت المنقضي</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-amber-900 text-sm md:text-base font-semibold">
                    السؤال <span className="text-amber-600 font-bold text-lg">{currentIdx + 1}</span> من <span className="font-semibold text-amber-950">١٥</span>
                  </span>
                </div>
              </div>

              {/* Progress Bar (Gold gradient) */}
              <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden border border-amber-200/50 mb-6">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Body */}
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-amber-950 leading-relaxed font-serif">
                  {currentQuestion.question}
                </h2>
                <div className="h-1 w-24 bg-amber-300 mx-auto rounded-full mt-4" />
              </div>

              {/* Option Choice Tiles in a grid or stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedIdx === i;
                  const isCorrectAnswer = currentQuestion.correctIndex === i;
                  
                  // Clean Option Prefix (e.g. "أ) ") to display cleanly inside our exquisite button layout
                  const cleanOptionText = option.includes(')') ? option.split(')')[1].trim() : option;
                  const letterPrefix = ['أ', 'ب', 'ج', 'د'][i];

                  // Harmonious pastel colors based on index for choices to match the corner paintings exactly!
                  const pastelBgs = [
                    "bg-[#E8F6F2]/65 hover:bg-[#E8F6F2] text-[#1E3A34] border-[#E8F6F2]/60 hover:border-amber-400", // Mint Green
                    "bg-[#FDF1F3]/65 hover:bg-[#FDF1F3] text-[#4A282E] border-[#FDF1F3]/60 hover:border-amber-400", // Pale Pink
                    "bg-[#FCF4E8]/65 hover:bg-[#FCF4E8] text-[#5C4D35] border-[#FCF4E8]/60 hover:border-amber-400", // Creamy Gold
                    "bg-[#E8F6F2]/65 hover:bg-[#E8F6F2] text-[#1E3A34] border-[#E8F6F2]/60 hover:border-amber-400"  // Mint Green
                  ];
                  const pastelLetters = [
                    "bg-[#c9ebdE] text-[#1a423a]",
                    "bg-[#fcdde1] text-[#5c1c24]",
                    "bg-[#f6e9cf] text-[#463116]",
                    "bg-[#c9ebdE] text-[#1a423a]"
                  ];

                  let tileStyle = `border-2 ${pastelBgs[i]}`;
                  let letterStyle = `${pastelLetters[i]}`;
                  let absoluteBadge = null;

                  if (hasConfirmed) {
                    if (isCorrectAnswer) {
                      // Correct option style
                      tileStyle = "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold shadow-lg flex-row-reverse";
                      letterStyle = "bg-emerald-500 text-white";
                      absoluteBadge = (
                        <div className="absolute -left-2 -top-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white z-10 shadow-sm">
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        </div>
                      );
                    } else if (isSelected && !isCorrectAnswer) {
                      // Wrong selection made by user style
                      tileStyle = "border-rose-400 bg-rose-50/90 text-rose-950 shadow-md opacity-80 flex-row-reverse";
                      letterStyle = "bg-rose-500 text-white";
                      absoluteBadge = (
                        <div className="absolute -left-2 -top-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center border-2 border-white z-10 shadow-sm">
                          <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        </div>
                      );
                    } else {
                      // Remaining unselected disabled options style
                      tileStyle = "border-transparent bg-white/40 text-amber-900/40 cursor-not-allowed opacity-60";
                      letterStyle = "bg-amber-100/40 text-amber-800/40";
                    }
                  } else if (isSelected) {
                    // Selected tile before confirmation style
                    tileStyle = "border-amber-500 bg-[#FAF3E4]/90 text-amber-950 font-bold shadow-lg";
                    letterStyle = "bg-amber-500 text-white";
                  }

                  return (
                    <button
                      key={i}
                      disabled={hasConfirmed}
                      onClick={() => setSelectedIdx(i)}
                      className={`group relative py-4 px-5 text-right rounded-[20px] border-2 transition-all duration-300 shadow-md flex items-center gap-4 ${tileStyle} ${!hasConfirmed ? 'cursor-pointer hover:scale-[1.01]' : ''}`}
                    >
                      {absoluteBadge}
                      <span className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold shrink-0 transition-colors ${letterStyle}`}>
                        {letterPrefix}
                      </span>
                      <span className="text-lg leading-relaxed">{cleanOptionText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons Area */}
              <AnimatePresence mode="wait">
                {!hasConfirmed ? (
                  // Initial State: "Confirm Answer" button
                  <motion.button
                    key="confirm-btn"
                    onClick={handleConfirmAnswer}
                    disabled={selectedIdx === null}
                    className={`w-full py-4.5 rounded-full text-center text-xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer ${
                      selectedIdx !== null
                        ? 'bg-amber-900 border border-amber-950 text-white hover:bg-amber-950 active:scale-95'
                        : 'bg-amber-200/30 text-amber-900/40 border border-amber-200/20 cursor-not-allowed'
                    }`}
                  >
                    <span>تأكيد الإجابة</span>
                    <ChevronLeft className="w-5 h-5 transform rotate-180" />
                  </motion.button>
                ) : (
                  // Post-Confirmation State: feedback banner & Next Question button
                  <motion.div
                    key="feedback-container"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Soft outcome message box */}
                    <div className={`p-4 rounded-2xl border text-center text-lg font-semibold flex items-center justify-center gap-2 ${
                      selectedIdx === currentQuestion.correctIndex
                        ? 'bg-emerald-50/95 text-emerald-900 border-emerald-200/60'
                        : 'bg-rose-50/95 text-rose-900 border-rose-200/60'
                    }`}>
                      {selectedIdx === currentQuestion.correctIndex ? (
                        <>
                          <Sparkles className="w-5 h-5 text-emerald-600" />
                          <span>إجابة صحيحة! أحسنت وبارك الله فيك ✨</span>
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5 text-rose-600" />
                          <span>إجابة خاطئة! الإجابة الصحيحة مُمثلة بالأخضر.</span>
                        </>
                      )}
                    </div>

                    {/* Go to next Question */}
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-4.5 bg-amber-900 hover:bg-amber-950 active:scale-95 text-white text-xl font-bold rounded-full transition-all shadow-xl flex items-center justify-center gap-2 border border-amber-950 cursor-pointer"
                    >
                      <span>
                        {currentIdx < QUESTIONS.length - 1 ? 'السؤال التالي' : 'عرض النتيجة النهائية'}
                      </span>
                      <ArrowLeft className="w-5 h-5 transform rotate-0" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* 3. Ending Result Page */}
          {status === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-xl border border-amber-200/60 rounded-[32px] p-6 md:p-10 text-center shadow-[0_24px_60px_rgba(146,102,43,0.1)] relative"
            >
              {/* Confetti-like Sparkle elements or Gold Cup emblem */}
              <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-[#FAF5E6] border-2 border-amber-200 flex items-center justify-center shadow-lg relative">
                <div className="absolute inset-1.5 rounded-full border border-dashed border-amber-200/50" />
                <Award className="w-12 h-12 text-amber-600" />
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-amber-950 mb-2 leading-tight font-serif">
                تهانينا! لقد تم الإنجاز 🎉
              </h2>
              <p className="text-base text-amber-900/80 mb-8 leading-relaxed">
                سعدنا جداً بمشاركتك ومراجعتك للمعلومات القيمة في السيرة العطرة.
              </p>

              {/* Detailed statistical scores box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Score panel */}
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-5 text-center shadow-sm">
                  <p className="text-amber-800 text-sm font-semibold mb-1">الإجابات الصحيحة</p>
                  <p className="text-3xl font-extrabold text-amber-950">
                    {score} <span className="text-xl font-normal text-amber-700">/ ١٥ سؤال</span>
                  </p>
                  <p className="text-xs text-amber-600 mt-1.5 font-medium">
                    نسبة النجاح: {Math.round((score / QUESTIONS.length) * 100)}%
                  </p>
                </div>

                {/* Total time panel */}
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-5 text-center shadow-sm">
                  <p className="text-amber-800 text-sm font-semibold mb-1">الوقت الإجمالي المستغرق</p>
                  <p className="text-2xl font-extrabold text-amber-950 leading-9 select-all font-mono">
                    {formatFriendlyTime(secondsElapsed)}
                  </p>
                  <p className="text-xs text-amber-600 mt-1.5 font-medium">
                    بمعدل {Math.round(secondsElapsed / QUESTIONS.length)} ثوانٍ لكل سؤال
                  </p>
                </div>
              </div>

              {/* Blessing Statement based on performance */}
              <div className="p-4 border border-amber-200/40 rounded-2xl bg-amber-50/30 mb-8 text-amber-950">
                {score === QUESTIONS.length ? (
                  <p className="text-base font-bold text-emerald-850">
                    أحسنت صنعاً! درجة كاملة مباركة، سيرة الحبيب المصطفى ﷺ راسخة في قلبك وعقلك 🌟
                  </p>
                ) : score >= Math.round(QUESTIONS.length * 0.75) ? (
                  <p className="text-base font-semibold">
                    ممتاز جداً! معلوماتك قيمة ورائعة وندعوك للاستمرار دائماً في الاستزادة والتعلم ✨
                  </p>
                ) : (
                  <p className="text-sm font-medium text-amber-900/80 leading-relaxed">
                    عمل طيب ومحاولة مباركة! القراءة الدائمة في سيرة النبي ﷺ تزيدنا قُرباً وهدياً منه. شكراً جزيلاً لك على المحاولة.
                  </p>
                )}
              </div>

              {/* Try again CTA button */}
              <button
                onClick={handleStartQuiz}
                className="w-full py-4.5 bg-amber-900 hover:bg-amber-950 active:scale-95 text-white font-bold text-lg rounded-full transition-all shadow-xl flex items-center justify-center gap-2.5 border border-amber-950 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>إعادة المسابقة من جديد</span>
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
