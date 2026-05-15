export default function CharacterPreview({ equipped, size = 'md', playerData, gender = 'male' }) {
  const { hat, accessory, companion, background } = equipped || {}
  const isLg = size === 'lg'

  const W = isLg ? 220 : 160
  const H = isLg ? 260 : 190

  const charSrc = `/items/character_${gender}.jpg`

  return (
    <div style={{
      position: 'relative',
      width: W, height: H,
      borderRadius: isLg ? '20px' : '16px',
      overflow: 'hidden',
      border: '3px solid rgba(255,255,255,0.9)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
      margin: '0 auto',
      flexShrink: 0,
    }}>
      {/* 1. 배경 */}
      {background ? (
        <img
          src={`/items/${background.id}.jpg`}
          alt={background.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #e0f2fe 0%, #bbf7d0 100%)',
        }} />
      )}

      {/* 2. 배경 오버레이 (가독성) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(255,255,255,0.15)',
      }} />

      {/* 3. 동반자 (캐릭터 왼쪽 아래) */}
      {companion && (
        <img
          src={`/items/${companion.id}.jpg`}
          alt={companion.name}
          style={{
            position: 'absolute',
            left: 2, bottom: 6,
            width: isLg ? 76 : 55,
            height: isLg ? 76 : 55,
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        />
      )}

      {/* 4. 모자 (캐릭터 머리 위) */}
      {hat && (
        <img
          src={`/items/${hat.id}.jpg`}
          alt={hat.name}
          style={{
            position: 'absolute',
            top: isLg ? 2 : 1,
            left: '50%',
            transform: 'translateX(-50%)',
            width: isLg ? 90 : 66,
            height: isLg ? 68 : 50,
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
            zIndex: 5,
          }}
        />
      )}

      {/* 5. 메인 캐릭터 */}
      <img
        src={charSrc}
        alt="캐릭터"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isLg ? 150 : 110,
          height: isLg ? 200 : 148,
          objectFit: 'contain',
          mixBlendMode: 'multiply',
          zIndex: 3,
        }}
      />

      {/* 6. 액세서리 (캐릭터 위 중앙) */}
      {accessory && (
        <img
          src={`/items/${accessory.id}.jpg`}
          alt={accessory.name}
          style={{
            position: 'absolute',
            bottom: isLg ? 40 : 30,
            left: '50%',
            transform: 'translateX(-50%)',
            width: isLg ? 64 : 46,
            height: isLg ? 64 : 46,
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))',
            zIndex: 6,
          }}
        />
      )}

      {/* 레벨 뱃지 */}
      {playerData && (
        <div style={{
          position: 'absolute', top: 6, right: 6,
          background: 'rgba(255,255,255,0.95)', borderRadius: '99px',
          padding: '2px 8px', fontSize: '11px', fontWeight: 'bold', color: '#1d4ed8',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)', zIndex: 10,
        }}>
          Lv.{playerData.level}
        </div>
      )}
    </div>
  )
}
