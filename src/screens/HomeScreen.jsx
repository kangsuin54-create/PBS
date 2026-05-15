import { useState, useEffect } from 'react'

const STARS = ['⭐', '🌟', '✨', '💫', '🌠']

export default function HomeScreen({ onStart }) {
  const [floatY, setFloatY] = useState(0)

  useEffect(() => {
    let t = 0
    const id = setInterval(() => {
      t += 0.05
      setFloatY(Math.sin(t) * 10)
    }, 50)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 50%, #fdf4ff 100%)',
    }}>
      {/* 배경 별들 */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 16}px`,
            opacity: 0.3 + Math.random() * 0.4,
            animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}>
            {STARS[Math.floor(Math.random() * STARS.length)]}
          </div>
        ))}
      </div>

      {/* 마스코트 캐릭터 */}
      <div style={{
        fontSize: '100px',
        transform: `translateY(${floatY}px)`,
        transition: 'transform 0.05s linear',
        marginBottom: '16px',
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
      }}>
        🧙‍♂️
      </div>

      {/* 타이틀 */}
      <div style={{
        textAlign: 'center',
        marginBottom: '24px',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #059669, #1d4ed8, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          lineHeight: '1.2',
        }}>
          🌈 사회성 모험 퀘스트!
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#4b5563',
          fontWeight: '500',
        }}>
          친구와 함께 성장하는 특별한 여행 ✨
        </p>
      </div>

      {/* 특징 카드들 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        maxWidth: '400px',
        width: '100%',
        marginBottom: '28px',
      }}>
        {[
          { emoji: '📚', title: '규칙 배우기', desc: '올바른 행동 카드', color: '#dbeafe', border: '#93c5fd' },
          { emoji: '🎁', title: '보상 받기', desc: 'EXP와 아이템 획득', color: '#d1fae5', border: '#6ee7b7' },
          { emoji: '🎭', title: '상황 연습', desc: 'NPC와 대화 훈련', color: '#ede9fe', border: '#c4b5fd' },
          { emoji: '📊', title: '성장 리포트', desc: '오늘의 성취 확인', color: '#fef3c7', border: '#fcd34d' },
        ].map((item, i) => (
          <div key={i} style={{
            background: item.color,
            border: `2px solid ${item.border}`,
            borderRadius: '16px',
            padding: '14px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>{item.emoji}</div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1f2937' }}>{item.title}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* 시작 버튼 */}
      <button
        onClick={onStart}
        style={{
          background: 'linear-gradient(135deg, #059669, #0284c7)',
          color: 'white',
          border: 'none',
          borderRadius: '99px',
          padding: '18px 48px',
          fontSize: '22px',
          fontWeight: '900',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(5,150,105,0.4)',
          transform: 'translateY(0)',
          transition: 'all 0.2s',
          letterSpacing: '1px',
        }}
        onMouseEnter={e => {
          e.target.style.transform = 'translateY(-4px) scale(1.03)'
          e.target.style.boxShadow = '0 12px 32px rgba(5,150,105,0.5)'
        }}
        onMouseLeave={e => {
          e.target.style.transform = 'translateY(0) scale(1)'
          e.target.style.boxShadow = '0 8px 24px rgba(5,150,105,0.4)'
        }}
      >
        🚀 모험 시작하기!
      </button>

      <p style={{ marginTop: '16px', fontSize: '13px', color: '#9ca3af' }}>
        PBS 기반 사회성 훈련 프로그램
      </p>
    </div>
  )
}