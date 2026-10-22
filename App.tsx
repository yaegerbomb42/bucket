import React, { useState } from 'react';
import { BucketItem } from './types';
import { useBucketPersistence } from './hooks/useBucketPersistence';
import { GoldBucket } from './components/GoldBucket';
import { BucketCard } from './components/BucketCard';
import { MotivationalAbstractBackground } from './components/MotivationalAbstractBackground';
import { Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  // Use the new Blob persistence hook instead of local storage
  const [items, setItems, loading] = useBucketPersistence([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem: BucketItem = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    setItems((prev) => [newItem, ...prev]);
    setInputValue('');
  };

  const toggleItem = (id: string) => {
    setItems((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const isCompleting = !item.completedAt;
          
          if (isCompleting) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00f3ff', '#ff00ff', '#FACC15'],
              disableForReducedMotion: true
            });
          }

          return {
            ...item,
            completedAt: isCompleting ? new Date().toISOString() : null
          };
        }
        return item;
      })
    );
  };

  // Instant delete
  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const activeItems = items
    .filter(i => !i.completedAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const completedItems = items
    .filter(i => !!i.completedAt)
    .sort((a, b) => {
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
      return dateB - dateA;
    });

  const total = items.length;
  const doneCount = completedItems.length;
  const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center text-neon-blue">
        <div className="flex flex-col items-center gap-4 animate-pulse">
           <div className="w-16 h-16">
             <GoldBucket />
           </div>
           <Loader2 className="animate-spin" size={32} />
           <p className="text-sm font-mono tracking-widest text-slate-400">SYNCING...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 pb-20 font-sans selection:bg-neon-pink selection:text-white relative">
      
      {/* Motivational Abstract Background */}
      <MotivationalAbstractBackground />
      
      {/* Additional subtle overlay effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-gold-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        
        {/* Header Section */}
        <header className="pt-16 pb-12 flex flex-col items-center justify-center text-center">
          <div className="w-48 h-48 mb-6 transition-transform hover:scale-105 duration-500">
            <GoldBucket />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-500 to-amber-600 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              Yaeger's Bucket
            </span>
          </h1>

          {/* Progress Bar - Neon Style */}
          {total > 0 && (
            <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 h-1.5 rounded-full overflow-hidden mb-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <div 
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_#00f3ff] transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleAddItem} className="w-full max-w-xl relative group z-10">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-pink via-purple-600 to-neon-blue rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative flex items-center bg-[#0a0a1a] rounded-xl overflow-hidden shadow-2xl border border-slate-700 group-focus-within:border-slate-500 transition-colors">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="..."
                className="w-full bg-transparent border-none text-xl text-white px-6 py-4 focus:outline-none focus:ring-0 placeholder:text-slate-600 font-medium tracking-wide text-center"
                autoFocus
              />
              <div className={`absolute right-4 text-xs text-slate-500 font-mono pointer-events-none transition-opacity duration-300 ${inputValue.trim() ? 'opacity-100' : 'opacity-0'}`}>
                PRESS ENTER ↵
              </div>
            </div>
          </form>
        </header>

        {/* Main Content Area - Stacked then Grid */}
        <main className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Active Items */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/50 mb-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tight">
                <span className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_#00f3ff] animate-pulse"></span>
                Active
                <span className="text-sm font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full ml-auto border border-slate-700">{activeItems.length}</span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-3">
              {activeItems.length === 0 && completedItems.length === 0 ? (
                <div className="text-center py-16 opacity-40 border border-dashed border-slate-700 rounded-2xl bg-slate-900/30">
                  <p className="text-slate-400 text-sm font-mono tracking-widest uppercase">Bucket Empty</p>
                </div>
              ) : activeItems.length === 0 ? (
                <div className="text-center py-8 opacity-60">
                  <p className="text-slate-400 font-light italic">All caught up.</p>
                </div>
              ) : (
                activeItems.map(item => (
                  <BucketCard 
                    key={item.id} 
                    item={item} 
                    onToggle={toggleItem} 
                    onDelete={deleteItem}
                  />
                ))
              )}
            </div>
          </section>

          {/* Completed Items */}
          <section className="flex flex-col gap-4 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/50 mb-2">
              <h2 className="text-2xl font-bold text-slate-400 flex items-center gap-3 tracking-tight group">
                <span className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_10px_#ff00ff] group-hover:animate-pulse"></span>
                Done
                <span className="text-sm font-semibold text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full ml-auto border border-slate-800">{completedItems.length}</span>
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {completedItems.length === 0 ? (
                <div className="text-center py-16 opacity-30">
                  <p className="text-slate-500 text-sm">Nothing yet.</p>
                </div>
              ) : (
                completedItems.map(item => (
                  <BucketCard 
                    key={item.id} 
                    item={item} 
                    onToggle={toggleItem} 
                    onDelete={deleteItem}
                  />
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
