"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [showButton, setShowButton] = useState(true);
  const [animateButton, setAnimateButton] = useState(false);
  const [flipDuration, setFlipDuration] = useState(3000);
  const [finalAngle, setFinalAngle] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);

  const flipCoin = () => {
    if (isFlipping) return;
    
    setAnimateButton(true);
    setIsFlipping(true);
    setShowButton(false);
    
    // Générer un résultat aléatoire et une durée aléatoire
    const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';
    const duration = Math.random() * 2000 + 2000; // 2-4 secondes
    setFlipDuration(duration);
    
    // Calculer l'angle final pour que la bonne face soit visible
    // Face = 180° (obverse visible), Pile = 0° (reverse visible)
    const baseRotations = Math.floor(Math.random() * 3) + 4; // 4-6 tours complets
    const baseAngle = baseRotations * 360;
    const finalRotation = coinResult === 'heads' ? baseAngle + 180 : baseAngle;
    setFinalAngle(finalRotation);
    
    // Attendre la fin de l'animation puis afficher le résultat
    setTimeout(() => {
      // Maintenir la position finale de la pièce
      setCurrentAngle(finalRotation);
      setResult(coinResult);
      setIsFlipping(false);
      setAnimateButton(false);
      // Réafficher le bouton après un délai
      setTimeout(() => {
        setShowButton(true);
        setResult(null);
        setCurrentAngle(0); // Réinitialiser pour le prochain lancement
      }, 2000);
    }, duration + 100); // +100ms pour s'assurer que l'animation CSS est terminée
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#b00000]">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-2xl font-bold text-[#ff00ee]">
          Lélé's coinflip
        </h1>
        
        <div 
          className={`coin-container relative w-24 h-24 mx-auto ${isFlipping ? 'flipping' : ''}`}
          style={{
            '--flip-duration': `${flipDuration}ms`,
            '--final-angle': `${finalAngle}deg`,
            transform: !isFlipping ? `rotateY(${currentAngle}deg)` : undefined
          } as React.CSSProperties & { '--flip-duration': string; '--final-angle': string }}
        >
          <div className="absolute w-full h-full bg-contain bg-no-repeat bg-center [backface-visibility:hidden] rounded-full z-[100] bg-[url('https://upload.wikimedia.org/wikipedia/en/d/d8/British_fifty_pence_coin_2015_reverse.png')]" />
          <div 
            className="absolute w-full h-full bg-contain bg-no-repeat bg-center [backface-visibility:hidden] rounded-full bg-[url('https://upload.wikimedia.org/wikipedia/en/5/52/British_fifty_pence_coin_2015_obverse.png')]" 
            style={{ transform: 'rotateY(-180deg)' }}
          />
        </div>

        {result && !isFlipping && (
          <div className="text-xl font-bold text-[#ff00ee] animate-pulse">
            Résultat : {result === 'heads' ? 'Face !' : 'Pile !'}
          </div>
        )}

        {isFlipping && (
          <div className="text-lg text-[#ff00ee] animate-bounce">
            Lancement en cours...
          </div>
        )}

        {showButton && (
          <Button
            onClick={flipCoin}
            onMouseDown={() => setAnimateButton(true)}
            onMouseUp={() => setTimeout(() => setAnimateButton(false), 750)}
            onMouseLeave={() => setAnimateButton(false)}
            disabled={isFlipping}
            size={"lg"}
            className={`coin-flip-btn cursor-pointer relative text-[#b00000] bg-[#ff00ee] hover:bg-[#ff00ee]/90 shadow-lg shadow-[#ff00de]/50 text-lg px-8 py-4 transition-all duration-100 active:scale-90 ${animateButton ? 'animate' : ''}`}
          >
            Lancer la pièce
          </Button>
        )}
      </div>
    </div>
  );
}
