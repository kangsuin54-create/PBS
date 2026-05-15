import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import ProgressGoals from '../components/ProgressGoals'

const RULES = [
  {
    id: 1,
    emoji: '🙋',
    title: '친구 말 끊지 않기',
    color: '#dbeafe',
    border: '#60a5fa',
    textColor: '#1e40af',
    description: '친구가 말하는 동안은 조용히 기다려요!',
    example: {
      wrong: { actor: '😤 나쁜 예', text: '"야야야! 나도 나도!" 하며 친구 말을 끊는 것' },
      right: { actor: '😊 좋은 예', text: '"친구야, 다 말해봐! 나도 기다릴 수 있어!" 하고 기다리는 것' },
    },
    tip: '말할 차례를 기다리면 친구도 내 말을 잘 들어줘요 👂',
    progressKey: 'social',
    progressAmount: 15,
    exp: 20,
  },
  {
    id: 2,
    emoji: '🤝',
    title: '도움 요청하기',
    color: '#d1fae5',
    border: '#34d399',
    textColor: '#065f46',
    description: '혼자 어렵다면 도움을 구해봐요!',
    example: {
      wrong: { actor: '😤 나쁜 예', text: '혼자 끙끙대다가 포기하거나 화내는 것' },
      right: { actor: '😊 좋은 예', text: '"도와줄 수 있어?" 하고 공손하게 부탁하는 것' },
    },
    tip: '도움을 요청하는 건 용기 있는 행동이에요 💪',
    progressKey: 'social',
    progressAmount: 15,
    exp: 20,
  },
  {
    id: 3,
    emoji: '💬',
    title: '화날 때 말로 표현하기',
    color: '#ede9fe',
    border: '#a78bfa',
    textColor: '#4c1d95',
    description: '감정을 말로 표현하면 서로 이해해요!',
    example: {
      wrong: { actor: '😤 나쁜 예', text: '화가 나서 소리를 지르거나 물건을 던지는 것' },
      right: { actor: '😊 좋은 예', text: '"나 지금 속상해" 또는 "그건 싫어"라고 말하는 것' },
    },
    tip: '내 마음을 말로 표현하면 친구가 이해할 수 있어요 ❤️',
    progressKey: 'selfControl',
    progressAmount: 20,
    exp: 25,
  },
  {
    id: 4,
    emoji: '🎮',
    title: '아이템 함께 쓰기',
    color: '#fef3c7',
    border: '#fbbf24',
    textColor: '#92400e',
    description: '나눔은 더 큰 기쁨을 만들어요!',
    example: {
      wrong: { actor: '😤 나쁜 예', text: '"이건 내 거야!" 하며 혼자만 독차지하는 것' },
      right: { actor: '😊 좋은 예', text: '"같이 쓰자!" 하며 함께 즐기는 것' },
    },
    tip: '함께 쓰면 두 배로 즐거워요! 🎉',
    progressKey: 'positiveRelationship',
    progressAmount: 15,
    exp: 20,
  },
]

function RewardPopup({ reward, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '32px', textAlign: 'center',
        maxWidth: '320px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        animation: 'bounce-in 0.5s ease-out',
      }}>
        <div style={{ fontSize: '60px', marginBottom: '12px' }}>🎉</div>
        <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>규칙 마스터!</h3>
        <div style={{
          background: '#fef3c7', border: '2px solid #fcd34d', borderRadius: '12px',
          padding: '12px', marginBottom: '16px', fontSize: '20px', fontWeight: 'bold', color: '#92400e',
        }}>
          ⭐ +{reward.exp} EXP 획득!
        </div>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>이 규칙을 완벽하게 이해했어요!</p>
        <button onClick={onClose} style={{
          background: 'linear-gradient(135deg, #059669, #0284c7)', color: 'white', border: 'none',
          borderRadius: '99px', padding: '12px 28px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
        }}>계속하기 →</button>
      </div>
    </div>
  )
}

export default function LearningScreen({ playerData, actions }) {
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [learnedCards, setLearnedCards] = useState([])
  const [showReward, setShowReward] = useState(null)
  const [allDone, setAllDone] = useState(false)

  const rule = RULES[currentCard]

  const handleLearn = () => {
    if (learnedCards.includes(rule.id)) return
    setLearnedCards(prev => [...prev, rule.id])
    actions.addExp(rule.exp)
    actions.updateProgress(rule.progressKey, rule.progressAmount)
    actions.updateProgress('ruleUnderstanding', 20)
    setShowReward(rule)
  }

  const handleNext = () => {
    if (currentCard < RULES.length - 1) {
      setCurrentCard(prev => prev + 1)
      setFlipped(false)
    } else {
      setAllDone(true)
    }
  }

  if (allDone) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StatusBar playerData={playerData} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '24px' }}>
          <div style={{ fontSize: '80px', marginBottom: '16px' }}>🏆</div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>규칙 학습 완료!</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '16px' }}>
            {learnedCards.length}개의 규칙을 배웠어요! 정말 대단해요! 🎉
          </p>
          <button onClick={() => actions.goTo('reinforcement')} style={{
            background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', border: 'none',
            borderRadius: '99px', padding: '16px 40px', fontSize: '20px', fontWeight: 'bold',
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
      <div style={{ flex: 1, padding: '20px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
            📚 1단계: 규칙 배우기
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {RULES.map((r, i) => (
              <div key={r.id} onClick={() => { setCurrentCard(i); setFlipped(false) }} style={{
                width: '32px', height: '32px', borderRadius: '50%',
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

        <div onClick={() => setFlipped(!flipped)} style={{
          background: rule.color, border: `3px solid ${rule.border}`, borderRadius: '24px',
          padding: '28px', marginBottom: '16px', cursor: 'pointer', transition: 'all 0.3s',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '64px', marginBottom: '8px' }}>{rule.emoji}</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: rule.textColor, marginBottom: '6px' }}>
              {rule.title}
            </h3>
            <p style={{ color: rule.textColor, fontSize: '15px', opacity: 0.8 }}>{rule.description}</p>
          </div>

          {!flipped ? (
            <div style={{
              background: 'rgba(255,255,255,0.6)', borderRadius: '12px', padding: '12px',
              textAlign: 'center', color: rule.textColor, fontSize: '14px',
            }}>
              👆 카드를 클릭하면 예시를 볼 수 있어요!
            </div>
          ) : (
            <div>
              <div style={{ background: '#fee2e2', borderRadius: '12px', padding: '12px', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', color: '#991b1b', fontSize: '13px', marginBottom: '4px' }}>{rule.example.wrong.actor}</div>
                <div style={{ color: '#7f1d1d', fontSize: '14px' }}>{rule.example.wrong.text}</div>
              </div>
              <div style={{ background: '#dcfce7', borderRadius: '12px', padding: '12px', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', color: '#14532d', fontSize: '13px', marginBottom: '4px' }}>{rule.example.right.actor}</div>
                <div style={{ color: '#166534', fontSize: '14px' }}>{rule.example.right.text}</div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.7)', borderRadius: '12px', padding: '10px',
                fontSize: '13px', color: rule.textColor, fontStyle: 'italic',
              }}>
                💡 {rule.tip}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => { if (currentCard > 0) { setCurrentCard(p => p - 1); setFlipped(false) } }}
            disabled={currentCard === 0}
            style={{
              background: currentCard === 0 ? '#e5e7eb' : 'white',
              color: currentCard === 0 ? '#9ca3af' : '#1f2937',
              border: '2px solid #e5e7eb', borderRadius: '12px', padding: '12px 20px',
              fontSize: '16px', cursor: currentCard === 0 ? 'default' : 'pointer', fontWeight: 'bold',
            }}>← 이전</button>

          {!learnedCards.includes(rule.id) ? (
            <button onClick={handleLearn} style={{
              background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', border: 'none',
              borderRadius: '12px', padding: '12px 24px', fontSize: '16px', fontWeight: 'bold',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(5,150,105,0.4)',
            }}>✅ 이 규칙 배웠어요!</button>
          ) : (
            <div style={{
              background: '#d1fae5', color: '#065f46', border: '2px solid #6ee7b7',
              borderRadius: '12px', padding: '12px 24px', fontSize: '16px', fontWeight: 'bold',
            }}>✓ 완료!</div>
          )}

          <button onClick={handleNext} style={{
            background: currentCard === RULES.length - 1
              ? 'linear-gradient(135deg, #7c3aed, #db2777)'
              : 'linear-gradient(135deg, #1d4ed8, #4f46e5)',
            color: 'white', border: 'none', borderRadius: '12px', padding: '12px 20px',
            fontSize: '16px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(29,78,216,0.4)',
          }}>{currentCard === RULES.length - 1 ? '완료! 🎉' : '다음 →'}</button>
        </div>
      </div>

      <ProgressGoals progress={playerData.progress} />
      {showReward && <RewardPopup reward={showReward} onClose={() => setShowReward(null)} />}
    </div>
  )
}