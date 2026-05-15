const GOALS = [
  { key: 'selfControl', label: '자기조절', emoji: '🧘', color: '#a78bfa', bg: '#ede9fe' },
  { key: 'social', label: '사회성', emoji: '👫', color: '#34d399', bg: '#d1fae5' },
  { key: 'ruleUnderstanding', label: '규칙 이해', emoji: '📖', color: '#60a5fa', bg: '#dbeafe' },
  { key: 'positiveRelationship', label: '긍정적 관계', emoji: '💛', color: '#fbbf24', bg: '#fef3c7' },
]

export default function ProgressGoals({ progress }) {
  return (
    <div style={{
      background: '#fffbeb',
      borderTop: '3px solid #fcd34d',
      padding: '12px 20px',
    }}>
      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
        🎯 오늘의 성장 목표
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {GOALS.map(goal => (
          <div key={goal.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
              <span>{goal.emoji} {goal.label}</span>
              <span style={{ color: goal.color, fontWeight: 'bold' }}>{progress[goal.key]}%</span>
            </div>
            <div style={{ background: '#e5e7eb', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
              <div style={{
                background: goal.color,
                width: `${progress[goal.key]}%`,
                height: '100%',
                borderRadius: '99px',
                transition: 'width 0.8s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}