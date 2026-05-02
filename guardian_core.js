function uruchomStraznikaH() {
    const win = window.open("", "StraznikWizji", "width=850,height=650");
    
    if (!win) {
        alert("Zablokowano wyskakujące okno! Zezwól na pop-upy w przeglądarce.");
        return;
    }

    win.document.write(`
        <html>
        <head>
            <title>MI6 TERMINAL v2.0 | PROJEKT H</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                @import url('https://googleapis.com');
                body { 
                    background: #020617; 
                    color: #10b981; 
                    font-family: 'Fira Code', monospace; 
                    padding: 20px; 
                    margin: 0;
                    overflow: hidden;
                }
                #output { 
                    height: calc(100vh - 100px); 
                    overflow-y: auto; 
                    border-bottom: 1px solid #064e3b; 
                    margin-bottom: 10px;
                    padding-right: 10px;
                }
                input { background: transparent; border: none; outline: none; color: white; width: 80%; font-family: inherit; }
                .cmd-response { color: #34d399; margin-bottom: 8px; font-size: 13px; }
                .error-text { color: #ef4444; font-weight: bold; }
                .system-text { color: #64748b; font-size: 0.8rem; }
            </style>
        </head>
        <body>
            <div id="output">
                <p class="system-text">[SYSTEM] Terminal MI6 nawiązuje połączenie z 127.0.0.1:5000...</p>
                <p class="mb-4">Wpisz <span class="text-white font-bold">'pomoc'</span> aby sprawdzić protokoły.</p>
            </div>
            <div class="flex items-center bg-black/30 p-2 rounded">
                <span class="mr-2 text-emerald-500 font-bold">admin@mi6:~$</span>
                <input type="text" id="cmd-input" autofocus autocomplete="off" placeholder="...">
            </div>

            <script>
                const out = document.getElementById('output');
                const inp = document.getElementById('cmd-input');

                function log(msg, cl = "cmd-response") {
                    const p = document.createElement('p');
                    p.className = cl;
                    p.innerHTML = '<span class="system-text">[' + new Date().toLocaleTimeString() + ']</span> ' + msg;
                    out.appendChild(p);
                    out.scrollTop = out.scrollHeight;
                }

                async function sendToFlask(endpoint, data) {
                    try {
                        const r = await fetch('http://127.0.0.1:5000' + endpoint, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            mode: 'cors', 
                            body: JSON.stringify(data)
                        });
                        return await r.json();
                    } catch(e) {
                        return {status: "error", output: "BŁĄD: Serwer Bridge (127.0.0.1) nie odpowiada!"};
                    }
                }

                inp.onkeydown = async (e) => {
                    if (e.key === 'Enter') {
                        const val = inp.value.trim();
                        const low = val.toLowerCase();
                        inp.value = '';
                        if(!val) return;

                        log("> " + val.toUpperCase(), "text-white font-bold mt-2");

                     
                        if(low === 'google') {
                            log("Otwieranie MI6 Search Proxy...", "text-blue-400");
                            const link = document.createElement('a');
                            link.href = "https://www.google.com";
                            link.target = "_blank";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            return;
                        }

                        if(low === 'pomoc') {
                            log("--- LISTA PROTOKOŁÓW MI6 ---", "text-emerald-400 font-bold");
                            log("GOOGLE   - Otwiera wyszukiwarkę");
                            log("SKANUJ   - Analizuje strukturę index.html");
                            log("DIAGNOZA - Skanuje dostępne dyski");
                            log("SPRAWDŻ   - Optymalizuje kod projektu");
                            log("GET_WIFI - Pobiera listę sieci bezprzewodowych");
                            log("IPCONFIG   - Windows IP Configuration");
                            log("NAMIERZ   - Namierz i naprawia url");
                            log("CZYŚĆ    - Resetuje konsolę");
                            return;
                        }

                        if(low === 'czyść' || low === 'cls') {
                            out.innerHTML = '<p class="system-text">Terminal zresetowany.</p>';
                            return;
                        }

                       
                        let ep = '/run-os-cmd';
                        if (low === 'diagnoza') ep = '/diagnoza';
                        if (low === 'sprawdź') ep = '/sprawdź';

                        const res = await sendToFlask(ep, {command: val});
                        const style = res.status === "error" ? "error-text" : "cmd-response whitespace-pre-wrap font-mono";
                        log(res.output, style);
                    }
                };
            <\/script>
        </body>
        </html>
    `);
}