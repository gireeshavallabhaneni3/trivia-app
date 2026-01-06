import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { Home } from './components/views/Home';
import { Leaderboard } from './components/views/Leaderboard';
import { Quiz } from './components/views/Quiz';
import { Topics } from './components/views/Topics';
import './index.css';
import { useAppStore } from './store';

function App() {
  const { state, currentRoute, navigate, addHistory, setCategory } = useAppStore();

  const handleStartQuiz = (category: string) => {
    setCategory(category);
    navigate('quiz');
  };

  const handleQuizComplete = (success: boolean, xp: number, qid: string) => {
    addHistory({ id: qid, success, xp, ts: Date.now() });
  };

  return (
    <div id="app">
      <Header streak={state.streak} xp={state.totalXp} />
      {currentRoute !== 'quiz' && (
        <BottomNav currentRoute={currentRoute} onNavigate={navigate} />
      )}
      <main id="views">
        {currentRoute === 'home' && <Home onStartQuiz={handleStartQuiz} />}
        {currentRoute === 'categories' && <Topics onStartQuiz={handleStartQuiz} />}
        {currentRoute === 'leaderboard' && <Leaderboard state={state} />}
        {currentRoute === 'quiz' && (
          <Quiz 
            category={state.currentCategory} 
            onComplete={handleQuizComplete}
            onExit={() => navigate('home')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
