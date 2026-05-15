import { useState } from 'react'
import './index.css'
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

const INITIAL_PLAYER = {
  name: '용감한 모험가',
  exp: 0,
  level: 1,
  teamPoints: 0,
  badges: [],
  items: [],
  progress: { ...INITIAL_PROGRESS },
  sessionRewards: [],
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [playerData, setPlayerData] = useState({ ...INITIAL_PLAYER })

  const addExp = (amount) => {
    setPlayerData(prev => {
      const newExp = prev.exp + amount
      const newLevel = Math.floor(newExp / 100) + 1
      return { ...prev, exp: newExp, level: newLevel }
    })
  }

  const addTeamPoints = (amount) => {
    setPlayerData(prev => ({ ...prev, teamPoints: prev.teamPoints + amount }))
    updateProgress('positiveRelationship', amount * 2)
  }

  const addBadge = (badge) => {
    setPlayerData(prev => {
      if (prev.badges.includes(badge)) return prev
      return {
        ...prev,
        badges: [...prev.badges, badge],
        sessionRewards: [...prev.sessionRewards, { type: 'badge', name: badge }],
      }
    })
  }

  const addItem = (item) => {
    setPlayerData(prev => ({
      ...prev,
      items: [...prev.items, item],
      sessionRewards: [...prev.sessionRewards, { type: 'item', name: item }],
    }))
  }

  const updateProgress = (key, amount) => {
    setPlayerData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [key]: Math.min(100, prev.progress[key] + amount),
      },
    }))
  }

  const addSessionReward = (reward) => {
    setPlayerData(prev => ({
      ...prev,
      sessionRewards: [...prev.sessionRewards, reward],
    }))
  }

  const gameActions = {
    addExp,
    addTeamPoints,
    addBadge,
    addItem,
    updateProgress,
    addSessionReward,
    goTo: setScreen,
  }

  const screens = {
    home: <HomeScreen playerData={playerData} onStart={() => setScreen('learning')} />,
    learning: <LearningScreen playerData={playerData} actions={gameActions} />,
    reinforcement: <ReinforcementScreen playerData={playerData} actions={gameActions} />,
    simulation: <SimulationScreen playerData={playerData} actions={gameActions} />,
    dashboard: <DashboardScreen playerData={playerData} onRestart={() => {
      setPlayerData({ ...INITIAL_PLAYER, progress: { ...INITIAL_PROGRESS } })
      setScreen('home')
    }} />,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0fdf4 0%, #eff6ff 100%)' }}>
      {screens[screen]}
    </div>
  )
}
