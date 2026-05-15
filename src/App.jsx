import { useState, useEffect } from 'react'
import './index.css'
import { supabase } from './lib/supabase'
import { INITIAL_EQUIPPED } from './data/shopItems'
import LevelUpPopup from './components/LevelUpPopup'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import LearningScreen from './screens/LearningScreen'
import ReinforcementScreen from './screens/ReinforcementScreen'
import SimulationScreen from './screens/SimulationScreen'
import DashboardScreen from './screens/DashboardScreen'
import ShopScreen from './screens/ShopScreen'
import MyPageScreen from './screens/MyPageScreen'

const INITIAL_PROGRESS = {
  selfControl: 0, social: 0, ruleUnderstanding: 0, positiveRelationship: 0,
}

const makeInitialPlayer = (user) => ({
  name: user?.user_metadata?.nickname || user?.email?.split('@')[0] || '용감한 모험가',
  exp: 0, level: 1, teamPoints: 0, coins: 0,
  badges: [], items: [], ownedItems: [],
  equippedItems: { ...INITIAL_EQUIPPED },
  progress: { ...INITIAL_PROGRESS },
  sessionRewards: [],
})

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [screen, setScreen] = useState('home')
  const [playerData, setPlayerData] = useState(null)
  const [levelUpEvent, setLevelUpEvent] = useState(null) // level number

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); setPlayerData(makeInitialPlayer(session.user)) }
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) { setUser(session.user); setPlayerData(makeInitialPlayer(session.user)) }
      else { setUser(null); setPlayerData(null) }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = (u) => { setUser(u); setPlayerData(makeInitialPlayer(u)) }
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null); setPlayerData(null); setScreen('home')
  }

  // ── 게임 액션 ──
  const LEVEL_BONUS = { 2:20, 3:30, 4:40, 5:60, 6:80, 7:100, 8:120, 9:150, 10:200 }

  const addExp = (amount) => setPlayerData(prev => {
    const newExp = prev.exp + amount
    const newLevel = Math.floor(newExp / 100) + 1
    if (newLevel > prev.level) {
      setLevelUpEvent(newLevel)
      const bonus = LEVEL_BONUS[newLevel] || newLevel * 10
      return { ...prev, exp: newExp, level: newLevel, coins: (prev.coins || 0) + bonus }
    }
    return { ...prev, exp: newExp, level: newLevel }
  })

  const addCoins = (amount) => setPlayerData(prev => ({ ...prev, coins: (prev.coins || 0) + amount }))

  const addTeamPoints = (amount) => {
    setPlayerData(prev => ({ ...prev, teamPoints: prev.teamPoints + amount }))
    updateProgress('positiveRelationship', amount * 2)
  }

  const addBadge = (badge) => setPlayerData(prev => {
    if (prev.badges.includes(badge)) return prev
    return { ...prev, badges: [...prev.badges, badge], sessionRewards: [...prev.sessionRewards, { type: 'badge', name: badge }] }
  })

  const addItem = (item) => setPlayerData(prev => ({
    ...prev, items: [...prev.items, item],
    sessionRewards: [...prev.sessionRewards, { type: 'item', name: item }],
  }))

  const updateProgress = (key, amount) => setPlayerData(prev => ({
    ...prev,
    progress: { ...prev.progress, [key]: Math.min(100, (prev.progress[key] || 0) + amount) },
  }))

  const addSessionReward = (reward) => setPlayerData(prev => ({
    ...prev, sessionRewards: [...prev.sessionRewards, reward],
  }))

  // ── 상점 액션 ──
  const buyItem = (item) => {
    setPlayerData(prev => {
      if ((prev.coins || 0) < item.price) return prev
      return {
        ...prev,
        coins: prev.coins - item.price,
        ownedItems: [...(prev.ownedItems || []), item.id],
        equippedItems: { ...prev.equippedItems, [item.category]: item },
      }
    })
  }

  const toggleEquip = (item) => {
    setPlayerData(prev => {
      const currentEquipped = prev.equippedItems[item.category]
      const newEquipped = currentEquipped?.id === item.id ? null : item
      return { ...prev, equippedItems: { ...prev.equippedItems, [item.category]: newEquipped } }
    })
  }

  const unequip = (category) => {
    setPlayerData(prev => ({ ...prev, equippedItems: { ...prev.equippedItems, [category]: null } }))
  }

  const gameActions = {
    addExp, addCoins, addTeamPoints, addBadge, addItem,
    updateProgress, addSessionReward,
    buyItem, toggleEquip, unequip,
    goTo: setScreen,
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ecfdf5, #eff6ff)', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '64px' }}>🧙‍♂️</div>
        <div style={{ fontSize: '18px', color: '#6b7280', fontWeight: 'bold' }}>불러오는 중...</div>
      </div>
    )
  }

  if (!user) return <AuthScreen onLogin={handleLogin} />

  const screens = {
    home: <HomeScreen playerData={playerData} user={user} onLogout={handleLogout} onStart={() => setScreen('learning')} actions={gameActions} />,
    learning: <LearningScreen playerData={playerData} actions={gameActions} />,
    reinforcement: <ReinforcementScreen playerData={playerData} actions={gameActions} />,
    simulation: <SimulationScreen playerData={playerData} actions={gameActions} />,
    dashboard: <DashboardScreen playerData={playerData} onRestart={() => { setPlayerData(makeInitialPlayer(user)); setScreen('home') }} />,
    shop: <ShopScreen playerData={playerData} actions={gameActions} />,
    mypage: <MyPageScreen playerData={playerData} user={user} actions={gameActions} onLogout={handleLogout} />,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0fdf4 0%, #eff6ff 100%)' }}>
      {screens[screen] || screens.home}
      {levelUpEvent && (
        <LevelUpPopup
          level={levelUpEvent}
          onClose={() => setLevelUpEvent(null)}
        />
      )}
    </div>
  )
}
