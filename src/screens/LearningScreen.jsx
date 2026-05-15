import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import ProgressGoals from '../components/ProgressGoals'
import useIsMobile from '../hooks/useIsMobile'

const RULES = [
  {
    id: 1, emoji: '🙋', title: '친구 말 끊지 않기',
    color: '#dbeafe', border: '#60a5fa', textColor: '#1e40af',
    description: '친구가 말하는 동안은 조용히 기다려요!',
    example: {
      wrong: { actor: '😤 나쁜 예', text: '"야야야! 나도 나도!" 하며 친구 말을 끊는 것' },
      right: { actor: '😊 좋은 예', text: '"친구야, 다 말해봐! 나도 기다릴 수 있어!" 하고 기다리는 것' },
    },
    tip: '말할 차례를 기다리면 친구도 내 말을 잘 들어줘요 👂',
    progressKey: 'social', progressAmount: 15, exp: 20,
    quiz: {
      question: '친구가 말하고 있을 때 어떻게 해야 할까요?',
      choices: [
        { text: '⏸️ 조용히 기다렸다가 내 차례에 말한다', correct: true },
        { text: '📢 더 크게 소리쳐서 내 말을 먼저 한다', correct: false },
        { text: '🚶 그냥 자리를 떠버린다', correct: false },
      ],
    },
  },
  {
    id: 2, emoji: '🤝', title: '도움 요청하기',
    color: '#d1fae5', border: '#34d399', textColor: '#065f46',
    description: '혼자 어렵다면 도움을 구해봐요!',
    example: {
      wrong: { actor: '😤 나쁜 예', text: '혼자 끙끙대다가 포기하거나 화내는 것' },
      right: { actor: '😊 좋은 예', text: '"도와줄 수 있어?" 하고 공손하게 부탁하는 것' },
    },
    tip: '도움을 요청하는 건 용기 있는 행동이에요 💪',
    progressKey: 'social', progressAmount: 15, exp: 20,
    quiz: {
      question: '혼자 해결하기 너무 어려울 때 가장 좋은 방법은?',
      choices: [
        { text: '😭 그냥 포기하고 운다', correct: false },
        { text: '🙏 "도와줄 수 있어?" 라고 친구에게 부탁한다', correct: true },
        { text: '😤 혼자 화를 내며 억지로 한다', correct: false },
      ],
    },
  },
  {
    id: 3, emoji: '💬', title: '화날 때 말로 표현하기',
    color: '#ede9fe', border: '#a78bfa', textColor: '#4c1d95',
    description: '감정을 말로 표현하면 서로 이해해요!',
    example: {
      wrong: { actor: '😤 나쁜 예', text: '화가 나서 소리를 지르거나 물건을 던지는 것' },
      right: { actor: '😊 좋은 예', text: '"나 지금 속상해" 또는 "그건 싫어"라고 말하는 것' },
    },
    tip: '내 마음을 말로 표현하면 친구가 이해할 수 있어요 ❤️',
    progressKey: 'selfControl', progressAmount: 20, exp: 25,
    quiz: {
      question: '화가 많이 났을 때 가장 좋은 행동은 무엇일까요?',
      choices: [
        { text: '💥 물건을 던지거나 소리를 지른다', correct: false },
        { text: '🗣️ "나 지금 화났어, 속상해"라고 말한다', correct: true },
        { text: '🤐 아무 말 없이 꾹 참는다', correct: false },
      ],
    },
  },
  {
    id: 4, emoji: '🎮', title: '아이템 함께 쓰기',
    color: '#fef3c7', border: '#fbbf24', textColor: '#92400e',
    description: '나눔은 더 큰 기쁨을 만들어요!',
    example: {
      wrong: { actor: '😤 나쁜 예', text: '"이건 내 거야!" 하며 혼자만 독차지하는 것' },
      right: { actor: '😊 좋은 예', text: '"같이 쓰자!" 하며 함께 즐기는 것' },
    },
    tip: '함께 쓰면 두 배로 즐거워요! 🎉',
    progressKey: 'positiveRelationship', progressAmount: 15, exp: 20,
    quiz: {
      question: '친구가 "나도 같이 쓸 수 있어?" 라고 물어봤어요. 어떻게 할까요?',
      choices: [
        { text: '🚫 "안 돼, 내 거야!" 라고 거절한다', correct: false },
        { text: '😊 "그래! 같이 쓰자!" 라고 흔쾌히 허락한다', correct: true },
        { text: '🙈 못 들은 척 무시한다', correct: false },
      ],
    },
  },
]

function QuizModal({ rule, onSuccess, onClose }) {
  const isMobile = useIsMobile()
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [wrongCount, setWrongCount] = useState(0)

  const handleSubmit = (idx) => {
    if (submitted) return
    setSelected(idx)
    setSubmitted(true)
    if (rule.quiz.choices[idx].correct) {
      setTimeout(onSuccess, 1200)
    } else {
      setWrongCount(w => w + 1)
      setTimeout(() => { setSelected(null); setSubmitted(false) }, 1500)
    }
  }

  const choice = rule.quiz.choices

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '16px',
    }}>
      <div style={{
        background: 'white', borderRadius: '24px',
        padding: isMobile ? '20px 16px' : '28px 24px',
        maxWidth: '380px', width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        animation: 'bounce-in 0.4s ease-out',
        border: `3px solid ${rule.border}`,
      }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '40px', marginBottom: '6px' }}>🧙‍♀️</div>
          <div style={{ fontWeight: 'bold', color: '#7c3aed', fontSize: '13px', marginBottom: '4px' }}>
            확인 퀴즈! {wrongCount > 0 && `(틀린 횟수: ${wrongCount}번)`}
          </div>
          <p style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 'bold', color: '#1f2937', lineHeight: '1.5' }}>
            {rule.quiz.question}
          </p>
        </div>

        {/* 선택지 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {choice.map((c, i) => {
            let bg = '#f9fafb', border = '#e5e7eb', color = '#1f2937'
            if (submitted && selected === i) {
              if (c.correct) { bg = '#dcfce7'; border = '#4ade80'; color = '#166534' }
              else { bg = '#fee2e2'; border = '#fca5a5'; color = '#991b1b' }
            }
            return (
              <button key={i} onClick={() => handleSubmit(i)} disabled={submitted} style={{
                background: bg, border: `2px solid ${border}`, borderRadius: '12px',
                padding: '12px 14px', textAlign: 'left', fontSize: isMobile ? '13px' : '14px',
                color, fontWeight: '500', cursor: submitted ? 'default' : 'pointer',
                transition: 'all 0.3s', lineHeight: '1.4',
              }}>
                {submitted && selected === i && (c.correct ? '✅ ' : '❌ ')}
                {c.text}
              </button>
            )
          })}
        </div>

        {/* 피드백 */}
        {submitted && !choice[selected].correct && (
          <div style={{
            background: '#fef3c7', border: '2px solid #fcd34d', borderRadius: '10px',
            padding: '10px', fontSize: '13px', color: '#92400e', textAlign: 'center',
          }}>
            💡 다시 생각해봐요! 카드 내용을 참고해서 골라봐요.
          </div>
        )}
        {submitted && choice[selected].correct && (
          <div style={{
            background: '#dcfce7', border: '2px solid #4ade80', borderRadius: '10px',
            padding: '10px', fontSize: '13px', color: '#166534', textAlign: 'center',
            animation: 'bounce-in 0.3s ease-out',
          }}>
            🎉 정답! 잠시 후 보상이 지급됩니다...
          </div>
        )}
      </div>
    </div>
  )
}

function RewardPopup({ reward, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '32px', textAlign: 'center',
        maxWidth: '300px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        animation: 'bounce-in 0.5s ease-out',
      }}>
        <div style={{ fontSize: '56px', marginBottom: '10px' }}>🎉</div>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>퀴즈 통과!</h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ background: '#fef3c7', border: '2px solid #fcd34d', borderRadius: '12px', padding: '10px 16px', fontWeight: 'bold', color: '#92400e' }}>
            ⭐ +{reward.exp}
          </div>
          <div style={{ background: '#fef3c7', border: '2px solid #fcd34d', borderRadius: '12px', padding: '10px 16px', fontWeight: 'bold', color: '#92400e' }}>
            🪙 +5
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'linear-gradient(135deg, #059669, #0284c7)', color: 'white', border: 'none',
          borderRadius: '99px', padding: '12px 28px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
        }}>계속하기 →</button>
      </div>
    </div>
  )
}

export default function LearningScreen({ playerData, actions }) {
  const isMobile = useIsMobile()
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [learnedCards, setLearnedCards] = useState([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showReward, setShowReward] = useState(null)
  const [allDone, setAllDone] = useState(false)

  const rule = RULES[currentCard]
  const allLearned = learnedCards.length === RULES.length

  const handleQuizSuccess = () => {
    setShowQuiz(false)
    setLearnedCards(prev => [...prev, rule.id])
    actions.addExp(rule.exp)
    actions.addCoins(5)
    actions.updateProgress(rule.progressKey, rule.progressAmount)
    actions.updateProgress('ruleUnderstanding', 20)
    setShowReward(rule)
  }

  const handleNext = () => {
    if (currentCard < RULES.length - 1) {
      setCurrentCard(prev => prev + 1)
      setFlipped(false)
    }
  }

  if (allDone) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StatusBar playerData={playerData} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '24px' }}>
          <div style={{ fontSize: '72px', marginBottom: '12px' }}>🏆</div>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>규칙 학습 완료!</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '15px', textAlign: 'center' }}>
            4개의 규칙을 모두 익혔어요!<br />이제 실전 보상 미션으로 가봐요! 🎁
          </p>
          <button onClick={() => actions.goTo('reinforcement')} style={{
            background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', border: 'none',
            borderRadius: '99px', padding: '16px 40px', fontSize: '19px', fontWeight: 'bold',
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
          }}>다음 단계로! 🚀</button>
        </div>
        <ProgressGoals progress={playerData.progress} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StatusBar playerData={playerData} />
      <div style={{ flex: 1, padding: isMobile ? '12px' : '20px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>

        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '10px' : '14px' }}>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
            📚 1단계: 규칙 배우기
          </h2>
          {/* 진행 도트 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {RULES.map((r, i) => (
              <div key={r.id} onClick={() => { setCurrentCard(i); setFlipped(false) }} style={{
                width: isMobile ? '36px' : '32px', height: isMobile ? '36px' : '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s',
                background: learnedCards.includes(r.id) ? '#059669' : i === currentCard ? '#1d4ed8' : '#e5e7eb',
                color: (learnedCards.includes(r.id) || i === currentCard) ? 'white' : '#6b7280',
              }}>
                {learnedCards.includes(r.id) ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* 잠금 안내 */}
        {!allLearned && (
          <div style={{
            background: '#fffbeb', border: '2px solid #fcd34d', borderRadius: '12px',
            padding: '8px 14px', marginBottom: '10px',
            fontSize: '12px', color: '#92400e', textAlign: 'center', fontWeight: '500',
          }}>
            🔒 모든 카드 퀴즈를 통과해야 다음 단계로 이동할 수 있어요!
            ({learnedCards.length}/{RULES.length} 완료)
          </div>
        )}

        {/* 카드 */}
        <div onClick={() => setFlipped(!flipped)} style={{
          background: rule.color, border: `3px solid ${rule.border}`, borderRadius: '20px',
          padding: isMobile ? '18px' : '24px', marginBottom: '12px', cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)', transition: 'all 0.2s',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: isMobile ? '48px' : '60px', marginBottom: '6px' }}>{rule.emoji}</div>
            <h3 style={{ fontSize: isMobile ? '20px' : '22px', fontWeight: 'bold', color: rule.textColor, marginBottom: '4px' }}>
              {rule.title}
            </h3>
            <p style={{ color: rule.textColor, fontSize: isMobile ? '13px' : '14px', opacity: 0.85 }}>{rule.description}</p>
          </div>

          {!flipped ? (
            <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '12px', padding: '10px', textAlign: 'center', color: rule.textColor, fontSize: '13px' }}>
              👆 탭해서 예시 보기
            </div>
          ) : (
            <div>
              <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '10px', marginBottom: '8px' }}>
                <div style={{ fontWeight: 'bold', color: '#991b1b', fontSize: '12px', marginBottom: '3px' }}>{rule.example.wrong.actor}</div>
                <div style={{ color: '#7f1d1d', fontSize: isMobile ? '13px' : '14px' }}>{rule.example.wrong.text}</div>
              </div>
              <div style={{ background: '#dcfce7', borderRadius: '10px', padding: '10px', marginBottom: '8px' }}>
                <div style={{ fontWeight: 'bold', color: '#14532d', fontSize: '12px', marginBottom: '3px' }}>{rule.example.right.actor}</div>
                <div style={{ color: '#166534', fontSize: isMobile ? '13px' : '14px' }}>{rule.example.right.text}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '10px', padding: '8px', fontSize: '12px', color: rule.textColor, fontStyle: 'italic' }}>
                💡 {rule.tip}
              </div>
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => { if (currentCard > 0) { setCurrentCard(p => p - 1); setFlipped(false) } }}
            disabled={currentCard === 0}
            style={{
              background: currentCard === 0 ? '#f3f4f6' : 'white', color: currentCard === 0 ? '#d1d5db' : '#374151',
              border: '2px solid #e5e7eb', borderRadius: '12px', padding: '12px 18px',
              fontSize: '15px', cursor: currentCard === 0 ? 'default' : 'pointer', fontWeight: 'bold',
            }}>← 이전</button>

          {!learnedCards.includes(rule.id) ? (
            <button onClick={() => setShowQuiz(true)} style={{
              background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', border: 'none',
              borderRadius: '12px', padding: '12px 22px', fontSize: '15px', fontWeight: 'bold',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(5,150,105,0.4)', flex: 1, maxWidth: '200px',
            }}>✅ 배웠어요! (퀴즈)</button>
          ) : (
            <div style={{
              background: '#d1fae5', color: '#065f46', border: '2px solid #6ee7b7',
              borderRadius: '12px', padding: '12px 22px', fontSize: '15px', fontWeight: 'bold', flex: 1, maxWidth: '200px', textAlign: 'center',
            }}>✓ 통과!</div>
          )}

          {currentCard < RULES.length - 1 ? (
            <button onClick={handleNext} style={{
              background: 'linear-gradient(135deg, #1d4ed8, #4f46e5)', color: 'white', border: 'none',
              borderRadius: '12px', padding: '12px 18px', fontSize: '15px', cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(29,78,216,0.35)',
            }}>다음 →</button>
          ) : (
            <button
              onClick={() => setAllDone(true)}
              disabled={!allLearned}
              style={{
                background: allLearned ? 'linear-gradient(135deg, #7c3aed, #db2777)' : '#e5e7eb',
                color: allLearned ? 'white' : '#9ca3af', border: 'none',
                borderRadius: '12px', padding: '12px 18px', fontSize: '15px',
                cursor: allLearned ? 'pointer' : 'not-allowed', fontWeight: 'bold',
                boxShadow: allLearned ? '0 4px 12px rgba(124,58,237,0.4)' : 'none',
              }}>
              {allLearned ? '완료! 🎉' : `🔒 ${learnedCards.length}/4 완료`}
            </button>
          )}
        </div>
      </div>

      <ProgressGoals progress={playerData.progress} />
      {showQuiz && <QuizModal rule={rule} onSuccess={handleQuizSuccess} onClose={() => setShowQuiz(false)} />}
      {showReward && <RewardPopup reward={showReward} onClose={() => setShowReward(null)} />}
    </div>
  )
}
