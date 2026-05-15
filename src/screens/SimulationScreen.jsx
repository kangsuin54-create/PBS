import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import ProgressGoals from '../components/ProgressGoals'
import useIsMobile from '../hooks/useIsMobile'

const SCENARIOS = [
  {
    id: 1,
    title: '친구와 갈등 상황',
    situation: '퀘스트 아이템을 놓고 친구와 의견이 달라요. 친구가 "내가 먼저 봤어!"라고 말해요.',
    npcName: '마법사 루루',
    npcEmoji: '🧙‍♀️',
    choices: [
      { text: '😤 "아니야! 내가 먼저야!" 크게 소리치기', correct: false, feedback: '소리를 지르면 갈등이 더 커져요. 차분하게 말해봐요! 💡' },
      { text: '😢 아무 말 없이 그냥 양보하기', correct: false, feedback: '양보도 좋지만, 내 마음을 말로 표현하는 것도 중요해요! 💬' },
      { text: '😊 "같이 쓰는 건 어때? 번갈아 쓰자!"', correct: true, feedback: '완벽해요! 협상하는 방법을 잘 알고 있어요! 🌟' },
      { text: '😤 슬쩍 가져가 버리기', correct: false, feedback: '몰래 가져가면 친구가 상처받아요. 정직하게 이야기해봐요! 💡' },
    ],
    exp: 40,
    progressKey: 'social',
  },
  {
    id: 2,
    title: '팀 퀘스트 수행 중',
    situation: '팀 미션 중에 친구가 실수로 모든 팀의 점수를 잃게 만들었어요.',
    npcName: '용사 코코',
    npcEmoji: '⚔️',
    choices: [
      { text: '😤 "너 때문이야!" 친구 탓하기', correct: false, feedback: '탓하면 팀이 약해져요. 함께 해결하는 방법을 찾아봐요! 💡' },
      { text: '😊 "괜찮아! 다음엔 같이 잘 하면 돼!" 격려하기', correct: true, feedback: '최고예요! 진짜 팀원은 실수한 친구를 격려해줘요! 🌟' },
      { text: '😶 모른 척하고 혼자 진행하기', correct: false, feedback: '팀원을 무시하면 팀이 무너져요. 함께 이야기해봐요! 💡' },
      { text: '😭 그냥 포기해버리기', correct: false, feedback: '포기는 금물! 실수에서 함께 배울 수 있어요! 💪' },
    ],
    exp: 40,
    progressKey: 'positiveRelationship',
  },
  {
    id: 3,
    title: '감정 조절 챌린지',
    situation: '게임에서 지고 있어요. 화가 많이 나고 그냥 나가버리고 싶어요.',
    npcName: '감정 요정 리리',
    npcEmoji: '🧚',
    choices: [
      { text: '😤 기기를 세게 내려놓기', correct: false, feedback: '화가 나도 물건을 다치게 하면 안 돼요. 깊게 숨 쉬어봐요! 💡' },
      { text: '🧘 잠깐 멈추고 깊게 숨쉬기', correct: true, feedback: '훌륭해요! 잠깐 멈추고 숨 쉬는 게 최고의 방법이에요! 🌟' },
      { text: '😭 그냥 우는 척하기', correct: false, feedback: '감정은 솔직하게 표현해요. "나 지금 힘들어"라고 말해봐요! 💡' },
      { text: '😤 화난 채로 계속 하기', correct: false, feedback: '화난 상태에선 더 실수가 나요. 잠깐 쉬어가요! 💡' },
    ],
    exp: 50,
    progressKey: 'selfControl',
  },
]

function NPCBubble({ npcEmoji, npcName, text, type }) {
  return (
    <div style={{
      display: 'flex', gap: '12px', alignItems: 'flex-start',
      background: type === 'guide' ? '#ede9fe' : type === 'correct' ? '#dcfce7' : '#fee2e2',
      border: `2px solid ${type === 'guide' ? '#a78bfa' : type === 'correct' ? '#4ade80' : '#fca5a5'}`,
      borderRadius: '16px', padding: '14px', marginBottom: '12px',
      animation: 'slide-in-up 0.3s ease-out',
    }}>
      <div style={{ fontSize: '36px', flexShrink: 0 }}>{npcEmoji}</div>
      <div>
        <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#4b5563', marginBottom: '4px' }}>{npcName}</div>
        <div style={{ fontSize: '15px', color: '#1f2937', lineHeight: '1.5' }}>{text}</div>
      </div>
    </div>
  )
}

const PASS_THRESHOLD = 2 // 3개 중 2개 이상 맞아야 통과

export default function SimulationScreen({ playerData, actions }) {
  const isMobile = useIsMobile()
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([]) // true/false per scenario
  const [allDone, setAllDone] = useState(false)
  const [retryMode, setRetryMode] = useState(false)
  const [retryQueue, setRetryQueue] = useState([]) // indices to retry
  const [retryIdx, setRetryIdx] = useState(0)
  const [retryScore, setRetryScore] = useState(0)

  const scenario = retryMode ? SCENARIOS[retryQueue[retryIdx]] : SCENARIOS[scenarioIdx]

  const handleChoice = (choice, idx) => {
    if (selected !== null) return
    setSelected(idx)
    const correct = choice.correct
    if (correct) {
      actions.addExp(scenario.exp)
      actions.addCoins(10)
      actions.updateProgress(scenario.progressKey, 20)
      actions.updateProgress('selfControl', 10)
      if (!retryMode) {
        setScore(prev => prev + 1)
        actions.addBadge(`시나리오 ${scenarioIdx + 1} 클리어 🏅`)
      } else {
        setRetryScore(prev => prev + 1)
      }
    } else {
      actions.addCoins(2)
    }
  }

  const handleNext = () => {
    const correct = scenario.choices[selected].correct
    if (retryMode) {
      const newResults = [...results]
      newResults[retryQueue[retryIdx]] = correct
      setResults(newResults)
      if (retryIdx < retryQueue.length - 1) {
        setRetryIdx(prev => prev + 1)
        setSelected(null)
      } else {
        setAllDone(true)
      }
      return
    }

    const newResults = [...results, correct]
    setResults(newResults)

    if (scenarioIdx < SCENARIOS.length - 1) {
      setScenarioIdx(prev => prev + 1)
      setSelected(null)
    } else {
      const finalScore = newResults.filter(Boolean).length
      if (finalScore >= PASS_THRESHOLD) {
        setScore(finalScore)
        setAllDone(true)
      } else {
        // 재도전 모드: 틀린 시나리오만 다시
        const failedIndices = newResults.map((r, i) => r ? null : i).filter(i => i !== null)
        setRetryQueue(failedIndices)
        setRetryIdx(0)
        setRetryMode(true)
        setSelected(null)
      }
    }
  }

  const finalScore = retryMode
    ? results.filter(Boolean).length + retryScore
    : results.filter(Boolean).length + (selected !== null && scenario?.choices[selected]?.correct ? 1 : 0)

  if (allDone) {
    const totalCorrect = results.filter(Boolean).length
    const perfect = totalCorrect === SCENARIOS.length
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StatusBar playerData={playerData} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '12px' }}>{perfect ? '🥇' : totalCorrect >= PASS_THRESHOLD ? '🎖️' : '💪'}</div>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>실전 연습 완료!</h2>
          <div style={{
            background: '#fef3c7', border: '2px solid #fcd34d', borderRadius: '16px',
            padding: '14px 24px', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold', color: '#92400e',
          }}>
            {totalCorrect}/{SCENARIOS.length} 정답! {perfect ? '🌟 퍼펙트!' : retryMode ? '🔄 재도전 완료!' : '잘 했어요!'}
          </div>
          <button onClick={() => actions.goTo('dashboard')} style={{
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', border: 'none',
            borderRadius: '99px', padding: '15px 36px', fontSize: '18px', fontWeight: 'bold',
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(245,158,11,0.4)',
          }}>성장 리포트 보기! 📊</button>
        </div>
        <ProgressGoals progress={playerData.progress} />
      </div>
    )
  }

  // 재도전 안내 화면
  if (retryMode && retryIdx === 0 && selected === null && results.length > 0) {
    const failed = retryQueue.length
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StatusBar playerData={playerData} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '72px', marginBottom: '12px' }}>💪</div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>아직 연습이 필요해요!</h2>
          <p style={{ color: '#6b7280', marginBottom: '8px', fontSize: '15px' }}>
            통과 기준: {PASS_THRESHOLD}개 이상 정답<br />
            현재 결과: {results.filter(Boolean).length}/{SCENARIOS.length}개 정답
          </p>
          <div style={{
            background: '#fee2e2', border: '2px solid #fca5a5', borderRadius: '14px',
            padding: '14px 20px', marginBottom: '20px', fontSize: '14px', color: '#991b1b',
          }}>
            틀린 상황 {failed}개를 다시 도전해봐요!<br />이번엔 잘 할 수 있을 거예요 🌟
          </div>
          <button onClick={() => setSelected(null)} style={{
            background: 'linear-gradient(135deg, #059669, #0284c7)', color: 'white', border: 'none',
            borderRadius: '99px', padding: '14px 36px', fontSize: '17px', fontWeight: 'bold',
            cursor: 'pointer', boxShadow: '0 6px 20px rgba(5,150,105,0.4)',
          }}>🔄 다시 도전하기!</button>
        </div>
        <ProgressGoals progress={playerData.progress} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StatusBar playerData={playerData} />
      <div style={{ flex: 1, padding: isMobile ? '12px' : '20px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '10px' : '16px' }}>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 'bold', color: retryMode ? '#f59e0b' : '#059669', marginBottom: '4px' }}>
            {retryMode ? '🔄 재도전 중!' : '🎭 3단계: 실전 연습'}
          </h2>
          {retryMode && (
            <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '4px' }}>
              틀린 상황 재도전 {retryIdx + 1}/{retryQueue.length}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {SCENARIOS.map((_, i) => {
              const isDone = retryMode ? results[i] !== undefined : i < scenarioIdx
              const isCurrent = retryMode ? retryQueue[retryIdx] === i : i === scenarioIdx
              const isCorrect = results[i] === true
              const isWrong = results[i] === false
              return (
                <div key={i} style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: isCurrent ? '#f59e0b' : isCorrect ? '#059669' : isWrong ? '#ef4444' : isDone ? '#d1d5db' : '#e5e7eb',
                  color: (isCurrent || isCorrect || isWrong) ? 'white' : '#9ca3af',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 'bold',
                }}>{isCorrect ? '✓' : isWrong ? '✗' : i + 1}</div>
              )
            })}
          </div>
        </div>

        {/* 상황 설명 */}
        <div style={{
          background: '#fffbeb', border: '2px solid #fcd34d', borderRadius: '14px',
          padding: isMobile ? '12px' : '16px', marginBottom: '10px',
        }}>
          <div style={{ fontWeight: 'bold', color: '#92400e', fontSize: isMobile ? '13px' : '15px', marginBottom: '4px' }}>
            📍 {scenario.title}
          </div>
          <div style={{ color: '#78350f', fontSize: isMobile ? '13px' : '14px', lineHeight: '1.6' }}>
            {scenario.situation}
          </div>
        </div>

        {/* NPC 말풍선 */}
        <NPCBubble
          npcEmoji={scenario.npcEmoji}
          npcName={scenario.npcName}
          text="어떻게 행동할 건가요? 가장 좋은 방법을 골라봐요!"
          type="guide"
        />

        {/* 선택지 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '10px', marginBottom: '10px' }}>
          {scenario.choices.map((choice, i) => {
            const isSelected = selected === i
            const isCorrect = choice.correct
            let bg = 'white', border = '#e5e7eb', color = '#1f2937'
            if (selected !== null) {
              if (isSelected && isCorrect) { bg = '#dcfce7'; border = '#4ade80'; color = '#166534' }
              else if (isSelected && !isCorrect) { bg = '#fee2e2'; border = '#fca5a5'; color = '#991b1b' }
              else if (!isSelected && isCorrect) { bg = '#dcfce7'; border = '#4ade80'; color = '#166534' }
            }

            return (
              <button key={i} onClick={() => handleChoice(choice, i)} style={{
                background: bg, border: `2px solid ${border}`, borderRadius: '12px',
                padding: isMobile ? '12px 14px' : '14px 16px',
                cursor: selected !== null ? 'default' : 'pointer',
                textAlign: 'left', fontSize: isMobile ? '13px' : '15px', color, fontWeight: '500',
                transition: 'all 0.3s', boxShadow: selected !== null ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                lineHeight: '1.4',
              }}>
                {selected !== null && isSelected && (isCorrect ? '✅ ' : '❌ ')}
                {choice.text}
              </button>
            )
          })}
        </div>

        {/* 피드백 */}
        {selected !== null && (
          <NPCBubble
            npcEmoji={scenario.npcEmoji}
            npcName={scenario.npcName}
            text={scenario.choices[selected].feedback}
            type={scenario.choices[selected].correct ? 'correct' : 'wrong'}
          />
        )}

        {selected !== null && (
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <button onClick={handleNext} style={{
              background: 'linear-gradient(135deg, #059669, #0284c7)', color: 'white', border: 'none',
              borderRadius: '99px', padding: '14px 36px', fontSize: '18px', fontWeight: 'bold',
              cursor: 'pointer', boxShadow: '0 6px 20px rgba(5,150,105,0.4)',
            }}>
              {retryMode
                ? retryIdx < retryQueue.length - 1 ? '다음 재도전 →' : '결과 보기! 🎉'
                : scenarioIdx < SCENARIOS.length - 1 ? '다음 상황 →' : '결과 보기! 🎉'
              }
            </button>
          </div>
        )}
      </div>
      <ProgressGoals progress={playerData.progress} />
    </div>
  )
}