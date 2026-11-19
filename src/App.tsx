import { useState } from 'react';
import { Shell, type ScreenId } from './components/Shell';
import { ToastHost } from './components/ui';
import { Dashboard } from './screens/Dashboard';
import { Ats, CandidateDrawer } from './screens/Ats';
import { EvalForm } from './screens/EvalForm';
import { Reports } from './screens/Reports';
import { Assets, Attendance, Directory } from './screens/People';
import type { Candidate } from './data/types';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('dashboard');
  const [drawerCand, setDrawerCand] = useState<Candidate | null>(null);
  const [evalId, setEvalId] = useState<string | null>(null);

  const openEval = (c: Candidate) => {
    setDrawerCand(null);
    setEvalId(c.id);
    setScreen('eval');
  };

  const navigate = (s: ScreenId) => {
    if (s !== 'eval') setEvalId(null);
    setScreen(s);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Shell active={screen} onNavigate={navigate} onOpenCandidate={(c) => { navigate('ats'); setDrawerCand(c); }}>
        {screen === 'dashboard' && <Dashboard onNavigate={navigate} />}
        {screen === 'ats' && <Ats onOpenCandidate={setDrawerCand} onOpenEval={openEval} />}
        {screen === 'eval' && (
          <EvalForm
            candidateId={evalId}
            onBack={() => {
              setEvalId(null);
              navigate('ats');
            }}
          />
        )}
        {screen === 'reports' && <Reports />}
        {screen === 'directory' && <Directory />}
        {screen === 'attendance' && <Attendance />}
        {screen === 'assets' && <Assets />}
      </Shell>

      {drawerCand && (
        <CandidateDrawer candidate={drawerCand} onClose={() => setDrawerCand(null)} onOpenEval={openEval} />
      )}

      <ToastHost />
    </>
  );
}
