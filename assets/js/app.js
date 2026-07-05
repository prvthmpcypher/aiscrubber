/*
=============================================================
  AISCRUBBER — A CYPHER ECOSYSTEM INITIATIVE
  Built by Poorvith M P (@prvthmp)
=============================================================

  Facebook  : https://www.facebook.com/profile.php?id=61588582092141
  Instagram : https://www.instagram.com/prvthmp
  X         : https://x.com/prvthmp
  LinkedIn  : https://www.linkedin.com/in/prvthmp

-------------------------------------------------------------

  This is my first web application, built while learning
  web development by solving real-world problems with code.

  AiScrubber is part of a larger personal vision called
  Cypher — a privacy-first product ecosystem I am slowly
  and seriously working towards.

  If you are reading this source code — hello. I built
  this from scratch, learned as I went, and shipped it
  anyway. That is the whole point.

-------------------------------------------------------------
  © 2026 Poorvith M P. All rights reserved.
  A Cypher Ecosystem Initiative.
=============================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    const isWorkspacePage = document.body.classList.contains('workspace-page');

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // â”€â”€â”€ NOTIFICATION SYSTEM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    class NotificationManager {
        constructor() {
            this.toastContainer = document.getElementById('toastContainer');
            this.modalContainer = document.getElementById('modalContainer');
        }

        showToast(message, type = 'info', duration = 3000) {
            if (isWorkspacePage) return;
            if (!this.toastContainer) return;
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            this.toastContainer.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('closing');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }

        showModal(title, message) {
            if (!this.modalContainer) return;
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            const content = document.createElement('div');
            content.className = 'card glass-panel modal-content';
            const heading = document.createElement('h3');
            heading.textContent = String(title).slice(0, 120);
            const copy = document.createElement('p');
            copy.style.cssText = 'font-size: 0.95rem; color: var(--cypher-text-secondary); margin-bottom: 1.5rem;';
            copy.textContent = String(message).slice(0, 600);
            const close = document.createElement('button');
            close.className = 'btn btn-primary modal-close';
            close.type = 'button';
            close.textContent = 'Close';
            content.append(heading, copy, close);
            modal.appendChild(content);
            this.modalContainer.appendChild(modal);

            modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
            modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        }
    }

    const notificationManager = new NotificationManager();
    const showToast = (m, t = 'info', d = 3000) => notificationManager.showToast(m, t, d);
    const showModal = (title, m) => notificationManager.showModal(title, m);

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // â”€â”€â”€ SCROLL & APPEAR EFFECTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const siblings = entry.target.parentElement?.querySelectorAll('.slide-in-left, .slide-in-right, .flip-in, .bounce-in');
                if (siblings) siblings.forEach((el, idx) => el.style.animationDelay = `${idx * 0.08}s`);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .flip-in, .bounce-in, .fade-in-up').forEach(el => observer.observe(el));

    function isSafeSelector(value) {
        return /^#[A-Za-z][A-Za-z0-9_-]*$/.test(value);
    }

    function ensurePageLoader() {
        let loader = document.getElementById('pageLoader');
        if (loader) return loader;
        loader = document.createElement('div');
        loader.id = 'pageLoader';
        loader.className = 'page-loader hidden';
        const logo = document.createElement('img');
        logo.src = 'assets/img/brand-logo.svg';
        logo.alt = '';
        logo.className = 'page-loader-logo';
        const text = document.createElement('p');
        text.textContent = 'Loading secure page...';
        loader.append(logo, text);
        document.body.appendChild(loader);
        return loader;
    }

    const globalPageLoader = ensurePageLoader();

    function ensureLegalFooter() {
        const links = [
            ['privacy.html', 'Privacy Policy'],
            ['terms.html', 'Terms'],
            ['cookies.html', 'Cookie Policy'],
            ['community-guidelines.html', 'Community Guidelines']
        ];
        let footer = document.querySelector('footer');
        if (!footer) {
            footer = document.createElement('footer');
            footer.innerHTML = '<div class="footer-bottom"><p>&copy; 2026 Built by Poorvith M P. A Cypher Ecosystem Initiative.</p></div>';
            document.body.insertBefore(footer, document.querySelector('script[src="assets/js/app.js"]') || null);
        }
        const footerBottom = footer.querySelector('.footer-bottom') || footer;
        const copyright = footerBottom.querySelector('p');
        if (copyright && !copyright.querySelector('a[href="about.html"]')) {
            copyright.innerHTML = '&copy; 2026 Built by <a href="about.html">Poorvith M P</a>. A Cypher Ecosystem Initiative.';
        }

        let socials = footer.querySelector('.footer-socials');
        if (!socials) {
            socials = document.createElement('div');
            socials.className = 'footer-socials';
            const title = document.createElement('h4');
            title.textContent = 'Connect';
            const row = document.createElement('div');
            row.className = 'social-icons';
            socials.append(title, row);
            const grid = footer.querySelector('.footer-grid');
            if (grid) grid.appendChild(socials);
            else footer.insertBefore(socials, footerBottom);
        }
        const row = socials.querySelector('.social-icons') || document.createElement('div');
        row.className = 'social-icons';
        if (!socials.contains(row)) socials.appendChild(row);
        const socialLinks = [
            ['javascript:void(0)', 'Facebook (prvthmp - blocked)', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-3.1 0-5 1.9-5 5v3H6v4h3v6h4v-6h3.2l.8-4h-4V9c0-.7.3-1 1-1Z"></path></svg>'],
            ['https://www.instagram.com/prvthmp', 'Instagram', '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>'],
            ['https://x.com/prvthmp', 'X', '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2h3.3l-7.2 8.2L23.4 22h-6.6l-5.1-6.7L5.8 22H2.5l7.7-8.8L2.1 2h6.7l4.7 6.2L18.9 2Zm-1.2 17.9h1.8L7.8 4H5.9l11.8 15.9Z"></path></svg>'],
            ['https://www.linkedin.com/in/prvthmp', 'LinkedIn', '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>'],
            ['https://github.com/prvthmpcypher', 'GitHub', '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>']
        ];
        socialLinks.forEach(([href, label, icon]) => {
            if (row.querySelector(`a[href="${href}"]`)) return;
            const link = document.createElement('a');
            link.href = href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', label);
            link.innerHTML = icon;
            row.appendChild(link);
        });

        if (footer.querySelector('.legal-links')) return;
        const legal = document.createElement('div');
        legal.className = 'legal-links';
        links.forEach(([href, label]) => {
            const link = document.createElement('a');
            link.href = href;
            link.textContent = label;
            legal.appendChild(link);
        });
        footerBottom.appendChild(legal);
    }

    ensureLegalFooter();

    // Show a small explanatory modal when users click the frozen Facebook links
    document.querySelectorAll('a[aria-label*="Facebook"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('Facebook Link Blocked', 'This Facebook profile is frozen and cannot be opened from AiScrubber.\n\nUsername: prvthmp\n\nIf you need to contact the project owner, use the other profile links (GitHub, X, LinkedIn).');
        });
    });

    // Smooth scroll anchors and indicators
    document.querySelectorAll('.scroll-indicator, a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || link.getAttribute('data-scroll-target');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = isSafeSelector(href) ? document.querySelector(href) : null;
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    showToast('Navigating to section...', 'info', 1200);
                }
            }
        });
    });

    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || link.target === '_blank') return;
            globalPageLoader.classList.remove('hidden');
        });
    });

    // Hero reveal movement
    const hero = document.querySelector('.hero');
    if (hero) {
        const updateHeroScroll = () => {
            const y = Math.min(window.scrollY, window.innerHeight);
            hero.style.setProperty('--hero-scroll', y.toFixed(2));
        };

        hero.addEventListener('pointermove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            hero.style.setProperty('--pointer-x', `${x.toFixed(2)}%`);
            hero.style.setProperty('--pointer-y', `${y.toFixed(2)}%`);
            hero.style.setProperty('--tilt-x', `${((x - 50) / 50 * 7).toFixed(2)}deg`);
            hero.style.setProperty('--tilt-y', `${((50 - y) / 50 * 5).toFixed(2)}deg`);
        });

        hero.addEventListener('pointerleave', () => {
            hero.style.setProperty('--tilt-x', '0deg');
            hero.style.setProperty('--tilt-y', '0deg');
            hero.style.setProperty('--pointer-x', '50%');
            hero.style.setProperty('--pointer-y', '42%');
        });

        updateHeroScroll();
        window.addEventListener('scroll', updateHeroScroll, { passive: true });
    }

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // â”€â”€â”€ PAGE LOADER & GLOBAL UX â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    const pageLoader = globalPageLoader;
    if (pageLoader) {
        window.addEventListener('load', () => setTimeout(() => { pageLoader.classList.add('hidden'); }, 150));
        setTimeout(() => pageLoader.classList.add('hidden'), 800);
    }

    // prevent contextual menu for security posture
    document.addEventListener('contextmenu', e => e.preventDefault());

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // â”€â”€â”€ SCRUBBER LOGIC (Scrub.html only) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    const scrubBtn = document.getElementById('scrubBtn');
    if (scrubBtn) {
        const step1 = document.getElementById('step-1');
        const stepLoader = document.getElementById('step-loader');
        const step2 = document.getElementById('step-2');
        const stepLoaderMessage = document.getElementById('stepLoaderMessage');
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');
        const keyTableBody = document.getElementById('keyTableBody');

        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
        const phoneRegex = /(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/g;
        let currentVaultMap = new Map();
        const feedbackKey = 'aiscrubber.feedback.history';
        const maxInputLength = 50000;

        function setWorkspaceMessage(title, message) {
            showModal(title, message);
        }

        // Autosave and local-recovery are disabled by user request.
        // No localStorage state will be read or written for the workspace.
        function saveWorkspaceState() { /* autosave disabled */ }
        function clearWorkspaceState() { /* no-op */ }

        const pasteBtn = document.getElementById('pasteBtn');

        inputText.addEventListener('paste', (e) => e.preventDefault());
        inputText.addEventListener('copy', (e) => e.preventDefault());
        inputText.addEventListener('cut', (e) => e.preventDefault());

        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if ((e.ctrlKey || e.metaKey) && key === 'v') {
                e.preventDefault();
            }
        }, { capture: true });

        if (pasteBtn) {
            pasteBtn.addEventListener('click', async () => {
                if (!navigator.clipboard) {
                    setWorkspaceMessage('Clipboard Unavailable', 'Your browser does not support clipboard access.');
                    return;
                }
                try {
                    const clipboardText = await navigator.clipboard.readText();
                    if (!clipboardText) {
                        setWorkspaceMessage('Clipboard Empty', 'There is no text in the clipboard to paste.');
                        return;
                    }
                    inputText.value = clipboardText;
                    saveWorkspaceState();
                    setWorkspaceMessage('Pasted from Clipboard', 'Your clipboard content has been loaded into the workspace.');
                    inputText.focus();
                } catch (err) {
                    setWorkspaceMessage('Paste Failed', 'Clipboard access was denied or unavailable.');
                }
            });
        }

        inputText.addEventListener('input', saveWorkspaceState);

        scrubBtn.addEventListener('click', () => {
            const rawText = inputText.value.trim();
            if (!rawText) {
                setWorkspaceMessage('Input Required', 'Please provide some text to scrub before proceeding.');
                return;
            }
            if (rawText.length > maxInputLength) {
                setWorkspaceMessage('Input Too Large', 'Please keep each scrub request under 50,000 characters.');
                return;
            }
            step1.classList.remove('active'); stepLoader.classList.add('active');
            const messages = ['Scanning for sensitive patterns...', 'Masking emails and phone numbers...', 'Generating local vault tokens...', 'Preparing LLM-ready output...'];
            let idx = 0; const interval = setInterval(() => { idx++; if (idx < messages.length) stepLoaderMessage.textContent = messages[idx]; }, 700);
            setTimeout(() => { clearInterval(interval); processText(rawText); stepLoader.classList.remove('active'); step2.classList.add('active'); saveWorkspaceState(); fireConfetti(); }, 2800);
        });

        function processText(text) {
            let scrubbedText = text; currentVaultMap.clear(); let tokenCounter = 1;
            function replaceEntity(match, prefix) {
                for (let [key, val] of currentVaultMap.entries()) if (val === match) return key;
                const token = `[${prefix}_${tokenCounter}]`; currentVaultMap.set(token, match); tokenCounter++; return token;
            }
            scrubbedText = scrubbedText.replace(emailRegex, (m) => replaceEntity(m, 'EMAIL'));
            scrubbedText = scrubbedText.replace(phoneRegex, (m) => replaceEntity(m, 'PHONE'));
            outputText.textContent = scrubbedText; updateVaultUI(currentVaultMap); saveWorkspaceState();
        }

        function updateVaultUI(vaultMap) {
            keyTableBody.innerHTML = '';
            if (vaultMap.size === 0) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 2;
                cell.style.textAlign = 'center';
                cell.style.fontStyle = 'italic';
                cell.textContent = 'No target patterns detected.';
                row.appendChild(cell);
                keyTableBody.appendChild(row);
                return;
            }
            vaultMap.forEach((original, token) => {
                const row = document.createElement('tr');
                const tokenCell = document.createElement('td');
                const originalCell = document.createElement('td');
                tokenCell.textContent = token;
                originalCell.textContent = original;
                row.append(tokenCell, originalCell);
                keyTableBody.appendChild(row);
            });
        }

        // exports
        function triggerDownload(blob, filename) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url); }

        function escapeHtml(value) {
            return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
        }

        function createTextPdf(filename, title, content, options = {}) {
            const JsPDF = window.jspdf?.jsPDF;
            if (!JsPDF) {
                setWorkspaceMessage('PDF Export Unavailable', 'The PDF library did not load. Please check your connection and try again.');
                return false;
            }
            const doc = new JsPDF({
                unit: 'pt',
                format: 'letter',
                encryption: options.password ? {
                    userPassword: options.password,
                    ownerPassword: `${options.password}-owner`,
                    userPermissions: ['print', 'copy']
                } : undefined
            });
            const margin = 48;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            let y = margin;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text(title, margin, y);
            y += 28;
            doc.setFont('courier', 'normal');
            doc.setFontSize(10);
            const lines = doc.splitTextToSize(content || 'No output available.', pageWidth - margin * 2);
            lines.forEach(line => {
                if (y > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                }
                doc.text(line, margin, y);
                y += 14;
            });
            doc.save(filename);
            return true;
        }

        function showFeedbackPrompt() {
            if (!notificationManager.modalContainer) return;
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="card glass-panel modal-content">
                    <h3>Export Complete</h3>
                    <p style="font-size: 0.95rem; color: var(--cypher-text-secondary); margin-bottom: 1rem;">Write quick feedback, or cancel to start a new text.</p>
                    <textarea class="text-input feedback-text" style="min-height: 120px;" placeholder="What should AiScrubber improve next?"></textarea>
                    <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:1rem;">
                        <button class="btn btn-secondary feedback-cancel">Cancel</button>
                        <button class="btn btn-primary feedback-submit">Submit Feedback</button>
                    </div>
                </div>
            `;
            notificationManager.modalContainer.appendChild(modal);
            const finish = (saveFeedback) => {
                const feedback = modal.querySelector('.feedback-text').value.trim().slice(0, 1000);
                if (saveFeedback && feedback) {
                    const history = JSON.parse(localStorage.getItem(feedbackKey) || '[]');
                    history.push({ feedback, createdAt: new Date().toISOString() });
                    localStorage.setItem(feedbackKey, JSON.stringify(history));
                }
                modal.remove();
                resetWorkspace();
            };
            modal.querySelector('.feedback-cancel').addEventListener('click', () => finish(false));
            modal.querySelector('.feedback-submit').addEventListener('click', () => finish(true));
        }

        function completeExport() {
            saveWorkspaceState();
            showFeedbackPrompt();
        }

        document.getElementById('copyBtn').addEventListener('click', async (e) => {
            try {
                await navigator.clipboard.writeText(outputText.textContent);
                const btn = e.target;
                const original = btn.innerHTML;
                btn.innerHTML = 'Copied';
                setTimeout(() => btn.innerHTML = original, 1800);
            } catch (err) {
                setWorkspaceMessage('Copy Failed', 'The browser blocked clipboard access. Please select and copy the output manually.');
            }
        });

        document.getElementById('downloadTxtBtn').addEventListener('click', () => {
            triggerDownload(new Blob([outputText.textContent], { type: 'text/plain;charset=utf-8' }), 'AiScrubber_Sanitized.txt');
            completeExport();
        });

        document.getElementById('downloadDocxBtn').addEventListener('click', () => {
            const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Sanitized Document</title></head><body>";
            const footer = '</body></html>';
            const htmlContent = escapeHtml(outputText.textContent).replace(/\n/g, '<br>');
            const blob = new Blob(['\ufeff', header + htmlContent + footer], { type: 'application/msword' });
            triggerDownload(blob, 'AiScrubber_Sanitized.doc');
            completeExport();
        });

        document.getElementById('downloadPdfBtn').addEventListener('click', () => {
            if (createTextPdf('AiScrubber_Sanitized.pdf', 'AiScrubber Sanitized Output', outputText.textContent)) completeExport();
        });

        // encrypted vault
        const passwordModal = document.getElementById('passwordModal');
        const vaultPasswordInput = document.getElementById('vaultPassword');
        const passwordError = document.getElementById('passwordError');
        const confirmVaultPdfBtn = document.getElementById('confirmVaultPdfBtn');
        const passwordRules = document.getElementById('passwordRules');
        const strictPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}$/;

        function getPasswordChecks(password) {
            return {
                length: password.length >= 10,
                upper: /[A-Z]/.test(password),
                lower: /[a-z]/.test(password),
                number: /\d/.test(password),
                special: /[^A-Za-z\d]/.test(password)
            };
        }

        function updatePasswordRules() {
            const checks = getPasswordChecks(vaultPasswordInput.value);
            Object.entries(checks).forEach(([rule, valid]) => {
                const item = passwordRules?.querySelector(`[data-rule="${rule}"]`);
                if (item) item.classList.toggle('valid', valid);
            });
            return Object.values(checks).every(Boolean);
        }

        vaultPasswordInput.addEventListener('input', () => {
            passwordError.style.display = 'none';
            updatePasswordRules();
        });

        document.getElementById('openVaultExportBtn').addEventListener('click', () => {
            if (currentVaultMap.size === 0) { setWorkspaceMessage('Empty Vault', 'There is no data in the vault to encrypt. Please scrub some text first.'); return; }
            if (passwordModal) { passwordModal.classList.remove('hidden'); vaultPasswordInput.value = ''; passwordError.style.display = 'none'; updatePasswordRules(); }
        });

        document.getElementById('cancelExportBtn').addEventListener('click', () => { if (passwordModal) passwordModal.classList.add('hidden'); });

        document.getElementById('confirmExportBtn').addEventListener('click', () => {
            const pwd = vaultPasswordInput.value; if (!strictPasswordRegex.test(pwd) || !updatePasswordRules()) { passwordError.style.display = 'block'; return; }
            const vaultObj = Object.fromEntries(currentVaultMap); const vaultJson = JSON.stringify(vaultObj);
            try {
                if (typeof CryptoJS === 'undefined') { setWorkspaceMessage('Encryption Unavailable', 'The encryption library did not load. Please check your connection and try again.'); return; }
                const encrypted = CryptoJS.AES.encrypt(vaultJson, pwd).toString();
                const blob = new Blob([encrypted], { type: 'text/plain;charset=utf-8' });
                triggerDownload(blob, 'AiScrubber_Vault_AES256.enc');
                if (passwordModal) passwordModal.classList.add('hidden');
                completeExport();
            } catch (err) {
                console.error('Encryption Failure', err);
                setWorkspaceMessage('Encryption Failed', 'A critical error occurred during vault encryption.');
            }
        });

        confirmVaultPdfBtn.addEventListener('click', () => {
            const pwd = vaultPasswordInput.value; if (!strictPasswordRegex.test(pwd) || !updatePasswordRules()) { passwordError.style.display = 'block'; return; }
            const vaultObj = Object.fromEntries(currentVaultMap);
            const content = JSON.stringify(vaultObj, null, 2);
            if (createTextPdf('AiScrubber_Protected_Vault.pdf', 'AiScrubber Password Protected Vault', content, { password: pwd })) {
                if (passwordModal) passwordModal.classList.add('hidden');
                completeExport();
            }
        });

        function resetWorkspace() {
            inputText.value = ''; step2.classList.remove('active'); step1.classList.add('active'); currentVaultMap.clear(); keyTableBody.innerHTML = ''; outputText.textContent = '';
            clearWorkspaceState();
        }

        document.getElementById('resetBtn').addEventListener('click', resetWorkspace);
    }

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // â”€â”€â”€ CONFETTI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    window.fireConfetti = function() { if (typeof confetti !== 'undefined') { confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); } };

});



