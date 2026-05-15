export default function StatusBar({ playerData }) {
  const expPercent = playerData.exp % 100

  return (
    <div style={{
      background: 'white',
      borderBottom: '3px solid #86efac',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px' }}>🧙</span>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1e40af' }}>{playerData.name}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Lv.{playerData.level} 모험가</div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: '120px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b7280', marginBottom: '3px' }}>
          <span>⭐ EXP</span>
          <span>{playerData.exp % 100}/100</span>
        </div>
        <div style={{ background: '#e5e7eb', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
          <div style={{
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
            width: `${expPercent}%`,
            height: '100%',
            borderRadius: '99px',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      <div style={{
        background: '#eff6ff',
        borderRadius: '12px',
        padding: '4px 12px',
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#1d4ed8',
        border: '2px solid #bfdbfe',
      }}>
        🤝 팀포인트: {playerData.teamPoints}
      </div>

      <div style={{
        background: '#fdf4ff',
        borderRadius: '12px',
        padding: '4px 12px',
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#7e22ce',
        border: '2px solid #e9d5ff',
      }}>
        🏅 배지: {playerData.badges.length}개
      </div>
    </div>
  )
}