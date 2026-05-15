/*
  컨테이너: 200 × 270 px
  캐릭터 이미지(1:1 정사각형)를 object-fit:contain으로 표시
  → 200×200 영역에 이미지가 들어가고 y=35 ~ y=235 범위에 위치
  → 머리 꼭대기: y≈49 / 눈: y≈85 / 가슴: y≈135
  아이템은 이 좌표를 기준으로 절대 위치
*/

const POS = {
  // ── 모자 (머리 꼭대기 기준, 모자 하단이 y≈49에 맞춰짐) ──
  hat_baseball:  { top: -4, left: 55, w: 90, h: 56 },
  hat_tophat:    { top:-10, left: 60, w: 80, h: 62 },
  hat_grad:      { top: -6, left: 57, w: 86, h: 58 },
  hat_crown:     { top:  2, left: 59, w: 82, h: 48 },
  hat_wizard:    { top:-14, left: 52, w: 96, h: 68 },
  hat_santa:     { top: -4, left: 55, w: 90, h: 56 },

  // ── 액세서리 ──────────────────────────────────────
  acc_glasses:    { top: 78, left: 56, w: 88, h: 36 }, // 눈(y≈85) 위아래
  acc_sunglasses: { top: 78, left: 56, w: 88, h: 36 },
  acc_ribbon:     { top: 20, left: 60, w: 80, h: 52 }, // 머리 위 (리본)
  acc_necklace:   { top:124, left: 63, w: 74, h: 58 }, // 가슴(y≈135)
  acc_bow:        { top:118, left: 67, w: 66, h: 42 }, // 목
  acc_medal:      { top:124, left: 65, w: 70, h: 62 }, // 가슴

  // ── 동반자 (오른쪽 하단) ──────────────────────────
  pet_cat:     { top:152, left:122, w: 74, h: 96 },
  pet_dog:     { top:155, left:122, w: 74, h: 92 },
  pet_dragon:  { top:142, left:118, w: 80, h:106 },
  pet_unicorn: { top:144, left:118, w: 80, h:104 },
  pet_star:    { top:158, left:124, w: 70, h: 86 },
  pet_robot:   { top:148, left:122, w: 74, h:100 },
}

function ItemOverlay({ item, scale }) {
  if (!item || !POS[item.id]) return null
  const p = POS[item.id]
  return (
    <img
      src={`/items/${item.id}.jpg`}
      alt={item.name}
      onError={e => { e.target.style.display = 'none' }}
      style={{
        position:     'absolute',
        top:          p.top  * scale,
        left:         p.left * scale,
        width:        p.w    * scale,
        height:       p.h    * scale,
        objectFit:    'contain',
        mixBlendMode: 'multiply',
        pointerEvents:'none',
      }}
    />
  )
}

export default function CharacterSVG({ equipped, gender = 'male', size = 'md', playerData }) {
  const { hat, accessory, companion, background } = equipped || {}
  const isLg  = size === 'lg'
  const scale = isLg ? 1 : 0.72
  const W     = Math.round(200 * scale)
  const H     = Math.round(270 * scale)

  const charSrc = `/items/character_${gender === 'female' ? 'female' : 'male'}.jpg`

  return (
    <div style={{
      position:     'relative',
      width:        W,
      height:       H,
      borderRadius: isLg ? '20px' : '16px',
      overflow:     'hidden',
      border:       '3px solid rgba(255,255,255,0.9)',
      boxShadow:    '0 6px 24px rgba(0,0,0,0.15)',
      margin:       '0 auto',
      flexShrink:   0,
    }}>

      {/* 1. 배경 */}
      {background
        ? <img
            src={`/items/${background.id}.jpg`}
            alt={background.name}
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
          />
        : <div style={{
            position:'absolute', inset:0,
            background: gender === 'female'
              ? 'linear-gradient(180deg,#fce7f3,#ede9fe)'
              : 'linear-gradient(180deg,#dbeafe,#d1fae5)',
          }} />
      }

      {/* 2. 동반자 (캐릭터 뒤) */}
      <ItemOverlay item={companion} scale={scale} />

      {/* 3. AI 생성 베이스 캐릭터 이미지 */}
      <img
        src={charSrc}
        alt="캐릭터"
        style={{
          position:  'absolute',
          top:       35 * scale,
          left:      0,
          width:     W,
          height:    200 * scale,
          objectFit: 'contain',
          mixBlendMode: 'multiply',
        }}
      />

      {/* 4. 모자 (캐릭터 위, 머리 위에) */}
      <ItemOverlay item={hat} scale={scale} />

      {/* 5. 액세서리 (캐릭터 위) */}
      <ItemOverlay item={accessory} scale={scale} />

      {/* 6. 레벨 뱃지 */}
      {playerData && (
        <div style={{
          position:  'absolute', top: 6, right: 6,
          background:'rgba(255,255,255,0.95)', borderRadius:'99px',
          padding:   '2px 8px', fontSize:'11px', fontWeight:'bold', color:'#1d4ed8',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        }}>
          Lv.{playerData.level}
        </div>
      )}
    </div>
  )
}
