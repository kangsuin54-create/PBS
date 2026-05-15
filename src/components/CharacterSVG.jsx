/* ─────────────────────────────────────────────
   앵커 좌표 (ViewBox 0 0 200 260)
   모자     : 머리 꼭대기 (100, 50)  → 위쪽으로 그림
   안경류   : 눈 레벨     (100, 88)
   목걸이류 : 가슴 중앙   (100, 158)
   동반자   : 오른쪽 하단 (162, 200)
───────────────────────────────────────────── */

// ── 모자 ──────────────────────────────────────
const Hats = {
  hat_baseball: () => (
    <g>
      {/* 챙 */}
      <ellipse cx="100" cy="50" rx="42" ry="10" fill="#93c5fd" />
      {/* 캡 몸체 */}
      <path d="M62,50 Q60,15 100,12 Q140,15 138,50 Z" fill="#60a5fa" />
      {/* 버튼 */}
      <circle cx="100" cy="13" r="4" fill="#2563eb" />
      {/* 줄 */}
      <path d="M62,42 Q100,48 138,42" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
    </g>
  ),
  hat_tophat: () => (
    <g>
      {/* 챙 */}
      <rect x="62" y="44" width="76" height="10" rx="5" fill="#1f2937" />
      {/* 몸체 */}
      <rect x="78" y="2" width="44" height="44" rx="4" fill="#111827" />
      {/* 리본 */}
      <rect x="78" y="36" width="44" height="8" rx="2" fill="#ef4444" />
    </g>
  ),
  hat_grad: () => (
    <g>
      {/* 판 */}
      <rect x="60" y="44" width="80" height="8" rx="2" fill="#1f2937" />
      {/* 위 박스 */}
      <rect x="76" y="10" width="48" height="36" rx="3" fill="#374151" />
      {/* 태슬 끈 */}
      <line x1="120" y1="10" x2="130" y2="40" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="130" cy="42" r="4" fill="#fbbf24" />
    </g>
  ),
  hat_crown: () => (
    <g>
      {/* 왕관 */}
      <path d="M68,50 L68,22 L82,36 L100,10 L118,36 L132,22 L132,50 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      {/* 보석들 */}
      <circle cx="100" cy="28" r="5" fill="#ef4444" />
      <circle cx="80" cy="36" r="4" fill="#60a5fa" />
      <circle cx="120" cy="36" r="4" fill="#34d399" />
      {/* 테두리 */}
      <rect x="68" y="44" width="64" height="7" rx="3" fill="#d97706" />
    </g>
  ),
  hat_wizard: () => (
    <g>
      {/* 챙 */}
      <ellipse cx="100" cy="50" rx="40" ry="8" fill="#7c3aed" />
      {/* 뿔 모자 */}
      <path d="M100,2 L130,50 L70,50 Z" fill="#6d28d9" />
      {/* 별 */}
      <text x="93" y="34" fontSize="14" fill="#fbbf24">★</text>
      {/* 달 */}
      <text x="93" y="20" fontSize="10" fill="#fde68a">☽</text>
    </g>
  ),
  hat_santa: () => (
    <g>
      {/* 흰 테두리 */}
      <ellipse cx="100" cy="50" rx="38" ry="9" fill="white" />
      {/* 빨간 모자 */}
      <path d="M68,50 Q72,10 100,5 Q115,30 132,50 Z" fill="#ef4444" />
      {/* 폼폼 */}
      <circle cx="110" cy="8" r="7" fill="white" />
    </g>
  ),
}

// ── 액세서리 ──────────────────────────────────
const Accessories = {
  acc_glasses: () => (
    <g transform="translate(100, 88)">
      <circle cx="-14" cy="0" r="10" fill="none" stroke="#92400e" strokeWidth="2.5" />
      <circle cx="14" cy="0" r="10" fill="none" stroke="#92400e" strokeWidth="2.5" />
      <line x1="-4" y1="0" x2="4" y2="0" stroke="#92400e" strokeWidth="2" />
      <line x1="-38" y1="-2" x2="-24" y2="0" stroke="#92400e" strokeWidth="2" />
      <line x1="24" y1="0" x2="38" y2="-2" stroke="#92400e" strokeWidth="2" />
    </g>
  ),
  acc_sunglasses: () => (
    <g transform="translate(100, 88)">
      <rect x="-30" y="-9" width="24" height="16" rx="8" fill="#1f2937" opacity="0.9" />
      <rect x="6" y="-9" width="24" height="16" rx="8" fill="#1f2937" opacity="0.9" />
      <line x1="-6" y1="0" x2="6" y2="0" stroke="#4b5563" strokeWidth="2" />
      <line x1="-42" y1="-3" x2="-30" y2="0" stroke="#4b5563" strokeWidth="2" />
      <line x1="30" y1="0" x2="42" y2="-3" stroke="#4b5563" strokeWidth="2" />
      {/* 하트 반짝이 */}
      <text x="-22" y="4" fontSize="9" fill="#ec4899" opacity="0.7">♥</text>
      <text x="12" y="4" fontSize="9" fill="#ec4899" opacity="0.7">♥</text>
    </g>
  ),
  acc_ribbon: () => (
    <g transform="translate(100, 50)">
      {/* 왼쪽 날개 */}
      <path d="M0,0 L-22,-10 L-26,0 L-22,10 Z" fill="#f9a8d4" stroke="#ec4899" strokeWidth="1" />
      {/* 오른쪽 날개 */}
      <path d="M0,0 L22,-10 L26,0 L22,10 Z" fill="#f9a8d4" stroke="#ec4899" strokeWidth="1" />
      {/* 중앙 */}
      <circle cx="0" cy="0" r="6" fill="#ec4899" />
    </g>
  ),
  acc_necklace: () => (
    <g transform="translate(100, 152)">
      {/* 체인 */}
      <path d="M-22,-8 Q0,-18 22,-8" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3,2" />
      {/* 펜던트 */}
      <polygon points="0,0 -8,14 0,10 8,14" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
      <circle cx="0" cy="0" r="5" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
    </g>
  ),
  acc_bow: () => (
    <g transform="translate(100, 140)">
      {/* 나비넥타이 */}
      <path d="M0,0 L-18,-8 L-20,0 L-18,8 Z" fill="#7c3aed" />
      <path d="M0,0 L18,-8 L20,0 L18,8 Z" fill="#7c3aed" />
      <ellipse cx="0" cy="0" rx="5" ry="5" fill="#a78bfa" />
    </g>
  ),
  acc_medal: () => (
    <g transform="translate(100, 148)">
      {/* 리본 */}
      <rect x="-6" y="-20" width="12" height="22" rx="2" fill="#ef4444" />
      {/* 메달 */}
      <circle cx="0" cy="10" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      <circle cx="0" cy="10" r="10" fill="#fde68a" />
      <text x="-5" y="15" fontSize="11" fontWeight="bold" fill="#92400e">1</text>
    </g>
  ),
}

// ── 동반자 ──────────────────────────────────
const Companions = {
  pet_cat: () => (
    <g transform="translate(162, 200)">
      {/* 몸 */}
      <ellipse cx="0" cy="18" rx="18" ry="22" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      {/* 머리 */}
      <circle cx="0" cy="-8" r="18" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      {/* 귀 */}
      <polygon points="-14,-22 -20,-36 -6,-26" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      <polygon points="14,-22 20,-36 6,-26" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      <polygon points="-12,-24 -16,-33 -7,-27" fill="#fda4af" />
      <polygon points="12,-24 16,-33 7,-27" fill="#fda4af" />
      {/* 눈 */}
      <circle cx="-6" cy="-10" r="4" fill="#3b82f6" /><circle cx="-6" cy="-10" r="2" fill="#1e3a5f" />
      <circle cx="6" cy="-10" r="4" fill="#3b82f6" /><circle cx="6" cy="-10" r="2" fill="#1e3a5f" />
      {/* 코 입 */}
      <ellipse cx="0" cy="-3" rx="3" ry="2" fill="#fda4af" />
      <path d="M-5,1 Q0,5 5,1" fill="none" stroke="#374151" strokeWidth="1.5" />
      {/* 수염 */}
      <line x1="-18" y1="-3" x2="-8" y2="-1" stroke="#9ca3af" strokeWidth="1" />
      <line x1="8" y1="-1" x2="18" y2="-3" stroke="#9ca3af" strokeWidth="1" />
      {/* 꼬리 */}
      <path d="M16,30 Q34,20 30,5" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <path d="M16,30 Q34,20 30,5" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  pet_dog: () => (
    <g transform="translate(162, 200)">
      {/* 몸 */}
      <ellipse cx="0" cy="18" rx="19" ry="22" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />
      {/* 머리 */}
      <circle cx="0" cy="-8" r="19" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />
      {/* 귀 (축 처진) */}
      <ellipse cx="-14" cy="-4" rx="8" ry="14" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
      <ellipse cx="14" cy="-4" rx="8" ry="14" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
      {/* 눈 */}
      <circle cx="-6" cy="-10" r="5" fill="#1f2937" /><circle cx="-5" cy="-11" r="1.5" fill="white" />
      <circle cx="6" cy="-10" r="5" fill="#1f2937" /><circle cx="7" cy="-11" r="1.5" fill="white" />
      {/* 코 */}
      <ellipse cx="0" cy="-2" rx="6" ry="4" fill="#1f2937" />
      <ellipse cx="-1" cy="-3" rx="2" ry="1.5" fill="#374151" />
      {/* 입 혀 */}
      <path d="M-6,3 Q0,9 6,3" fill="none" stroke="#374151" strokeWidth="1.5" />
      <ellipse cx="0" cy="7" rx="5" ry="6" fill="#fda4af" />
      {/* 꼬리 */}
      <path d="M16,28 Q30,12 22,-2" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  pet_dragon: () => (
    <g transform="translate(162, 200)">
      {/* 날개 */}
      <path d="M-6,-20 L-28,-38 L-10,-18" fill="#34d399" stroke="#059669" strokeWidth="1" />
      <path d="M6,-20 L28,-38 L10,-18" fill="#34d399" stroke="#059669" strokeWidth="1" />
      {/* 꼬리 */}
      <path d="M14,30 Q30,25 26,10" fill="none" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
      {/* 몸 */}
      <ellipse cx="0" cy="18" rx="17" ry="20" fill="#6ee7b7" stroke="#34d399" strokeWidth="1.5" />
      {/* 배 */}
      <ellipse cx="0" cy="20" rx="10" ry="14" fill="#a7f3d0" />
      {/* 머리 */}
      <circle cx="0" cy="-8" r="18" fill="#6ee7b7" stroke="#34d399" strokeWidth="1.5" />
      {/* 뿔 */}
      <polygon points="-8,-24 -12,-38 -4,-26" fill="#fbbf24" />
      <polygon points="8,-24 12,-38 4,-26" fill="#fbbf24" />
      {/* 눈 */}
      <circle cx="-6" cy="-10" r="5" fill="#fbbf24" /><circle cx="-6" cy="-10" r="3" fill="#1f2937" />
      <circle cx="6" cy="-10" r="5" fill="#fbbf24" /><circle cx="6" cy="-10" r="3" fill="#1f2937" />
      {/* 입 */}
      <path d="M-8,0 Q0,6 8,0" fill="none" stroke="#059669" strokeWidth="2" />
      <path d="M-4,3 L-2,7" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4,3 L2,7" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  pet_unicorn: () => (
    <g transform="translate(162, 200)">
      {/* 갈기 */}
      <path d="M-12,-28 Q-20,-18 -18,-5" fill="none" stroke="#f9a8d4" strokeWidth="6" strokeLinecap="round" />
      <path d="M-8,-28 Q-16,-16 -14,-3" fill="none" stroke="#c084fc" strokeWidth="4" strokeLinecap="round" />
      <path d="M-4,-26 Q-10,-14 -10,-1" fill="none" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
      {/* 몸 */}
      <ellipse cx="0" cy="18" rx="18" ry="22" fill="white" stroke="#e9d5ff" strokeWidth="1.5" />
      {/* 머리 */}
      <circle cx="0" cy="-8" r="18" fill="white" stroke="#e9d5ff" strokeWidth="1.5" />
      {/* 뿔 */}
      <polygon points="0,-28 -5,-8 5,-8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
      {/* 귀 */}
      <polygon points="-14,-20 -18,-32 -8,-24" fill="white" stroke="#e9d5ff" strokeWidth="1.5" />
      <polygon points="-13,-22 -15,-30 -9,-25" fill="#fda4af" />
      {/* 눈 */}
      <circle cx="-6" cy="-10" r="5" fill="#a78bfa" /><circle cx="-5" cy="-11" r="2" fill="#1f2937" /><circle cx="-4" cy="-12" r="1" fill="white" />
      <circle cx="6" cy="-10" r="5" fill="#a78bfa" /><circle cx="7" cy="-11" r="2" fill="#1f2937" /><circle cx="8" cy="-12" r="1" fill="white" />
      {/* 볼터치 */}
      <ellipse cx="-10" cy="-3" rx="5" ry="3" fill="#fda4af" opacity="0.6" />
      <ellipse cx="10" cy="-3" rx="5" ry="3" fill="#fda4af" opacity="0.6" />
      {/* 별 반짝이 */}
      <text x="14" y="-18" fontSize="10" fill="#fbbf24">✦</text>
      <text x="-24" y="-5" fontSize="8" fill="#c084fc">✦</text>
    </g>
  ),
  pet_star: () => (
    <g transform="translate(162, 200)">
      {/* 빛나는 효과 */}
      <circle cx="0" cy="0" r="26" fill="#fef9c3" opacity="0.4" />
      {/* 별 몸체 */}
      <polygon points="0,-28 6,-10 24,-10 10,2 16,20 0,10 -16,20 -10,2 -24,-10 -6,-10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      {/* 눈 */}
      <circle cx="-7" cy="-4" r="4" fill="#1f2937" /><circle cx="-6" cy="-5" r="1.5" fill="white" />
      <circle cx="7" cy="-4" r="4" fill="#1f2937" /><circle cx="8" cy="-5" r="1.5" fill="white" />
      {/* 볼터치 */}
      <ellipse cx="-11" cy="2" rx="4" ry="2.5" fill="#fda4af" opacity="0.7" />
      <ellipse cx="11" cy="2" rx="4" ry="2.5" fill="#fda4af" opacity="0.7" />
      {/* 웃음 */}
      <path d="M-5,6 Q0,11 5,6" fill="none" stroke="#92400e" strokeWidth="1.5" />
      {/* 날개 */}
      <ellipse cx="-22" cy="8" rx="10" ry="6" fill="#fde68a" stroke="#fbbf24" strokeWidth="1" transform="rotate(-30,-22,8)" />
      <ellipse cx="22" cy="8" rx="10" ry="6" fill="#fde68a" stroke="#fbbf24" strokeWidth="1" transform="rotate(30,22,8)" />
    </g>
  ),
  pet_robot: () => (
    <g transform="translate(162, 200)">
      {/* 안테나 */}
      <line x1="0" y1="-40" x2="0" y2="-28" stroke="#9ca3af" strokeWidth="2" />
      <circle cx="0" cy="-42" r="4" fill="#ef4444" />
      {/* 머리 */}
      <rect x="-16" y="-28" width="32" height="26" rx="6" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
      {/* 눈 LED */}
      <rect x="-11" y="-21" width="8" height="8" rx="2" fill="#1f2937" />
      <rect x="3" y="-21" width="8" height="8" rx="2" fill="#1f2937" />
      <circle cx="-7" cy="-17" r="2" fill="#34d399" />
      <circle cx="7" cy="-17" r="2" fill="#34d399" />
      {/* 입 */}
      <rect x="-8" y="-8" width="16" height="4" rx="2" fill="#374151" />
      <rect x="-6" y="-7" width="3" height="2" fill="#34d399" />
      <rect x="-1" y="-7" width="3" height="2" fill="#34d399" />
      <rect x="4" y="-7" width="3" height="2" fill="#34d399" />
      {/* 몸 */}
      <rect x="-18" y="0" width="36" height="36" rx="6" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5" />
      {/* 가슴 버튼 */}
      <circle cx="-6" cy="12" r="5" fill="#ef4444" />
      <circle cx="6" cy="12" r="5" fill="#fbbf24" />
      <rect x="-8" y="22" width="16" height="8" rx="2" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1" />
      {/* 팔 */}
      <rect x="-26" y="2" width="10" height="24" rx="5" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x="16" y="2" width="10" height="24" rx="5" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
    </g>
  ),
}

// ── 배경 ──────────────────────────────────────
const Backgrounds = {
  bg_rainbow: () => (
    <g>
      <rect width="200" height="260" fill="#e0f2fe" />
      {/* 무지개 */}
      {[['#ef4444',70],['#f97316',62],['#fbbf24',54],['#34d399',46],['#60a5fa',38],['#a78bfa',30]].map(([c,r]) => (
        <path key={r} d={`M20,180 Q100,${180-r*2} 180,180`} fill="none" stroke={c} strokeWidth="8" opacity="0.8" />
      ))}
      {/* 구름 */}
      <ellipse cx="30" cy="50" rx="22" ry="14" fill="white" opacity="0.9" />
      <ellipse cx="50" cy="44" rx="18" ry="12" fill="white" opacity="0.9" />
      <ellipse cx="165" cy="60" rx="20" ry="13" fill="white" opacity="0.9" />
      {/* 해 */}
      <circle cx="160" cy="35" r="18" fill="#fbbf24" opacity="0.9" />
      {/* 언덕 */}
      <ellipse cx="50" cy="270" rx="80" ry="40" fill="#86efac" />
      <ellipse cx="160" cy="275" rx="70" ry="35" fill="#4ade80" />
    </g>
  ),
  bg_star: () => (
    <g>
      <rect width="200" height="260" fill="#1e1b4b" />
      {/* 별들 */}
      {[[20,20],[50,40],[80,15],[120,30],[155,20],[175,50],[30,80],[90,60],[140,75],[170,90],[15,120],[60,110],[110,100],[160,115],[40,150],[85,140]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={1+Math.random()*2} fill="white" opacity={0.5+Math.random()*0.5} />
      ))}
      {/* 반달 */}
      <circle cx="155" cy="40" r="22" fill="#fde68a" />
      <circle cx="165" cy="34" r="18" fill="#1e1b4b" />
      {/* 오로라 */}
      <path d="M0,150 Q50,100 100,130 Q150,160 200,120" fill="none" stroke="#34d399" strokeWidth="8" opacity="0.3" />
      <path d="M0,170 Q60,120 110,150 Q160,180 200,140" fill="none" stroke="#818cf8" strokeWidth="6" opacity="0.3" />
      {/* 큰 별 */}
      <text x="25" y="55" fontSize="16" fill="#fbbf24" opacity="0.9">★</text>
      <text x="100" y="25" fontSize="12" fill="white" opacity="0.8">✦</text>
    </g>
  ),
  bg_flower: () => (
    <g>
      <rect width="200" height="260" fill="#fce7f3" />
      {/* 하늘 그라디언트 */}
      <rect width="200" height="160" fill="#fbcfe8" opacity="0.5" />
      {/* 꽃잎들 */}
      {[[30,40],[60,20],[90,50],[130,25],[160,45],[15,80],[50,90],[120,70],[170,80],[40,130],[100,110],[155,125]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <circle cx="0" cy="0" r="6" fill="#fda4af" opacity="0.8" />
          <circle cx="8" cy="4" r="5" fill="#f9a8d4" opacity="0.7" />
          <circle cx="-8" cy="4" r="5" fill="#fce7f3" opacity="0.8" />
        </g>
      ))}
      {/* 나무들 */}
      <rect x="15" y="160" width="8" height="50" fill="#92400e" />
      <ellipse cx="19" cy="150" rx="24" ry="30" fill="#fbcfe8" />
      <ellipse cx="19" cy="140" rx="18" ry="22" fill="#fda4af" />
      <rect x="175" y="165" width="8" height="45" fill="#92400e" />
      <ellipse cx="179" cy="155" rx="22" ry="28" fill="#f9a8d4" />
      <ellipse cx="179" cy="145" rx="16" ry="20" fill="#fda4af" />
      {/* 땅 */}
      <rect x="0" y="210" width="200" height="50" fill="#86efac" />
    </g>
  ),
  bg_ocean: () => (
    <g>
      {/* 하늘 */}
      <rect width="200" height="260" fill="#7dd3fc" />
      <rect width="200" height="130" fill="#bae6fd" />
      {/* 해 */}
      <circle cx="160" cy="40" r="22" fill="#fbbf24" />
      {/* 구름 */}
      <ellipse cx="40" cy="45" rx="25" ry="14" fill="white" opacity="0.9" />
      <ellipse cx="62" cy="38" rx="20" ry="12" fill="white" opacity="0.9" />
      {/* 바다 */}
      <rect x="0" y="150" width="200" height="110" fill="#0284c7" />
      <rect x="0" y="145" width="200" height="14" fill="#38bdf8" />
      {/* 파도 */}
      <path d="M0,155 Q25,148 50,155 Q75,162 100,155 Q125,148 150,155 Q175,162 200,155" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
      <path d="M0,168 Q25,162 50,168 Q75,174 100,168 Q125,162 150,168 Q175,174 200,168" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
      {/* 모래사장 */}
      <ellipse cx="100" cy="270" rx="120" ry="40" fill="#fde68a" />
      {/* 조개 */}
      <ellipse cx="30" cy="225" rx="8" ry="5" fill="#fda4af" />
      <ellipse cx="170" cy="230" rx="6" ry="4" fill="#f9a8d4" />
    </g>
  ),
  bg_forest: () => (
    <g>
      <rect width="200" height="260" fill="#d1fae5" />
      {/* 배경 빛 */}
      <circle cx="100" cy="60" r="60" fill="#fef9c3" opacity="0.3" />
      {/* 나무들 (뒤) */}
      {[[20,200],[60,195],[140,195],[180,200]].map(([x,y],i) => (
        <g key={i}>
          <rect x={x-4} y={y-60} width="8" height="60" fill="#92400e" />
          <ellipse cx={x} cy={y-65} rx="22" ry="28" fill="#15803d" />
          <ellipse cx={x} cy={y-78} rx="16" ry="20" fill="#16a34a" />
        </g>
      ))}
      {/* 버섯 */}
      <g transform="translate(38,215)">
        <rect x="-3" y="-10" width="6" height="10" fill="#fde68a" />
        <ellipse cx="0" cy="-10" rx="10" ry="7" fill="#ef4444" />
        <circle cx="-3" cy="-12" r="2" fill="white" /><circle cx="3" cy="-11" r="1.5" fill="white" />
      </g>
      <g transform="translate(160,218)">
        <rect x="-3" y="-10" width="6" height="10" fill="#fde68a" />
        <ellipse cx="0" cy="-10" rx="8" ry="5" fill="#a78bfa" />
        <circle cx="-2" cy="-12" r="1.5" fill="white" /><circle cx="2" cy="-11" r="1" fill="white" />
      </g>
      {/* 반딧불 */}
      {[[70,80],[120,60],[45,100],[155,95],[90,120]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#fde68a" opacity="0.8" />
      ))}
      {/* 땅 */}
      <rect x="0" y="220" width="200" height="40" fill="#4ade80" />
    </g>
  ),
  bg_fire: () => (
    <g>
      {/* 밤하늘 */}
      <rect width="200" height="260" fill="#1c1917" />
      {/* 별 */}
      {[[20,20],[50,35],[80,15],[120,25],[155,18],[175,40],[35,60],[100,50],[160,65]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.7" />
      ))}
      {/* 장작 */}
      <rect x="70" y="210" width="60" height="10" rx="5" fill="#92400e" transform="rotate(-15, 100, 215)" />
      <rect x="72" y="210" width="56" height="10" rx="5" fill="#78350f" transform="rotate(15, 100, 215)" />
      {/* 불꽃 (뒤) */}
      <path d="M85,210 Q80,180 100,160 Q120,180 115,210 Z" fill="#f97316" opacity="0.7" />
      <path d="M90,210 Q86,185 100,165 Q114,185 110,210 Z" fill="#fbbf24" opacity="0.8" />
      {/* 불꽃 (앞) */}
      <path d="M88,210 Q82,190 100,172 Q118,190 112,210 Z" fill="#ef4444" opacity="0.9" />
      <path d="M92,210 Q88,195 100,180 Q112,195 108,210 Z" fill="#fbbf24" />
      <path d="M96,210 Q94,200 100,190 Q106,200 104,210 Z" fill="#fde68a" />
      {/* 불씨 */}
      {[[78,168],[88,155],[112,160],[120,172],[95,148]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#fbbf24" opacity="0.8" />
      ))}
      {/* 빛 효과 */}
      <circle cx="100" cy="200" r="70" fill="#f97316" opacity="0.08" />
      {/* 땅 */}
      <rect x="0" y="220" width="200" height="40" fill="#292524" />
    </g>
  ),
}

// ── 베이스 캐릭터 ──────────────────────────────
function CharacterBase({ gender }) {
  const isMale = gender === 'male'
  const robeColor = isMale ? '#3b82f6' : '#ec4899'
  const robeDark = isMale ? '#1d4ed8' : '#be185d'
  const robeTrim = isMale ? '#93c5fd' : '#fbcfe8'
  const hairColor = isMale ? '#92400e' : '#ec4899'

  return (
    <g>
      {/* ── 그림자 ── */}
      <ellipse cx="100" cy="254" rx="46" ry="8" fill="rgba(0,0,0,0.12)" />

      {/* ── 로브 몸체 ── */}
      <path d="M58,148 Q52,200 48,255 L152,255 Q148,200 142,148 Z" fill={robeColor} />
      {/* 로브 중앙 선 */}
      <path d="M100,148 Q98,200 97,255" fill="none" stroke={robeDark} strokeWidth="2" opacity="0.4" />
      {/* 로브 소매 왼쪽 */}
      <path d="M58,148 Q38,158 30,185 Q36,190 46,180 Q52,165 62,158 Z" fill={robeColor} stroke={robeDark} strokeWidth="1" />
      {/* 소매 손 왼쪽 */}
      <ellipse cx="32" cy="188" rx="10" ry="8" fill="#fde68a" stroke="#fbbf24" strokeWidth="1" />
      {/* 로브 소매 오른쪽 */}
      <path d="M142,148 Q162,158 170,185 Q164,190 154,180 Q148,165 138,158 Z" fill={robeColor} stroke={robeDark} strokeWidth="1" />
      {/* 소매 손 오른쪽 */}
      <ellipse cx="168" cy="188" rx="10" ry="8" fill="#fde68a" stroke="#fbbf24" strokeWidth="1" />
      {/* 로브 하단 트림 */}
      <path d="M48,250 Q100,260 152,250 L152,255 Q100,265 48,255 Z" fill={robeTrim} />
      {/* 로브 상단 장식 */}
      <path d="M68,148 Q100,144 132,148" fill="none" stroke={robeTrim} strokeWidth="3" />

      {/* ── 목 ── */}
      <rect x="88" y="136" width="24" height="16" rx="8" fill="#fde68a" />

      {/* ── 머리 ── */}
      <circle cx="100" cy="95" r="48" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />

      {/* ── 머리카락 ── */}
      {isMobile ? null : null}
      {isMale ? (
        // 남자 - 짧은 갈색 헤어
        <g fill={hairColor}>
          <ellipse cx="100" cy="52" rx="46" ry="16" />
          <ellipse cx="68" cy="60" rx="16" ry="20" />
          <ellipse cx="132" cy="60" rx="16" ry="20" />
          {/* 삐죽 */}
          <ellipse cx="80" cy="50" rx="10" ry="8" transform="rotate(-20,80,50)" />
          <ellipse cx="100" cy="47" rx="8" ry="10" />
          <ellipse cx="120" cy="50" rx="10" ry="8" transform="rotate(20,120,50)" />
        </g>
      ) : (
        // 여자 - 핑크 트윈테일
        <g>
          <ellipse cx="100" cy="52" rx="44" ry="14" fill={hairColor} />
          <ellipse cx="76" cy="56" rx="20" ry="22" fill={hairColor} />
          <ellipse cx="124" cy="56" rx="20" ry="22" fill={hairColor} />
          {/* 트윈테일 왼쪽 */}
          <path d="M54,100 Q30,120 36,155 Q46,165 52,145 Q50,120 62,108 Z" fill={hairColor} />
          {/* 트윈테일 오른쪽 */}
          <path d="M146,100 Q170,120 164,155 Q154,165 148,145 Q150,120 138,108 Z" fill={hairColor} />
          {/* 리본 왼쪽 */}
          <path d="M54,100 L44,92 L48,100 L44,108 Z" fill="#fda4af" />
          <path d="M54,100 L64,92 L60,100 L64,108 Z" fill="#fda4af" />
          <circle cx="54" cy="100" r="4" fill="#ec4899" />
          {/* 리본 오른쪽 */}
          <path d="M146,100 L136,92 L140,100 L136,108 Z" fill="#fda4af" />
          <path d="M146,100 L156,92 L152,100 L156,108 Z" fill="#fda4af" />
          <circle cx="146" cy="100" r="4" fill="#ec4899" />
        </g>
      )}

      {/* ── 눈썹 ── */}
      <path d="M80,76 Q88,72 94,76" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M106,76 Q112,72 120,76" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />

      {/* ── 눈 ── */}
      <ellipse cx="87" cy="90" rx="10" ry="11" fill="white" />
      <ellipse cx="113" cy="90" rx="10" ry="11" fill="white" />
      {/* 홍채 */}
      <circle cx="87" cy="91" r="7" fill={isMale ? '#1d4ed8' : '#7c3aed'} />
      <circle cx="113" cy="91" r="7" fill={isMale ? '#1d4ed8' : '#7c3aed'} />
      {/* 동공 */}
      <circle cx="88" cy="91" r="4" fill="#1a1a2e" />
      <circle cx="114" cy="91" r="4" fill="#1a1a2e" />
      {/* 하이라이트 */}
      <circle cx="90" cy="88" r="2.5" fill="white" />
      <circle cx="116" cy="88" r="2.5" fill="white" />
      {/* 속눈썹 */}
      <path d="M77,82 Q87,79 97,82" fill="none" stroke="#1f2937" strokeWidth="1.5" />
      <path d="M103,82 Q113,79 123,82" fill="none" stroke="#1f2937" strokeWidth="1.5" />

      {/* ── 볼터치 ── */}
      <ellipse cx="73" cy="104" rx="11" ry="7" fill="#fda4af" opacity="0.6" />
      <ellipse cx="127" cy="104" rx="11" ry="7" fill="#fda4af" opacity="0.6" />

      {/* ── 코 ── */}
      <ellipse cx="100" cy="106" rx="5" ry="4" fill="#fbbf24" opacity="0.5" />

      {/* ── 입 ── */}
      <path d="M88,116 Q100,124 112,116" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
      {/* 이 */}
      <path d="M92,118 Q100,124 108,118" fill="white" opacity="0.7" />

      {/* ── 마법 지팡이 (오른손) ── */}
      <line x1="168" y1="188" x2="185" y2="150" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="185" cy="146" r="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="185" cy="146" r="4" fill="white" opacity="0.8" />
      {/* 별 효과 */}
      <text x="178" y="136" fontSize="10" fill="#fbbf24" opacity="0.9">✦</text>
    </g>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────
export default function CharacterSVG({ equipped, gender = 'male', size = 'md', playerData }) {
  const { hat, accessory, companion, background } = equipped || {}
  const isLg = size === 'lg'
  const scale = isLg ? 1 : 0.72
  const W = isLg ? 200 : 144
  const H = isLg ? 260 : 187

  const HatComp = hat ? Hats[hat.id] : null
  const AccComp = accessory ? Accessories[accessory.id] : null
  const CompComp = companion ? Companions[companion.id] : null
  const BgComp = background ? Backgrounds[background.id] : null

  return (
    <div style={{
      borderRadius: isLg ? '20px' : '16px',
      overflow: 'hidden',
      border: '3px solid rgba(255,255,255,0.9)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
      margin: '0 auto',
      display: 'inline-block',
      position: 'relative',
    }}>
      <svg width={W} height={H} viewBox="0 0 200 260" style={{ display: 'block' }}>
        {/* 1. 기본 배경 */}
        {BgComp ? <BgComp /> : (
          <defs>
            <linearGradient id="defaultBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="100%" stopColor="#bbf7d0" />
            </linearGradient>
          </defs>
        )}
        {!BgComp && <rect width="200" height="260" fill="url(#defaultBg)" />}

        {/* 2. 동반자 */}
        {CompComp && <CompComp />}

        {/* 3. 모자 (캐릭터 뒤에 오는 부분) */}
        {HatComp && <HatComp />}

        {/* 4. 메인 캐릭터 */}
        <CharacterBase gender={gender} />

        {/* 5. 액세서리 (캐릭터 위에) */}
        {AccComp && <AccComp />}

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
