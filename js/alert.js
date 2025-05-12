const khairullah = (function () {
  let currentLang = document.documentElement.lang || 'en';
  let translations = null;
  let currentAlertType = null;

  const alertConfig = {
    success: { timeout: 3000, color: '#28a745', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>` },
    error: { timeout: 3000, color: '#dc3545', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>` },
    warning: { timeout: 3000, color: '#ffc107', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2"><path d="M12 2L2 19h20L12 2zm0 4v8m0 4h0"/></svg>` },
    info: { timeout: 3000, color: '#17a2b8', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h0"/></svg>` },
    confirm: { timeout: null, color: '#3085d6', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#3085d6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16h0m0-4v4m0-8h0"/></svg>` },
    delete: { timeout: null, color: '#c82333', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#c82333" stroke-width="2"><path d="M3 6h18M5 6v14a2 2 0 002 2h10a2 2 0 002-2V6m-7 0V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/></svg>` },
    save: { timeout: 3000, color: '#28a745', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM7 3v6h6m4 12v-8h-8v8h8z"/></svg>` },
    load: { timeout: 3000, color: '#6f42c1', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6f42c1" stroke-width="2"><path d="M12 2v4m0 12v4m-6-14l2.5 2.5M18 6l-2.5 2.5M6 18l2.5-2.5m7.5-2.5L18 15"/></svg>` },
    upload: { timeout: 3000, color: '#17a2b8', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5-5 5m5-5v12"/></svg>` },
    download: { timeout: 3000, color: '#28a745', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5 5-5-5m5 5v-12"/></svg>` },
    timeout: { timeout: 3000, color: '#fd7e14', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#fd7e14" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>` },
    login: { timeout: 3000, color: '#28a745', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-6-4l4-4-4-4m4 4H3"/></svg>` },
    logout: { timeout: 3000, color: '#6c757d', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m6 4l4 4-4 4m-4-4H21"/></svg>` },
    limit: { timeout: 3000, color: '#dc3545', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M12 2a10 10 0 00-10 10h20A10 10 0 0012 2zM2 12h20"/></svg>` },
    network: { timeout: 3000, color: '#dc3545', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M1 5h22M5 10h14M9 15h6"/></svg>` },
    update: { timeout: 3000, color: '#3085d6', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#3085d6" stroke-width="2"><path d="M23 4v6h-6m-1 10a10 10 0 01-20 0 10 10 0 0120-2m-5-16v6h6"/></svg>` },
    attention: { timeout: null, color: '#e83e8c', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#e83e8c" stroke-width="2"><path d="M12 2L2 19h20L12 2zm0 4v8m0 4h0"/></svg>` },
    permission: { timeout: 3000, color: '#dc3545', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 4v6m0 4h0"/></svg>` },
    retry: { timeout: 3000, color: '#fd7e14', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#fd7e14" stroke-width="2"><path d="M17 1l4 4-4 4m-4 12a10 10 0 01-20 0 10 10 0 0120-2m-5-16l-4-4 4-4"/></svg>` },
    submitted: { timeout: 3000, color: '#28a745', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zm-7-4l-3-3 1.5-1.5L12 14l5-5 1.5 1.5-6.5 6.5z"/></svg>` },
    question: { timeout: null, color: '#6c757d', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3m0 4h0"/></svg>` },
    processing: { timeout: 3000, color: '#6f42c1', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6f42c1" stroke-width="2"><path d="M12 2v4m0 12v4m-6-14l2.5 2.5M18 6l-2.5 2.5M6 18l2.5-2.5m7.5-2.5L18 15"/></svg>` },
    cancelled: { timeout: 3000, color: '#6c757d', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>` },
    blocked: { timeout: 3000, color: '#dc3545', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm-7 7h14"/></svg>` },
    notification: { timeout: 3000, color: '#17a2b8', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9m-4 11a2 2 0 11-4 0"/></svg>` },
  };

  function initDOM() {
    const backdrop = document.createElement('div');
    backdrop.className = 'alert-backdrop';
    backdrop.id = 'alertBackdrop';
    document.body.appendChild(backdrop);

    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.id = 'alertBox';
    alertBox.setAttribute('role', 'alertdialog');
    alertBox.setAttribute('aria-labelledby', 'alertTitle');
    alertBox.setAttribute('aria-describedby', 'alertText');
    alertBox.innerHTML = `
      <div id="alertIcon"></div>
      <h3 id="alertTitle"></h3>
      <p id="alertText"></p>
      <div class="buttons" id="alertButtons"></div>
    `;
    document.body.appendChild(alertBox);
  }

  async function loadTranslations() {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/gh/Sahil3044/khairullahAlert@latest/translations.json');      if (!response.ok) throw new Error('Failed to load translations');
      translations = await response.json();
      setLanguage(currentLang);
    } catch (error) {
      console.error('Alert: Failed to load translations.', error);
      translations = { alerts: {}, buttons: { en: { ok: 'OK', confirm: 'Confirm', cancel: 'Cancel' } } };
      setLanguage('en');
    }
  }

  function setLanguage(lang) {
    if (translations && translations.buttons[lang]) {
      currentLang = lang;
      if (currentAlertType && document.getElementById('alertBox').style.display === 'block') {
        fire({ type: currentAlertType });
      }
    } else {
      currentLang = 'en';
    }
  }

  function fire(options = {}) {
    return new Promise((resolve) => {
      if (!translations) {
        resolve({ isConfirmed: false, dismiss: 'error' });
        return;
      }
      const {
        type = 'error',
        title,
        text,
        position = 'center',
        timer,
        showCancelButton = type === 'confirm' || type === 'delete' || type === 'question' || type === 'attention',
        confirmButtonText = translations.buttons[currentLang].confirm,
        cancelButtonText = translations.buttons[currentLang].cancel,
      } = options;
      currentAlertType = type;
      const config = alertConfig[type] || alertConfig['error'];
      const msg = title && text ? { title, text } : (translations.alerts[type]?.[currentLang] || translations.alerts['error']['en']);

      const box = document.getElementById('alertBox');
      const backdrop = document.getElementById('alertBackdrop');
      box.style.display = 'none';
      clearTimeout(box.timeoutId);
      box.className = `alert-box ${type} ${position === 'top-right' ? 'top-right' : ''}`;
      document.getElementById('alertTitle').innerText = msg.title;
      document.getElementById('alertText').innerText = msg.text;
      document.getElementById('alertIcon').innerHTML = config.icon;

      const buttonsDiv = document.getElementById('alertButtons');
      buttonsDiv.innerHTML = '';

      if (showCancelButton) {
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'alert-cancel-btn';
        cancelBtn.innerText = cancelButtonText;
        cancelBtn.onclick = () => close({ isConfirmed: false, dismiss: 'cancel' });
        buttonsDiv.appendChild(cancelBtn);
      }

      const confirmBtn = document.createElement('button');
      confirmBtn.className = 'alert-confirm-btn';
      confirmBtn.innerText = confirmButtonText;
      confirmBtn.onclick = () => close({ isConfirmed: true });
      buttonsDiv.appendChild(confirmBtn);

      box.style.display = 'block';
      backdrop.style.display = position === 'top-right' ? 'none' : 'block';
      box.classList.remove('hide');
      box.classList.add('show');
      backdrop.classList.add('show');

      buttonsDiv.querySelector('button').focus();
      box.resolve = resolve;

      const timeout = timer || config.timeout;
      if (timeout) {
        box.timeoutId = setTimeout(() => close({ isConfirmed: true }), timeout);
      }
    });

    function close(result = {}) {
      const box = document.getElementById('alertBox');
      const backdrop = document.getElementById('alertBackdrop');
      box.classList.remove('show');
      box.classList.add('hide');
      backdrop.classList.remove('show');
      setTimeout(() => {
        box.style.display = 'none';
        backdrop.style.display = 'none';
        box.classList.remove('hide', 'top-right');
        currentAlertType = null;
      }, 300);
      clearTimeout(box.timeoutId);
      if (typeof box.resolve === 'function') {
        box.resolve(result);
      }
    }
  }

  initDOM();
  loadTranslations();

  return { fire, setLanguage };
})();

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('alertBox').style.display === 'block') {
    document.getElementById('alertButtons').querySelector('.alert-cancel-btn')?.click();
  }
});
