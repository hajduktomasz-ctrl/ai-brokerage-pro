(function() {
    window.uruchomStraznikaH = async function(query = "Skanowanie") {
        const win = window.open('', 'GuardianTerminal', `width=850,height=800,menubar=no`);
        if (!win) return alert("Odblokuj pop-upy!");

        win.document.write(`
            <html>
            <head>
                <title>SHIELD: HAJDUK GLOBAL QUANTUM ACTIVE GUARDIAN SCAN </title>
                <script src="https://tailwindcss.com"></script>
                <style>
                    body { background: #01050a; color: #10b981; font-family: monospace; overflow: hidden; }
                    .scan-line { width: 100%; height: 3px; background: #10b981; position: absolute; top: 0; animation: scan 3s linear infinite; }
                    @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
                    .critical { color: #ff0000; text-shadow: 0 0 10px #ff0000; animation: blink 0.5s infinite; }
                    @keyframes blink { from { opacity: 1; } to { opacity: 0.3; } }
                </style>
            </head>
            <body class="p-8 border-4 border-emerald-500/30 h-screen flex flex-col items-center justify-center">
                <!-- EKRAN AKTYWACJI (Rozwiązuje problem mowy) -->
                <div id="activation-screen" class="z-50 absolute inset-0 bg-black flex flex-col items-center justify-center text-center p-10">
                    <h2 class="text-2xl font-black mb-6 animate-pulse">SYSTEM OCZEKUJE NA AUTORYZACJĘ</h2>
                    <button id="activate-btn" class="px-10 py-5 bg-emerald-600 text-black font-black rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_30px_#10b981]">
                        UZBRÓJ I URUCHOM SKANER
                    </button>
                    <p class="mt-4 text-[10px] opacity-50 uppercase tracking-widest">Wymagane kliknięcie do aktywacji mowy i naprawy</p>
                </div>

                <div class="scan-line"></div>
                <div id="main-ui" class="w-full h-full flex flex-col opacity-0 transition-opacity duration-1000">
                    <div class="flex justify-between border-b border-emerald-900 pb-4 mb-4">
                        <h1 class="text-2xl font-black italic">🛡️ GUARDIAN CORE ACTIVE</h1>
                        <div id="voice-status" class="text-[9px] border border-emerald-500 px-2 py-1">READY</div>
                    </div>
                    <div id="output" class="flex-1 overflow-y-auto text-[11px] space-y-1 mb-4"></div>
                    <div id="status-bar" class="p-4 bg-emerald-950/40 border border-emerald-500/20 text-xs font-bold text-center italic uppercase">
                        Monitoring: H:/index.html
                    </div>
                </div>

                <script>
                    const output = document.getElementById('output');
                    const log = (msg, cl = "") => {
                        const p = document.createElement('p');
                        p.className = cl;
                        p.innerText = "> [" + new Date().toLocaleTimeString() + "] " + msg;
                        output.appendChild(p);
                        output.scrollTop = output.scrollHeight;
                    };

                    const speak = (txt) => {
                        window.speechSynthesis.cancel();
                        const msg = new SpeechSynthesisUtterance(txt);
                        msg.lang = 'pl-PL';
                        msg.pitch = 0.7;
                        window.speechSynthesis.speak(msg);
                    };

                    document.getElementById('activate-btn').onclick = function() {
                        document.getElementById('activation-screen').style.display = 'none';
                        document.getElementById('main-ui').style.opacity = '1';
                        
                        speak("System uzbrojony. Strażnik rozpoczyna analizę.");
                        log("AUTORYZACJA PROJEKTANTA: POWODZENIE.");
                        
                        // TU ZACZYNA SIĘ PRAWDZIWE SKANOWANIE
                        startRealAnalysis();
                    };

                    function startRealAnalysis() {
                        log("Łączenie z jądrem H:/index.html...");
                        
                        setTimeout(() => {
                            // Sprawdzamy czy okno główne żyje
                            if (window.opener) {
                                log("Synchronizacja z oknem głównym: OK.");
                                speak("Połączono z jądrem projektu.");
                                
                                // Testowanie naprawy (realna manipulacja DOM okna głównego)
                                try {
                                    const mainDoc = window.opener.document;
                                    log("Skanowanie znaczników... wykryto " + mainDoc.querySelectorAll('*').length + " elementów.");
                                    
                                    // Sprawdź czy jest błąd w tytule lub pustym body
                                    if(mainDoc.body.innerHTML.length < 10) {
                                        log("ALARM: Wykryto pusty projekt!", "critical");
                                        speak("Wykryto krytyczny błąd struktury. Przywracam snapshot.");
                                        window.opener.snapLoad();
                                    }
                                } catch(e) {
                                    log("BŁĄD DOSTĘPU: Przeglądarka blokuje dostęp do kodu H:!", "critical");
                                    speak("Ostrzeżenie. Blokada bezpieczeństwa uniemożliwia pełną naprawę.");
                                }
                            }
                        }, 2000);
                    }
                </script>
            </body>
            </html>
        `);
    };
})();