const khairullah = (function () {
  let currentLang = document.documentElement.lang || "en";
  let translations = null;
  let currentAlertType = null;

  const alertConfig = {
    normal: { timeout: 3000, color: "#6c757d", icon: "" },
    success: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    error: {
      timeout: 3000,
      color: "#dc3545",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
    },
    warning: {
      timeout: 3000,
      color: "#ffc107",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2"><path d="M12 2L2 19h20L12 2zm0 4v8m0 4h0"/></svg>`,
    },
    info: {
      timeout: 3000,
      color: "#17a2b8",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h0"/></svg>`,
    },
    confirm: {
      timeout: null,
      color: "#3085d6",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#3085d6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16h0m0-4v4m0-8h0"/></svg>`,
    },
    delete: {
      timeout: null,
      color: "#c82333",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#c82333" stroke-width="2"><path d="M3 6h18M5 6v14a2 2 0 002 2h10a2 2 0 002-2V6m-7 0V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/></svg>`,
    },
    confirmDelete: {
      timeout: null,
      color: "#c82333",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#c82333" stroke-width="2"><path d="M3 6h18M5 6v14a2 2 0 002 2h10a2 2 0 002-2V6m-7 0V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/></svg>`,
    },
    save: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM7 3v6h6m4 12v-8h-8v8h8z"/></svg>`,
    },
    load: {
      timeout: 3000,
      color: "#6f42c1",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6f42c1" stroke-width="2"><path d="M12 2v4m0 12v4m-6-14l2.5 2.5M18 6l-2.5 2.5M6 18l2.5-2.5m7.5-2.5L18 15"/></svg>`,
    },
    upload: {
      timeout: 3000,
      color: "#17a2b8",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5-5 5m5-5v12"/></svg>`,
    },
    download: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5 5-5-5m5 5v-12"/></svg>`,
    },
    timeout: {
      timeout: 3000,
      color: "#fd7e14",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#fd7e14" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    },
    login: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-6-4l4-4-4-4m4 4H3"/></svg>`,
    },
    logout: {
      timeout: 3000,
      color: "#6c757d",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m6 4l4 4-4 4m-4-4H21"/></svg>`,
    },
    limit: {
      timeout: 3000,
      color: "#dc3545",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M12 2a10 10 0 00-10 10h20A10 10 0 0012 2zM2 12h20"/></svg>`,
    },
    network: {
      timeout: 3000,
      color: "#dc3545",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M1 5h22M5 10h14M9 15h6"/></svg>`,
    },
    update: {
      timeout: 3000,
      color: "#3085d6",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#3085d6" stroke-width="2"><path d="M23 4v6h-6m-1 10a10 10 0 01-20 0 10 10 0 0120-2m-5-16v6h6"/></svg>`,
    },
    attention: {
      timeout: null,
      color: "#e83e8c",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#e83e8c" stroke-width="2"><path d="M12 2L2 19h20L12 2zm0 4v8m0 4h0"/></svg>`,
    },
    permission: {
      timeout: 3000,
      color: "#dc3545",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 4v6m0 4h0"/></svg>`,
    },
    retry: {
      timeout: 3000,
      color: "#fd7e14",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#fd7e14" stroke-width="2"><path d="M17 1l4 4-4 4m-4 12a10 10 0 01-20 0 10 10 0 0120-2m-5-16l-4-4 4-4"/></svg>`,
    },
    submitted: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zm-7-4l-3-3 1.5-1.5L12 14l5-5 1.5 1.5-6.5 6.5z"/></svg>`,
    },
    question: {
      timeout: null,
      color: "#6c757d",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3m0 4h0"/></svg>`,
    },
    processing: {
      timeout: 3000,
      color: "#6f42c1",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6f42c1" stroke-width="2"><path d="M12 2v4m0 12v4m-6-14l2.5 2.5M18 6l-2.5 2.5M6 18l2.5-2.5m7.5-2.5L18 15"/></svg>`,
    },
    cancelled: {
      timeout: 3000,
      color: "#6c757d",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
    },
    blocked: {
      timeout: 3000,
      color: "#dc3545",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm-7 7h14"/></svg>`,
    },
    notification: {
      timeout: 3000,
      color: "#17a2b8",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9m-4 11a2 2 0 11-4 0"/></svg>`,
    },
    basic: { timeout: 3000, color: "#6c757d", icon: "" },
    titleText: {
      timeout: 3000,
      color: "#6c757d",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3m0 4h0"/></svg>`,
    },
    errorFooter: {
      timeout: 3000,
      color: "#dc3545",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
    },
    longContent: { timeout: 3000, color: "#6c757d", icon: "" },
    draggable: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    customHtml: {
      timeout: null,
      color: "#17a2b8",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h0"/></svg>`,
    },
    threeButtons: {
      timeout: null,
      color: "#3085d6",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#3085d6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16h0m0-4v4m0-8h0"/></svg>`,
    },
    topEnd: {
      timeout: 1500,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    customAnim: { timeout: 3000, color: "#6c757d", icon: "" },
    confirmDeleteFn: {
      timeout: null,
      color: "#ffc107",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2"><path d="M12 2L2 19h20L12 2zm0 4v8m0 4h0"/></svg>`,
    },
    bootstrap: {
      timeout: null,
      color: "#3085d6",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#3085d6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16h0m0-4v4m0-8h0"/></svg>`,
    },
    customImage: { timeout: 3000, color: "#6c757d", icon: "" },
    customStyle: { timeout: 3000, color: "#716add", icon: "" },
    timer: { timeout: 2000, color: "#6c757d", icon: "" },
    rtl: {
      timeout: null,
      color: "#3085d6",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#3085d6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3m0 4h0"/></svg>`,
    },
    ajax: {
      timeout: null,
      color: "#3085d6",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#3085d6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16h0m0-4v4m0-8h0"/></svg>`,
    },
  };

  function initDOM() {
    const backdrop = document.createElement("div");
    backdrop.className = "alert-backdrop";
    backdrop.id = "alertBackdrop";
    document.body.appendChild(backdrop);

    const alertBox = document.createElement("div");
    alertBox.className = "alert-box";
    alertBox.id = "alertBox";
    alertBox.setAttribute("role", "alertdialog");
    alertBox.setAttribute("aria-labelledby", "alertTitle");
    alertBox.setAttribute("aria-describedby", "alertText");
    alertBox.innerHTML = `
      <div id="alertIcon"></div>
      <h3 id="alertTitle"></h3>
      <p id="alertText"></p>
      <div id="alertContent"></div>
      <div class="buttons" id="alertButtons"></div>
      <div id="alertFooter"></div>
    `;
    document.body.appendChild(alertBox);

    // Draggable functionality
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    alertBox.addEventListener("mousedown", (e) => {
      if (e.target === alertBox || e.target.id === "alertTitle") {
        isDragging = true;
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
      }
    });
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        alertBox.style.left = currentX + "px";
        alertBox.style.top = currentY + "px";
        alertBox.style.transform = "none";
      }
    });
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  async function loadTranslations() { 
    try {
      const response = await fetch("https://cdn.jsdelivr.net/gh/Sahil3044/khairullahAlert@main/translations.json");
      if (!response.ok) throw new Error("Failed to load translations");
      translations = await response.json();
      setLanguage(currentLang);
    } catch (error) {
      console.error("Alert: Failed to load translations.", error);
      translations = {
        alerts: {},
        buttons: {
          en: {
            ok: "OK",
            confirm: "Confirm",
            cancel: "Cancel",
            deny: "Deny",
            save: "Save",
            dontSave: "Don't save",
            yesDelete: "Yes, delete it!",
            noCancel: "No, cancel!",
            lookup: "Look up",
          },
          ps: {
            ok: "سمه ده",
            confirm: "تایید",
            cancel: "لغوه",
            deny: "رد کول",
            save: "ثبت کړئ",
            dontSave: "مه ثبتوئ",
            yesDelete: "هو، حذف یې کړئ!",
            noCancel: "نه، لغوه کړئ!",
            lookup: "پلټنه",
          },
          fa: {
            ok: "تأیید",
            confirm: "تأیید",
            cancel: "لغو",
            deny: "رد",
            save: "ذخیره",
            dontSave: "ذخیره نکن",
            yesDelete: "بله، حذفش کن!",
            noCancel: "خیر، لغو کن!",
            lookup: "جستجو",
          },
        },
      };
      setLanguage("en");
    }
  }

  function setLanguage(lang) {
    if (translations && translations.buttons[lang]) {
      currentLang = lang;
      document.documentElement.lang = lang;
      document.documentElement.dir =
        lang === "fa" || lang === "ps" ? "rtl" : "ltr";
      if (
        currentAlertType &&
        document.getElementById("alertBox").style.display === "block"
      ) {
        fire({ type: currentAlertType });
      }
    } else {
      currentLang = "en";
      document.documentElement.dir = "ltr";
    }
  }

  function fire(options = {}) {
    return new Promise(async (resolve) => {
      if (!translations) {
        resolve({ isConfirmed: false, isDenied: false, dismiss: "error" });
        return;
      }
      const {
        type = "error",
        title,
        text,
        html,
        icon,
        position = "center",
        timer,
        showCancelButton = type === "confirm" ||
          type === "delete" ||
          type === "question" ||
          type === "attention" ||
          type === "confirmDelete" ||
          type === "bootstrap" ||
          type === "threeButtons" ||
          type === "customHtml" ||
          type === "confirmDeleteFn" ||
          type === "rtl" ||
          type === "ajax",
        showDenyButton = type === "confirm" ||
          type === "confirmDelete" ||
          type === "threeButtons" ||
          type === "customHtml",
        showCloseButton = type === "customHtml" || type === "rtl",
        confirmButtonText = translations.buttons[currentLang].confirm,
        cancelButtonText = translations.buttons[currentLang].cancel,
        denyButtonText = translations.buttons[currentLang].deny,
        confirmButtonColor = "#3085d6",
        cancelButtonColor = "#d33",
        focusConfirm = true,
        footer,
        imageUrl,
        imageWidth,
        imageHeight,
        imageAlt,
        width = 400,
        padding = "20px",
        background = "#fff",
        color,
        backdropColor = "rgba(0,0,0,0.5)",
        draggable = type === "draggable",
        input,
        inputAttributes = {},
        preConfirm,
        showLoaderOnConfirm = type === "ajax",
        showConfirmButton = type !== "topEnd",
        timerProgressBar = type === "timer",
        reverseButtons = type === "bootstrap",
        didOpen,
      } = options;
      currentAlertType = type;
      const config = alertConfig[type] || alertConfig["error"];
      const msg =
        title && text
          ? { title, text }
          : translations.alerts[type]?.[currentLang] ||
            translations.alerts["error"][currentLang];

      const box = document.getElementById("alertBox");
      const backdrop = document.getElementById("alertBackdrop");
      box.style.display = "none";
      clearTimeout(box.timeoutId);
      box.className = `alert-box ${type} ${
        position === "top-end" ? "top-right" : ""
      }`;
      box.style.width = width + "px";
      box.style.padding = padding;
      box.style.background = background;
      box.style.color = color || "#222";
      backdrop.style.background = backdrop;
      if (draggable) {
        box.style.position = "absolute";
        currentX = window.innerWidth / 2 - width / 2;
        currentY = window.innerHeight / 2 - box.offsetHeight / 2;
        box.style.left = currentX + "px";
        box.style.top = currentY + "px";
        box.style.transform = "none";
      } else {
        box.style.position = "fixed";
        box.style.left = position === "top-end" ? "auto" : "50%";
        box.style.top = position === "top-end" ? "20px" : "50%";
        box.style.right = position === "top-end" ? "20px" : "auto";
        box.style.transform =
          position === "top-end" ? "translate(0, 0)" : "translate(-50%, -50%)";
      }

      document.getElementById("alertTitle").innerHTML = title || msg.title;
      document.getElementById("alertText").innerHTML = text || msg.text;
      document.getElementById("alertIcon").innerHTML = imageUrl
        ? `<img src="${imageUrl}" alt="${imageAlt || "Image"}" style="width:${
            imageWidth || "auto"
          };height:${imageHeight || "auto"};max-width:100%;">`
        : icon || config.icon;
      document.getElementById("alertContent").innerHTML = html || "";
      document.getElementById("alertFooter").innerHTML = footer || "";

      const buttonsDiv = document.getElementById("alertButtons");
      buttonsDiv.innerHTML = "";

      if (input) {
        const inputEl = document.createElement(
          input === "text" ? "input" : input
        );
        inputEl.id = "alertInput";
        Object.keys(inputAttributes).forEach((attr) =>
          inputEl.setAttribute(attr, inputAttributes[attr])
        );
        inputEl.style.width = "100%";
        inputEl.style.marginBottom = "10px";
        document.getElementById("alertContent").appendChild(inputEl);
      }

      if (showCloseButton) {
        const closeBtn = document.createElement("button");
        closeBtn.className = "alert-close-btn";
        closeBtn.innerHTML = "×";
        closeBtn.onclick = () =>
          close({ isConfirmed: false, isDenied: false, dismiss: "close" });
        box.appendChild(closeBtn);
      }

      if (reverseButtons) {
        if (showConfirmButton) {
          const confirmBtn = document.createElement("button");
          confirmBtn.className = "alert-confirm-btn";
          confirmBtn.innerHTML = confirmButtonText;
          confirmBtn.style.background = confirmButtonColor;
          confirmBtn.onclick = async () => {
            if (preConfirm && input) {
              confirmBtn.disabled = true;
              if (showLoaderOnConfirm) {
                confirmBtn.innerHTML = '<span class="loader"></span>';
              }
              try {
                const value = document.getElementById("alertInput").value;
                const result = await preConfirm(value);
                if (result && result.error) {
                  document.getElementById("alertText").innerHTML = result.error;
                  confirmBtn.disabled = false;
                  confirmBtn.innerHTML = confirmButtonText;
                  return;
                }
                close({ isConfirmed: true, value: result });
              } catch (error) {
                document.getElementById(
                  "alertText"
                ).innerHTML = `Request failed: ${error}`;
                confirmBtn.disabled = false;
                confirmBtn.innerHTML = confirmButtonText;
              }
            } else {
              close({ isConfirmed: true, isDenied: false });
            }
          };
          buttonsDiv.appendChild(confirmBtn);
        }

        if (showCancelButton) {
          const cancelBtn = document.createElement("button");
          cancelBtn.className = "alert-cancel-btn";
          cancelBtn.innerText = cancelButtonText;
          cancelBtn.style.background = cancelButtonColor;
          cancelBtn.onclick = () =>
            close({ isConfirmed: false, isDenied: false, dismiss: "cancel" });
          buttonsDiv.appendChild(cancelBtn);
        }

        if (showDenyButton) {
          const denyBtn = document.createElement("button");
          denyBtn.className = "alert-deny-btn";
          denyBtn.innerText = denyButtonText;
          denyBtn.style.background = "#6c757d";
          denyBtn.onclick = () =>
            close({ isConfirmed: false, isDenied: true, dismiss: "deny" });
          buttonsDiv.appendChild(denyBtn);
        }
      } else {
        if (showDenyButton) {
          const denyBtn = document.createElement("button");
          denyBtn.className = "alert-deny-btn";
          denyBtn.innerText = denyButtonText;
          denyBtn.style.background = "#6c757d";
          denyBtn.onclick = () =>
            close({ isConfirmed: false, isDenied: true, dismiss: "deny" });
          buttonsDiv.appendChild(denyBtn);
        }

        if (showCancelButton) {
          const cancelBtn = document.createElement("button");
          cancelBtn.className = "alert-cancel-btn";
          cancelBtn.innerText = cancelButtonText;
          cancelBtn.style.background = cancelButtonColor;
          cancelBtn.onclick = () =>
            close({ isConfirmed: false, isDenied: false, dismiss: "cancel" });
          buttonsDiv.appendChild(cancelBtn);
        }

        if (showConfirmButton) {
          const confirmBtn = document.createElement("button");
          confirmBtn.className = "alert-confirm-btn";
          confirmBtn.innerHTML = confirmButtonText;
          confirmBtn.style.background = confirmButtonColor;
          confirmBtn.onclick = async () => {
            if (preConfirm && input) {
              confirmBtn.disabled = true;
              if (showLoaderOnConfirm) {
                confirmBtn.innerHTML = '<span class="loader"></span>';
              }
              try {
                const value = document.getElementById("alertInput").value;
                const result = await preConfirm(value);
                if (result && result.error) {
                  document.getElementById("alertText").innerHTML = result.error;
                  confirmBtn.disabled = false;
                  confirmBtn.innerHTML = confirmButtonText;
                  return;
                }
                close({ isConfirmed: true, value: result });
              } catch (error) {
                document.getElementById(
                  "alertText"
                ).innerHTML = `Request failed: ${error}`;
                confirmBtn.disabled = false;
                confirmBtn.innerHTML = confirmButtonText;
              }
            } else {
              close({ isConfirmed: true, isDenied: false });
            }
          };
          buttonsDiv.appendChild(confirmBtn);
        }
      }

      box.style.display = "block";
      backdrop.style.display = position === "top-end" ? "none" : "block";
      box.classList.add("show");
      backdrop.classList.add("show");

      const focusBtn = focusConfirm
        ? ".alert-confirm-btn"
        : ".alert-cancel-btn";
      buttonsDiv.querySelector(focusBtn)?.focus();
      box.resolve = resolve;

      if (timerProgressBar) {
        const progress = document.createElement("div");
        progress.className = "timer-progress";
        box.appendChild(progress);
        let timeLeft = timer;
        const interval = setInterval(() => {
          timeLeft -= 10;
          progress.style.width = (timeLeft / timer) * 100 + "%";
          if (timeLeft <= 0) clearInterval(interval);
        }, 10);
        if (didOpen) {
          didOpen();
        }
      }

      const timeout = timer || config.timeout;
      if (timeout) {
        box.timeoutId = setTimeout(
          () =>
            close({ isConfirmed: false, isDenied: false, dismiss: "timer" }),
          timeout
        );
      }

      function close(result = {}) {
        box.classList.remove("show");
        box.classList.add("hide");
        backdrop.classList.remove("show");
        setTimeout(() => {
          box.style.display = "none";
          backdrop.style.display = "none";
          box.classList.remove("hide", "top-right");
          currentAlertType = null;
          if (box.querySelector(".alert-close-btn"))
            box.removeChild(box.querySelector(".alert-close-btn"));
          if (box.querySelector(".timer-progress"))
            box.removeChild(box.querySelector(".timer-progress"));
        }, 300);
        clearTimeout(box.timeoutId);
        if (typeof box.resolve === "function") {
          box.resolve(result);
        }
      }
    });
  }

  initDOM();
  loadTranslations();

  return { fire, setLanguage };
})();

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    document.getElementById("alertBox").style.display === "block"
  ) {
    document
      .getElementById("alertButtons")
      .querySelector(".alert-cancel-btn")
      ?.click();
  }
});
 
