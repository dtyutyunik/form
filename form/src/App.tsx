import './App.css';
import goalsImg from './assets/goals.jpg';
import Header from './components/Header';
import { useState } from 'react';
import { CourseGoalList } from './components/CourseGoalList';
import { NewGoal } from './components/NewGoal';

export type GoalTypes = {
  title: string,
  description: string,
  id: number
}

function App() {

  const [goals, setGoals] = useState<GoalTypes[]>([])


  const handleAddGoal = (goal: string, summary: string): void => {
    let id = goals.length > 0 ? goals.length + 1 : 1
    const newGoals: GoalTypes = { title: goal, description: summary, id }

    setGoals(prevGoals => {
      return [...prevGoals, newGoals]
    })
  }

  const handleDeleteGoal = (id: number): void => {
    setGoals((prevGoal) => {
      return prevGoal.filter((goal => goal.id !== id))
    })
  }

  return (

    <main>
      <Header image={{ src: goalsImg, alt: "A list of goals" }}>
        <h1>Your Course goals</h1>
      </Header>
      <NewGoal onAddGoal={handleAddGoal} />
      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />

    </main>

  );
}

export default App;

