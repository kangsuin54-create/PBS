// 아이템별 위치 (200×270 기준 px)
const POS = {
  hat_baseball:  { top:  8, left: 55, w: 90, h: 54 },
  hat_tophat:    { top:  2, left: 59, w: 82, h: 58 },
  hat_grad:      { top:  6, left: 56, w: 88, h: 54 },
  hat_crown:     { top: 12, left: 59, w: 82, h: 46 },
  hat_wizard:    { top: -4, left: 51, w: 98, h: 66 },
  hat_santa:     { top:  6, left: 55, w: 90, h: 54 },
  acc_glasses:    { top: 78, left: 57, w: 86, h: 36 },
  acc_sunglasses: { top: 78, left: 57, w: 86, h: 36 },
  acc_ribbon:     { top: 30, left: 61, w: 78, h: 50 },
  acc_necklace:   { top:128, left: 63, w: 74, h: 58 },
  acc_bow:        { top:122, left: 67, w: 66, h: 42 },
  acc_medal:      { top:128, left: 65, w: 70, h: 62 },
  pet_cat:     { top:148, left:120, w: 76, h:100 },
  pet_dog:     { top:152, left:120, w: 76, h: 96 },
  pet_dragon:  { top:140, left:116, w: 82, h:108 },
  pet_unicorn: { top:142, left:116, w: 82, h:106 },
  pet_star:    { top:155, left:122, w: 72, h: 88 },
  pet_robot:   { top:146, left:120, w: 76, h:102 },
}

// ── 베이스 캐릭터 (SVG 내부 요소들) ──────────────
function CharacterBody({ gender }) {
  const isMale    = gender !== 'female'
  const robeColor = isMale ? '#3b82f6' : '#ec4899'
  const robeDark  = isMale ? '#1d4ed8' : '#be185d'
  const robeTrim  = isMale ? '#93c5fd' : '#fbcfe8'
  const hairColor = isMale ? '#92400e' : '#ec4899'
  const eyeColor  = isMale ? '#1d4ed8' : '#7c3aed'

  return (
    <>
      {/* 그림자 */}
      <ellipse cx="100" cy="263" rx="48" ry="7" fill="rgba(0,0,0,0.12)" />

      {/* 로브 몸체 */}
      <path d="M58,152 Q52,205 48,262 L152,262 Q148,205 142,152 Z" fill={robeColor} />
      <path d="M100,152 Q98,205 97,262" fill="none" stroke={robeDark} strokeWidth="2" opacity="0.4" />
      {/* 소매 왼 */}
      <path d="M58,152 Q38,162 30,190 Q36,195 46,185 Q52,170 62,162 Z" fill={robeColor} stroke={robeDark} strokeWidth="1" />
      <ellipse cx="32" cy="193" rx="10" ry="8" fill="#fde68a" stroke="#fbbf24" strokeWidth="1" />
      {/* 소매 우 */}
      <path d="M142,152 Q162,162 170,190 Q164,195 154,185 Q148,170 138,162 Z" fill={robeColor} stroke={robeDark} strokeWidth="1" />
      <ellipse cx="168" cy="193" rx="10" ry="8" fill="#fde68a" stroke="#fbbf24" strokeWidth="1" />
      {/* 트림 */}
      <path d="M48,258 Q100,268 152,258 L152,262 Q100,272 48,262 Z" fill={robeTrim} />
      <path d="M68,152 Q100,148 132,152" fill="none" stroke={robeTrim} strokeWidth="3" />

      {/* 목 */}
      <rect x="88" y="140" width="24" height="16" rx="8" fill="#fde68a" />

      {/* 머리 */}
      <circle cx="100" cy="97" r="48" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />

      {/* 머리카락 */}
      {isMale ? (
        <g fill={hairColor}>
          <ellipse cx="100" cy="54" rx="46" ry="16" />
          <ellipse cx="68"  cy="62" rx="16" ry="20" />
          <ellipse cx="132" cy="62" rx="16" ry="20" />
          <ellipse cx="80"  cy="52" rx="10" ry="8"  transform="rotate(-20,80,52)" />
          <ellipse cx="100" cy="49" rx="8"  ry="10" />
          <ellipse cx="120" cy="52" rx="10" ry="8"  transform="rotate(20,120,52)" />
        </g>
      ) : (
        <g fill={hairColor}>
          {/* 앞머리 */}
          <ellipse cx="100" cy="54" rx="44" ry="14" />
          <ellipse cx="76"  cy="58" rx="20" ry="22" />
          <ellipse cx="124" cy="58" rx="20" ry="22" />
          {/* 트윈테일 왼 */}
          <path d="M54,102 Q28,125 34,162 Q44,172 50,150 Q48,124 62,112 Z" />
          {/* 트윈테일 우 */}
          <path d="M146,102 Q172,125 166,162 Q156,172 150,150 Q152,124 138,112 Z" />
          {/* 리본 왼 */}
          <path d="M54,102 L44,93 L49,102 L44,111 Z" fill="#fda4af" />
          <path d="M54,102 L64,93 L59,102 L64,111 Z" fill="#fda4af" />
          <circle cx="54" cy="102" r="5" fill="#ec4899" />
          {/* 리본 우 */}
          <path d="M146,102 L136,93 L141,102 L136,111 Z" fill="#fda4af" />
          <path d="M146,102 L156,93 L151,102 L156,111 Z" fill="#fda4af" />
          <circle cx="146" cy="102" r="5" fill="#ec4899" />
        </g>
      )}

      {/* 눈썹 */}
      <path d="M80,78 Q88,74 94,78"   fill="none" stroke="#6b3f0f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M106,78 Q112,74 120,78" fill="none" stroke="#6b3f0f" strokeWidth="2.5" strokeLinecap="round" />

      {/* 눈 흰자 */}
      <ellipse cx="87"  cy="92" rx="10" ry="11" fill="white" />
      <ellipse cx="113" cy="92" rx="10" ry="11" fill="white" />
      {/* 홍채 */}
      <circle cx="87"  cy="93" r="7" fill={eyeColor} />
      <circle cx="113" cy="93" r="7" fill={eyeColor} />
      {/* 동공 */}
      <circle cx="88"  cy="93" r="4" fill="#111" />
      <circle cx="114" cy="93" r="4" fill="#111" />
      {/* 하이라이트 */}
      <circle cx="90"  cy="90" r="2.5" fill="white" />
      <circle cx="116" cy="90" r="2.5" fill="white" />
      {/* 속눈썹 */}
      <path d="M77,84 Q87,81 97,84"   fill="none" stroke="#1f2937" strokeWidth="1.5" />
      <path d="M103,84 Q113,81 123,84" fill="none" stroke="#1f2937" strokeWidth="1.5" />

      {/* 볼터치 */}
      <ellipse cx="73"  cy="106" rx="11" ry="7" fill="#fda4af" opacity="0.55" />
      <ellipse cx="127" cy="106" rx="11" ry="7" fill="#fda4af" opacity="0.55" />

      {/* 코·입 */}
      <ellipse cx="100" cy="108" rx="5" ry="4" fill="#fbbf24" opacity="0.4" />
      <path d="M88,118 Q100,126 112,118" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M92,120 Q100,126 108,120" fill="white" opacity="0.65" />

      {/* 지팡이 */}
      <line x1="168" y1="193" x2="186" y2="154" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="186" cy="150" r="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="186" cy="150" r="4" fill="white" opacity="0.8" />
      <text x="179" y="140" fontSize="11" fill="#fbbf24">✦</text>
    </>
  )
}

// ── 메인 컴포넌트 ────────────────────────────────
export default function CharacterSVG({ equipped, gender = 'male', size = 'md', playerData }) {
  const { hat, accessory, companion, background } = equipped || {}
  const isLg  = size === 'lg'
  const scale = isLg ? 1 : 0.72
  const W     = Math.round(200 * scale)
  const H     = Math.round(270 * scale)

  const itemStyle = (pos) => ({
    position:      'absolute',
    top:           pos.top  * scale,
    left:          pos.left * scale,
    width:         pos.w    * scale,
    height:        pos.h    * scale,
    objectFit:     'contain',
    mixBlendMode:  'multiply',
    pointerEvents: 'none',
  })

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
        ? <img src={`/items/${background.id}.jpg`} alt={background.name}
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        : <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,#bfdbfe,#bbf7d0)' }} />
      }

      {/* 2. 동반자 (캐릭터 뒤) */}
      {companion && POS[companion.id] && (
        <img src={`/items/${companion.id}.jpg`} alt={companion.name}
          onError={e => { e.target.style.display='none' }}
          style={itemStyle(POS[companion.id])} />
      )}

      {/* 3. 베이스 캐릭터 SVG */}
      <svg
        width={W} height={H}
        viewBox="0 0 200 270"
        style={{ position:'absolute', inset:0, display:'block' }}
      >
        <CharacterBody gender={gender} />
      </svg>

      {/* 4. 모자 (캐릭터 위) */}
      {hat && POS[hat.id] && (
        <img src={`/items/${hat.id}.jpg`} alt={hat.name}
          onError={e => { e.target.style.display='none' }}
          style={itemStyle(POS[hat.id])} />
      )}

      {/* 5. 액세서리 (캐릭터 위) */}
      {accessory && POS[accessory.id] && (
        <img src={`/items/${accessory.id}.jpg`} alt={accessory.name}
          onError={e => { e.target.style.display='none' }}
          style={itemStyle(POS[accessory.id])} />
      )}

      {/* 6. 레벨 뱃지 */}
      {playerData && (
        <div style={{
          position:'absolute', top:6, right:6,
          background:'rgba(255,255,255,0.95)', borderRadius:'99px',
          padding:'2px 8px', fontSize:'11px', fontWeight:'bold', color:'#1d4ed8',
          boxShadow:'0 1px 4px rgba(0,0,0,0.15)',
        }}>
          Lv.{playerData.level}
        </div>
      )}
    </div>
  )
}
