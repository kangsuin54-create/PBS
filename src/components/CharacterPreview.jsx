export default function CharacterPreview({ equipped, size = 'md', playerData }) {
  const { hat, accessory, companion, background } = equipped || {}
  const isLg = size === 'lg'
  const wizardSize = isLg ? '80px' : '56px'
  const itemSize = isLg ? '36px' : '26px'
  const companionSize = isLg ? '48px' : '34px'

  return (
    <div style={{
      position: 'relative',
      background: background?.bg || 'linear-gradient(135deg, #ecfdf5, #eff6ff)',
      borderRadius: isLg ? '24px' : '18px',
      padding: isLg ? '24px 20px' : '16px 14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: isLg ? '200px' : '150px',
      border: '3px solid rgba(255,255,255,0.8)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}>
      {/* 배경 이모지 장식 */}
      {background && (
        <>
          <span style={{ position: 'absolute', top: '8px', left: '10px', fontSize: itemSize, opacity: 0.5 }}>
            {background.emoji}
          </span>
          <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: itemSize, opacity: 0.4 }}>
            {background.emoji}
          </span>
        </>
      )}

      {/* 동반자 */}
      {companion && (
        <span style={{
          position: 'absolute',
          right: isLg ? '16px' : '10px',
          bottom: isLg ? '20px' : '14px',
          fontSize: companionSize,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          animation: 'float 3s ease-in-out infinite',
        }}>
          {companion.emoji}
        </span>
      )}

      {/* 모자 */}
      {hat && (
        <span style={{ fontSize: isLg ? '40px' : '28px', lineHeight: 1, marginBottom: '-6px' }}>
          {hat.emoji}
        </span>
      )}

      {/* 메인 마법사 */}
      <span style={{
        fontSize: wizardSize,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
        lineHeight: 1,
      }}>🧙‍♂️</span>

      {/* 액세서리 */}
      {accessory && (
        <span style={{ fontSize: isLg ? '32px' : '22px', marginTop: '2px', lineHeight: 1 }}>
          {accessory.emoji}
        </span>
      )}

      {/* 레벨 뱃지 */}
      {playerData && (
        <div style={{
          position: 'absolute', top: '8px', right: '8px',
          background: 'rgba(255,255,255,0.9)', borderRadius: '99px',
          padding: '2px 8px', fontSize: '11px', fontWeight: 'bold', color: '#1d4ed8',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}>
          Lv.{playerData.level}
        </div>
      )}
    </div>
  )
}
