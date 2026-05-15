/*
  ViewBox: 0 0 200 260
  캐릭터 이미지 영역: x=0, y=30, w=200, h=230
  → 머리 꼭대기: y≈52  /  눈 레벨: y≈88  /  목: y≈136  /  가슴: y≈152
*/

// 각 아이템의 SVG 내 좌표 (x, y, w, h) + blend 모드
const POSITIONS = {
  // ── 모자 (머리 위에 딱) ──────────────────────────
  hat_baseball:  { x: 52,  y: 6,   w: 96,  h: 58 },
  hat_tophat:    { x: 58,  y: -4,  w: 84,  h: 62 },
  hat_grad:      { x: 54,  y: 4,   w: 92,  h: 58 },
  hat_crown:     { x: 58,  y: 10,  w: 84,  h: 50 },
  hat_wizard:    { x: 50,  y: -6,  w: 100, h: 68 },
  hat_santa:     { x: 52,  y: 4,   w: 96,  h: 58 },

  // ── 액세서리 ────────────────────────────────────
  acc_glasses:    { x: 58,  y: 76,  w: 84,  h: 36 }, // 눈 레벨
  acc_sunglasses: { x: 58,  y: 76,  w: 84,  h: 36 },
  acc_ribbon:     { x: 60,  y: 30,  w: 80,  h: 52 }, // 머리 위 (리본은 머리에)
  acc_necklace:   { x: 66,  y: 126, w: 68,  h: 58 }, // 가슴
  acc_bow:        { x: 68,  y: 120, w: 64,  h: 44 }, // 목
  acc_medal:      { x: 66,  y: 126, w: 68,  h: 62 }, // 가슴

  // ── 동반자 (오른쪽 하단) ──────────────────────────
  pet_cat:     { x: 124, y: 152, w: 74, h: 96 },
  pet_dog:     { x: 124, y: 155, w: 74, h: 92 },
  pet_dragon:  { x: 120, y: 144, w: 78, h: 104 },
  pet_unicorn: { x: 120, y: 146, w: 78, h: 102 },
  pet_star:    { x: 128, y: 158, w: 68, h: 84 },
  pet_robot:   { x: 124, y: 150, w: 74, h: 98 },

  // ── 배경 (전체, blend 없음) ──────────────────────
  bg_rainbow: { x: 0, y: 0, w: 200, h: 260, bg: true },
  bg_star:    { x: 0, y: 0, w: 200, h: 260, bg: true },
  bg_flower:  { x: 0, y: 0, w: 200, h: 260, bg: true },
  bg_ocean:   { x: 0, y: 0, w: 200, h: 260, bg: true },
  bg_forest:  { x: 0, y: 0, w: 200, h: 260, bg: true },
  bg_fire:    { x: 0, y: 0, w: 200, h: 260, bg: true },
}

function ItemImg({ id, isBg }) {
  const pos = POSITIONS[id]
  if (!pos) return null
  return (
    <image
      href={`/items/${id}.jpg`}
      x={pos.x} y={pos.y} width={pos.w} height={pos.h}
      preserveAspectRatio="xMidYMid meet"
      style={isBg ? {} : { mixBlendMode: 'multiply' }}
    />
  )
}

// ── 베이스 캐릭터 SVG ────────────────────────────
function CharacterBase({ gender }) {
  const isMale = gender === 'male'
  const robeColor = isMale ? '#3b82f6' : '#ec4899'
  const robeDark  = isMale ? '#1d4ed8' : '#be185d'
  const robeTrim  = isMale ? '#93c5fd' : '#fbcfe8'
  const hairColor = isMale ? '#92400e' : '#ec4899'
  const eyeColor  = isMale ? '#1d4ed8' : '#7c3aed'

  return (
    <g>
      {/* 그림자 */}
      <ellipse cx="100" cy="254" rx="46" ry="7" fill="rgba(0,0,0,0.12)" />

      {/* 로브 */}
      <path d="M58,148 Q52,200 48,255 L152,255 Q148,200 142,148 Z" fill={robeColor} />
      <path d="M100,148 Q98,200 97,255" fill="none" stroke={robeDark} strokeWidth="2" opacity="0.4" />
      {/* 소매 왼 */}
      <path d="M58,148 Q38,158 30,185 Q36,190 46,180 Q52,165 62,158 Z" fill={robeColor} stroke={robeDark} strokeWidth="1" />
      <ellipse cx="32" cy="188" rx="10" ry="8" fill="#fde68a" stroke="#fbbf24" strokeWidth="1" />
      {/* 소매 우 */}
      <path d="M142,148 Q162,158 170,185 Q164,190 154,180 Q148,165 138,158 Z" fill={robeColor} stroke={robeDark} strokeWidth="1" />
      <ellipse cx="168" cy="188" rx="10" ry="8" fill="#fde68a" stroke="#fbbf24" strokeWidth="1" />
      {/* 트림 */}
      <path d="M48,250 Q100,260 152,250 L152,255 Q100,265 48,255 Z" fill={robeTrim} />
      <path d="M68,148 Q100,144 132,148" fill="none" stroke={robeTrim} strokeWidth="3" />

      {/* 목 */}
      <rect x="88" y="136" width="24" height="16" rx="8" fill="#fde68a" />

      {/* 머리 */}
      <circle cx="100" cy="95" r="48" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />

      {/* 머리카락 */}
      {isMale ? (
        <g fill={hairColor}>
          <ellipse cx="100" cy="52" rx="46" ry="16" />
          <ellipse cx="68"  cy="60" rx="16" ry="20" />
          <ellipse cx="132" cy="60" rx="16" ry="20" />
          <ellipse cx="80"  cy="50" rx="10" ry="8"  transform="rotate(-20,80,50)" />
          <ellipse cx="100" cy="47" rx="8"  ry="10" />
          <ellipse cx="120" cy="50" rx="10" ry="8"  transform="rotate(20,120,50)" />
        </g>
      ) : (
        <g>
          <ellipse cx="100" cy="52" rx="44" ry="14" fill={hairColor} />
          <ellipse cx="76"  cy="56" rx="20" ry="22" fill={hairColor} />
          <ellipse cx="124" cy="56" rx="20" ry="22" fill={hairColor} />
          <path d="M54,100 Q30,120 36,155 Q46,165 52,145 Q50,120 62,108 Z" fill={hairColor} />
          <path d="M146,100 Q170,120 164,155 Q154,165 148,145 Q150,120 138,108 Z" fill={hairColor} />
          {/* 리본 왼 */}
          <path d="M54,100 L44,92 L48,100 L44,108 Z" fill="#fda4af" />
          <path d="M54,100 L64,92 L60,100 L64,108 Z" fill="#fda4af" />
          <circle cx="54" cy="100" r="4" fill="#ec4899" />
          {/* 리본 우 */}
          <path d="M146,100 L136,92 L140,100 L136,108 Z" fill="#fda4af" />
          <path d="M146,100 L156,92 L152,100 L156,108 Z" fill="#fda4af" />
          <circle cx="146" cy="100" r="4" fill="#ec4899" />
        </g>
      )}

      {/* 눈썹 */}
      <path d="M80,76 Q88,72 94,76"  fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M106,76 Q112,72 120,76" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />

      {/* 눈 */}
      <ellipse cx="87"  cy="90" rx="10" ry="11" fill="white" />
      <ellipse cx="113" cy="90" rx="10" ry="11" fill="white" />
      <circle cx="87"  cy="91" r="7" fill={eyeColor} />
      <circle cx="113" cy="91" r="7" fill={eyeColor} />
      <circle cx="88"  cy="91" r="4" fill="#1a1a2e" />
      <circle cx="114" cy="91" r="4" fill="#1a1a2e" />
      <circle cx="90"  cy="88" r="2.5" fill="white" />
      <circle cx="116" cy="88" r="2.5" fill="white" />
      <path d="M77,82 Q87,79 97,82"   fill="none" stroke="#1f2937" strokeWidth="1.5" />
      <path d="M103,82 Q113,79 123,82" fill="none" stroke="#1f2937" strokeWidth="1.5" />

      {/* 볼터치 */}
      <ellipse cx="73"  cy="104" rx="11" ry="7" fill="#fda4af" opacity="0.6" />
      <ellipse cx="127" cy="104" rx="11" ry="7" fill="#fda4af" opacity="0.6" />

      {/* 코·입 */}
      <ellipse cx="100" cy="106" rx="5" ry="4" fill="#fbbf24" opacity="0.5" />
      <path d="M88,116 Q100,124 112,116" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M92,118 Q100,124 108,118" fill="white" opacity="0.7" />

      {/* 지팡이 */}
      <line x1="168" y1="188" x2="185" y2="150" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="185" cy="146" r="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="185" cy="146" r="4" fill="white" opacity="0.8" />
      <text x="178" y="136" fontSize="10" fill="#fbbf24" opacity="0.9">✦</text>
    </g>
  )
}

// ── 메인 컴포넌트 ────────────────────────────────
export default function CharacterSVG({ equipped, gender = 'male', size = 'md', playerData }) {
  const { hat, accessory, companion, background } = equipped || {}
  const isLg = size === 'lg'
  const W = isLg ? 200 : 144
  const H = isLg ? 260 : 187

  return (
    <div style={{
      borderRadius: isLg ? '20px' : '16px',
      overflow: 'hidden',
      border: '3px solid rgba(255,255,255,0.9)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
      margin: '0 auto',
      display: 'inline-block',
    }}>
      <svg width={W} height={H} viewBox="0 0 200 260" style={{ display: 'block' }}>

        {/* 1. 배경 */}
        {background
          ? <ItemImg id={background.id} isBg />
          : <>
              <defs>
                <linearGradient id="defBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bfdbfe" />
                  <stop offset="100%" stopColor="#bbf7d0" />
                </linearGradient>
              </defs>
              <rect width="200" height="260" fill="url(#defBg)" />
            </>
        }

        {/* 2. 동반자 이미지 (캐릭터 뒤에) */}
        {companion && <ItemImg id={companion.id} />}

        {/* 3. 모자 이미지 (캐릭터 뒤에 그려지는 부분) */}
        {hat && <ItemImg id={hat.id} />}

        {/* 4. 메인 SVG 캐릭터 */}
        <CharacterBase gender={gender} />

        {/* 5. 액세서리 이미지 (캐릭터 위에) */}
        {accessory && <ItemImg id={accessory.id} />}

        {/* 6. 레벨 뱃지 */}
        {playerData && (
          <g>
            <rect x="148" y="6" width="44" height="18" rx="9" fill="rgba(255,255,255,0.95)" />
            <text x="152" y="19" fontSize="11" fontWeight="bold" fill="#1d4ed8">
              Lv.{playerData.level}
            </text>
          </g>
        )}

      </svg>
    </div>
  )
}
