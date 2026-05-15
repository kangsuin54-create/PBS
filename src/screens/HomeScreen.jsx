import { useState, useEffect } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import BottomNav from '../components/BottomNav'
import CharacterPreview from '../components/CharacterPreview'

export default function HomeScreen({ onStart, user, onLogout, playerData, actions }) {
  const isMobile = useIsMobile()
  const [floatY, setFloatY] = useState(0)

  useEffect(() => {
    let t = 0
    const id = setInterval(() => { t += 0.05; setFloatY(Math.sin(t) * 8) }, 50)
    return () => clearInterval(id)
  }, [])

  return (
    <>
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '16px' : '24px',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 50%, #fdf4ff 100%)',
    }}>
      {/* 유저 정보 */}
      {user && (
        <div style={{
          position: 'fixed', top: '10px', right: '10px',
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'white', borderRadius: '99px',
          padding: isMobile ? '5px 10px' : '6px 14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '2px solid #bbf7d0', zIndex: 100,
        }}>
          <span style={{ fontSize: '16px' }}>👤</span>
          {!isMobile && (
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.user_metadata?.nickname || user?.email?.split('@')[0] || '모험가'}
            </span>
          )}
          <button onClick={onLogout} style={{
            background: '#fee2e2', border: 'none', borderRadius: '99px',
            padding: '4px 10px', fontSize: '12px', color: '#991b1b',
            cursor: 'pointer', fontWeight: 'bold',
          }}>로그아웃</button>
        </div>
      )}

      {/* 마스코트 */}
      <div style={{
        fontSize: isMobile ? '72px' : '100px',
        transform: `translateY(${floatY}px)`,
        transition: 'transform 0.05s linear',
        marginBottom: '12px',
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
      }}>🧙‍♂️</div>

      {/* 타이틀 */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '18px' : '24px' }}>
        <h1 style={{
          fontSize: isMobile ? '26px' : '36px', fontWeight: '900', marginBottom: '6px',
          background: 'linear-gradient(135deg, #059669, #1d4ed8, #7c3aed)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2,
        }}>🌈 사회성 모험 퀘스트!</h1>
        <p style={{ fontSize: isMobile ? '14px' : '18px', color: '#4b5563', fontWeight: '500' }}>
          친구와 함께 성장하는 특별한 여행 ✨
        </p>
      </div>

      {/* 특징 카드 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: isMobile ? '8px' : '12px',
        maxWidth: isMobile ? '320px' : '400px',
        width: '100%',
        marginBottom: isMobile ? '20px' : '28px',
      }}>
        {[
          { emoji: '📚', title: '규칙 배우기', desc: '올바른 행동 카드', color: '#dbeafe', border: '#93c5fd' },
          { emoji: '🎁', title: '보상 받기', desc: 'EXP와 아이템 획득', color: '#d1fae5', border: '#6ee7b7' },
          { emoji: '🎭', title: '상황 연습', desc: 'NPC와 대화 훈련', color: '#ede9fe', border: '#c4b5fd' },
          { emoji: '📊', title: '성장 리포트', desc: '오늘의 성취 확인', color: '#fef3c7', border: '#fcd34d' },
        ].map((item, i) => (
          <div key={i} style={{
            background: item.color, border: `2px solid ${item.border}`,
            borderRadius: '14px', padding: isMobile ? '12px 10px' : '14px', textAlign: 'center',
          }}>
            <div style={{ fontSize: isMobile ? '26px' : '32px', marginBottom: '4px' }}>{item.emoji}</div>
            <div style={{ fontWeight: 'bold', fontSize: isMobile ? '12px' : '14px', color: '#1f2937' }}>{item.title}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* 시작 버튼 */}
      <button onClick={onStart} style={{
        background: 'linear-gradient(135deg, #059669, #0284c7)', color: 'white',
        border: 'none', borderRadius: '99px',
        padding: isMobile ? '15px 40px' : '18px 48px',
        fontSize: isMobile ? '19px' : '22px', fontWeight: '900',
        cursor: 'pointer', boxShadow: '0 8px 24px rgba(5,150,105,0.4)',
        transition: 'all 0.2s', letterSpacing: '1px', width: isMobile ? '100%' : 'auto',
        maxWidth: '320px',
      }}>🚀 모험 시작하기!</button>

      <p style={{ marginTop: '14px', fontSize: '12px', color: '#9ca3af', marginBottom: '70px' }}>
        PBS 기반 사회성 훈련 프로그램
      </p>
    </div>
    <BottomNav current="home" onNavigate={actions.goTo} />
    </>
  )
}
