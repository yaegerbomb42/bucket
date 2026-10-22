import React from 'react';

export const MotivationalAbstractBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(255, 214, 102, 0.25), transparent 45%),' +
            'radial-gradient(circle at 80% 15%, rgba(0, 243, 255, 0.18), transparent 40%),' +
            'radial-gradient(circle at 15% 80%, rgba(255, 0, 170, 0.2), transparent 45%),' +
            'radial-gradient(circle at 85% 75%, rgba(124, 58, 237, 0.22), transparent 50%),' +
            'linear-gradient(135deg, #050510 0%, #0d0b2e 45%, #1a0f3a 100%)',
        }}
      />
      <div className="absolute -top-24 -left-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-amber-300/30 via-yellow-400/10 to-transparent blur-[120px]" />
      <div className="absolute top-10 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/25 via-blue-500/10 to-transparent blur-[140px]" />
      <div className="absolute bottom-[-15%] left-[10%] h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-fuchsia-500/25 via-purple-500/10 to-transparent blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[5%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-emerald-300/20 via-sky-400/10 to-transparent blur-[160px]" />
      <div className="absolute inset-x-0 top-[35%] h-[2px] bg-gradient-to-r from-transparent via-amber-200/60 to-transparent opacity-80" />
      <div className="absolute inset-x-[15%] bottom-[20%] h-[2px] bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent opacity-70" />
    </div>
  );
};
