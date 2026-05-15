import { useState, useEffect } from 'react'
import './index.css'
import { supabase } from './lib/supabase'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import LearningScreen from './screens/LearningScreen'
import ReinforcementScreen from './screens/ReinforcementScreen'
import SimulationScreen from './screens/SimulationScreen'
import DashboardScreen from './screens/DashboardScreen'

const INITIAL_PROGRESS = {
  selfControl: 0,
  social: 0,
  ruleUnderstanding: 0,
  positiveRelationship: 0,
}

const makeInitialPlayer = (user) => ({
  name: user?.user_metadata?.nickname || user?.email?.split('@')[0] || '용감한 모험가',
  exp: 0,
  level: 1,
  teamPoints: 0,
  badges: [],
  items: [],
  progress: { ...INITIAL_PROGRESS },
  sessionRewards: [],
})

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [screen, setScreen] = useState('home')
  const [playerData, setPlayerData] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        setPlayerData(makeInitialPlayer(session.user))
      }
      setAuthLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        setPlayerData(makeInitialPlayer(session.user))
      } else {
        setUser(null)
        setPlayerData(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = (u) => {
    setUser(u)
    setPlayerData(makeInitialPlayer(u))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setPlayerData(null)
    setScreen('home')
  }

  const addExp = (amount) => {
    setPlayerData(prev => {
      const newExp = prev.exp + amount
      return { ...prev, exp: newExp, level: Math.floor(newExp / 100) + 1 }
    })
  }

  const addTeamPoints = (amount) => {
    setPlayerData(prev => ({ ...prev, teamPoints: prev.teamPoints + amount }))
    updateProgress('positiveRelationship', amount * 2)
  }

  const addBadge = (badge) => {
    setPlayerData(prev => {
      if (prev.badges.includes(badge)) return prev
      return { ...prev, badges: [...prev.badges, badge], sessionRewards: [...prev.sessionRewards, { type: 'badge', name: badge }] }
    })
  }

  const addItem = (item) => {
    setPlayerData(prev => ({
      ...prev, items: [...prev.items, item],
      sessionRewards: [...prev.sessionRewards, { type: 'item', name: item }],
    }))
  }

  const updateProgress = (key, amount) => {
    setPlayerData(prev => ({
      ...prev,
      progress: { ...prev.progress, [key]: Math.min(100, prev.progress[key] + amount) },
    }))
  }

  const addSessionReward = (reward) => {
    setPlayerData(prev => ({ ...prev, sessionRewards: [...prev.sessionRewards, reward] }))
  }

  const gameActions = { addExp, addTeamPoints, addBadge, addItem, updateProgress, addSessionReward, goTo: setScreen }

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #ecfdf5, #eff6ff)',
        flexDirection: 'column', gap: '16px',
      }}>
        <div style={{ fontSize: '64px' }}>🧙‍♂️</div>
        <div style={{ fontSize: '18px', color: '#6b7280', fontWeight: 'bold' }}>불러오는 중...</div>
      </div>
    )
  }

  if (!user) return <AuthScreen onLogin={handleLogin} />

  const screens = {
    home: <HomeScreen playerData={playerData} user={user} onLogout={handleLogout} onStart={() => setScreen('learning')} />,
    learning: <LearningScreen playerData={playerData} actions={gameActions} />,
    reinforcement: <ReinforcementScreen playerData={playerData} actions={gameActions} />,
    simulation: <SimulationScreen playerData={playerData} actions={gameActions} />,
    dashboard: <DashboardScreen playerData={playerData} onRestart={() => {
      setPlayerData(makeInitialPlayer(user))
      setScreen('home')
    }} />,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0fdf4 0%, #eff6ff 100%)' }}>
      {screens[screen] || screens.home}
    </div>
  )
}