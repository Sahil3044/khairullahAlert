const khairullah = (function () {
  let currentLang = getPreferredLanguage();
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
    confirmSuccess: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    confirmInfo: {
      timeout: 3000,
      color: "#17a2b8",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h0"/></svg>`,
    },
    confirmCancelled: {
      timeout: 3000,
      color: "#6c757d",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
    },
    deleteSuccess: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    deleteCancelled: {
      timeout: 3000,
      color: "#6c757d",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
    },
    confirmDeleteSuccess: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    confirmDeleteInfo: {
      timeout: 3000,
      color: "#17a2b8",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h0"/></svg>`,
    },
    threeButtonsSuccess: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    threeButtonsInfo: {
      timeout: 3000,
      color: "#17a2b8",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h0"/></svg>`,
    },
    confirmDeleteFnSuccess: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    ajaxSuccess: {
      timeout: 3000,
      color: "#28a745",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
    },
    ajaxError: {
      timeout: 3000,
      color: "#dc3545",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
    },
  };

  function getPreferredLanguage() {
    // Check global config (window.khairullahConfig.lang)
    const configLang = window.khairullahConfig?.lang;
    if (configLang && ["en", "ps", "fa"].includes(configLang)) {
      return configLang;
    }

    // Check stored language preference in localStorage
    const storedLang = localStorage.getItem("preferredLanguage");
    if (storedLang && ["en", "ps", "fa"].includes(storedLang)) {
      return storedLang;
    }

    // Check document language
    const docLang = document.documentElement.lang;
    if (docLang && ["en", "ps", "fa"].includes(docLang)) {
      return docLang;
    }

    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const simplifiedLang = browserLang ? browserLang.split("-")[0] : null;
    if (simplifiedLang && ["en", "ps", "fa"].includes(simplifiedLang)) {
      return simplifiedLang;
    }

    // Default to English
    return "en";
  }

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
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/Sahil3044/khairullahAlert@main/translations.json"
      );
      if (!response.ok) throw new Error("Failed to load translations");
      translations = await response.json();
      setLanguage(currentLang);
    } catch (error) {
      console.error("Alert: Failed to load translations.", error);
      translations = {
        alerts: {
          normal: {
            en: { title: "Alert", text: "You are information updated!" },
            ps: { title: "خبرتیا", text: "ستاسو معلومات آپډیټ یعنی تازه شول!" },
            fa: { title: "هشدار", text: "معلومات سما آپډیټ ګردید!" },
          },
          success: {
            en: { title: "Good job!", text: "action succsed!" },
            ps: { title: "ښه کار!", text: "کار په بریالیتوب سره وشوو!" },
            fa: { title: "آفرین!", text: "کار انجام شد!" },
          },
          error: {
            en: { title: "Oops...", text: "Something went wrong!" },
            ps: { title: "اوپس...", text: "یو څه غلط شول!" },
            fa: { title: "اوه...", text: "مشکلی پیش آمد!" },
          },
          warning: {
            en: { title: "Warning", text: "Check your input." },
            ps: { title: "خبرتیا", text: "خپل ننوتنه(انپوټ) وګورئ." },
            fa: { title: "هشدار", text: "ورودی خود را بررسی کنید." },
          },
          info: {
            en: { title: "Info", text: "Here is some info." },
            ps: { title: "معلومات", text: "دلته ځینې معلومات شته." },
            fa: { title: "اطلاعات", text: "اینجا اطلاعاتی است." },
          },
          confirm: {
            en: {
              title: "Do you want to save the changes?",
              text: "Changes will be saved permanently.",
            },
            ps: {
              title: "ایا تاسو غواړئ تغیرات ثبت کړئ؟",
              text: "تغیرات به د همیشه لپاره ذخیره شې.",
            },
            fa: {
              title: "آیا می‌خواهید تغییرات را ذخیره کنید؟",
              text: "تغییرات به طور دائم ذخیره خواهند شد.",
            },
          },
          delete: {
            en: {
              title: "Are you sure?",
              text: "You won't be able to revert this!",
            },
            ps: {
              title: "ایا تاسو یقیني یاست؟",
              text: "تاسو به دا بیرته تر لاسه نکړې!",
            },
            fa: {
              title: "آیا مطمئن هستید؟",
              text: "شما نمی‌توانید این را بازگردانید!",
            },
          },
          confirmDelete: {
            en: { title: "Confirm Delete", text: "Really delete this item?" },
            ps: { title: "د حذف تاییدول", text: "آیا واقعاً دا حذف کړم؟" },
            fa: { title: "تأیید حذف", text: "واقعاً این مورد را حذف کنید؟" },
          },
          save: {
            en: { title: "Saved", text: "Data saved successfully." },
            ps: { title: "ثبت شو", text: "معلومات په بریالیتوب سره ثبت شول." },
            fa: { title: "ذخیره شد", text: "داده‌ها با موفقیت ذخیره شدند." },
          },
          load: {
            en: { title: "Loading", text: "Please wait..." },
            ps: { title: "پورته کول", text: "مهرباني وکړئ لږ انتظار وکړئ..." },
            fa: { title: "بارگذاری", text: "لطفاً صبر کنید..." },
          },
          upload: {
            en: { title: "Uploading", text: "File uploading..." },
            ps: { title: "پورته کول", text: "فایل پورته(آپلوډ) کیږي..." },
            fa: { title: "بارگذاری", text: "فایل در حال بارگذاری..." },
          },
          download: {
            en: { title: "Downloading", text: "File downloading..." },
            ps: { title: "کښته کول", text: "فایل ډاونلوډ کیږي..." },
            fa: { title: "دانلود", text: "فایل در حال دانلود..." },
          },
          timeout: {
            en: { title: "Timeout", text: "Session expired." },
            ps: { title: "مهلت ختم شو", text: "ناسته ختمه شوه." },
            fa: { title: "انقضا", text: "جلسه منقضی شد." },
          },
          login: {
            en: { title: "Login", text: "Logged in successfully." },
            ps: {
              title: "(لاګین)ننوتل",
              text: "په بریالیتوب سره لاګین شواې یعنی ننوتې.",
            },
            fa: { title: "ورود", text: "با موفقیت وارد شدید." },
          },
          logout: {
            en: { title: "Logout", text: "Logged out successfully." },
            ps: { title: "وتل", text: "په بریالیتوب سره ووتي" },
            fa: { title: "خروج", text: "با موفقیت خارج شدید." },
          },
          limit: {
            en: { title: "Limit", text: "Limit reached." },
            ps: {
              title: "محدودیت",
              text: "تاسو خپل ټاکل شوې حد ته رسیدلي یاست.",
            },
            fa: { title: "محدودیت", text: "به حد رسیدید." },
          },
          network: {
            en: { title: "Network Error", text: "No connection." },
            ps: { title: "د شبکي تېروتنه", text: "انټرنټ نشته." },
            fa: { title: "خطای شبکه", text: "اتصال وجود ندارد." },
          },
          update: {
            en: { title: "Update", text: "Update completed." },
            ps: { title: "آپډیټ", text: "آپډیټ کول په کامیابی سره تسره شوول." },
            fa: { title: "بروزرسانی", text: "بروزرسانی انجام شد." },
          },
          attention: {
            en: { title: "Attention", text: "Pay attention to this message." },
            ps: { title: "پاملرنه", text: "دې پیغام ته پام وکړئ." },
            fa: { title: "توجه", text: "به این پیام توجه کنید." },
          },
          permission: {
            en: { title: "Permission", text: "Access denied." },
            ps: { title: "اجازه رد شوه", text: "لاسرسی رد شوی دی." },
            fa: { title: "عدم دسترسی", text: "دسترسی رد شد." },
          },
          retry: {
            en: { title: "Retry", text: "Please try again." },
            ps: { title: "بیا هڅه", text: "مهرباني وکړئ بیا هڅه وکړئ." },
            fa: { title: "تلاش مجدد", text: "لطفاً دوباره تلاش کنید." },
          },
          submitted: {
            en: { title: "Submitted", text: "Form submitted successfully." },
            ps: { title: "ذخیره", text: "فورمه په بریالیتوب سره ذخیره شو." },
            fa: { title: "ارسال شد", text: "فرم با موفقیت ارسال شد." },
          },
          question: {
            en: { title: "The Internet?", text: "That thing is still around?" },
            ps: { title: "انټرنیټ؟", text: "دا شی اوس هم شته؟" },
            fa: { title: "اینترنت؟", text: "آن چیز هنوز وجود دارد؟" },
          },
          processing: {
            en: { title: "Processing", text: "Processing request..." },
            ps: { title: "پروسس کول", text: "ستاسو غوښتنه پروسس کیږي..." },
            fa: { title: "در حال پردازش", text: "در حال پردازش درخواست..." },
          },
          cancelled: {
            en: { title: "Cancelled", text: "Action cancelled." },
            ps: { title: "لغوه شوه", text: "عمل لغوه شو." },
            fa: { title: "لغو شد", text: "عملیات لغو شد." },
          },
          blocked: {
            en: { title: "Blocked", text: "Action blocked." },
            ps: { title: "بند شوی", text: "دلته کار مه لره." },
            fa: { title: "مسدود شد", text: "عملیات مسدود شد." },
          },
          notification: {
            en: {
              title: "Your work has been saved",
              text: "All changes are saved.",
            },
            ps: { title: "ستاسو کار ثبت شو", text: "ټول تغیرات ثبت شول." },
            fa: {
              title: "کار شما ذخیره شده است",
              text: "همه تغییرات ذخیره شده‌اند.",
            },
          },
          basic: {
            en: {
              title: "khairullahAlert is working!",
              text: "Basic alert example.",
            },
            ps: { title: "خیرالله!", text: "یوه ساده خبرتیا." },
            fa: {
              title: "هشدار خیرالله کار می‌کند!",
              text: "مثال هشدار پایه.",
            },
          },
          titleText: {
            en: { title: "The Internet?", text: "That thing is still around?" },
            ps: { title: "انټرنیټ؟", text: "دا شی اوس هم شته؟" },
            fa: { title: "اینترنت؟", text: "آن چیز هنوز وجود دارد؟" },
          },
          errorFooter: {
            en: { title: "Oops...", text: "Something went wrong!" },
            ps: { title: "اووفف...", text: "یو څه غلط وشول!" },
            fa: { title: "اوه...", text: "مشکلی پیش آمد!" },
          },
          longContent: {
            en: {
              title: "Long Content",
              text: "This is a long content alert.",
            },
            ps: {
              title: "اوږد منځپانګه",
              text: "دا د یوي اوږدې منځپانګي خبرتیا ده.",
            },
            fa: {
              title: "محتوای طولانی",
              text: "این یک هشدار با محتوای طولانی است.",
            },
          },
          draggable: {
            en: { title: "Drag me!", text: "You can drag this alert." },
            ps: {
              title: "ما راکش کړه!",
              text: "تاسو کولی شئ دا خبرتیا راکش کړي",
            },
            fa: {
              title: "من را بکشید!",
              text: "شما می‌توانید این هشدار را بکشید.",
            },
          },
          customHtml: {
            en: { title: "HTML Example", text: "Custom HTML content." },
            ps: { title: "د HTML بېلګه", text: "خوښه HTML منځپانګه." },
            fa: { title: "مثال HTML", text: "محتوای HTML سفارشی." },
          },
          threeButtons: {
            en: {
              title: "Do you want to save the changes?",
              text: "Choose an option.",
            },
            ps: {
              title: "ایا تاسو غواړئ تغیرات ثبت کړئ؟",
              text: "یو انتخاب وټاکي.",
            },
            fa: {
              title: "آیا می‌خواهید تغییرات را ذخیره کنید؟",
              text: "یک گزینه انتخاب کنید.",
            },
          },
          topEnd: {
            en: { title: "Your work has been saved", text: "Changes saved." },
            ps: { title: "ستاسو کار ثبت شو", text: "بدلونونه ثبت شول." },
            fa: { title: "کار شما ذخیره شد", text: "تغییرات ذخیره شدند." },
          },
          customAnim: {
            en: { title: "Custom Animation", text: "With bounce effect." },
            ps: { title: "د خوښې انیمیشن", text: "د باؤنس اثر سره." },
            fa: { title: "انیمیشن سفارشی", text: "با اثر پرش." },
          },
          confirmDeleteFn: {
            en: {
              title: "Are you sure?",
              text: "You won't be able to revert this!",
            },
            ps: {
              title: "ایا ستاسو خوښه ده؟",
              text: "کچیرته حذف شې تاسو بیا یی بیا پیدا نکړې!",
            },
            fa: {
              title: "آیا مطمئن هستید؟",
              text: "شما نمی‌توانید این را بازگردانید!",
            },
          },
          bootstrap: {
            en: {
              title: "Are you sure?",
              text: "You won't be able to revert this!",
            },
            ps: {
              title: "ایا ستاسو خوښه ده؟",
              text: "کچیرته حذف شې تاسو بیا یی بیا پیدا نکړې!",
            },
            fa: {
              title: "آیا مطمئن هستید؟",
              text: "شما نمی‌توانید این را بازگردانید!",
            },
          },
          customImage: {
            en: { title: "Sweet!", text: "Modal with a custom image." },
            ps: { title: "خوږ!", text: "د خوښې انځور سره موډل." },
            fa: { title: "شیرین!", text: "مدال با تصویر سفارشی." },
          },
          customStyle: {
            en: {
              title: "Custom Style",
              text: "Custom width, padding, color, background.",
            },
            ps: {
              title: "د خوښې سټایل",
              text: "د خوښې سټایل پلنوالی، پیډینګ، رنګ، شالید.",
            },
            fa: {
              title: "استایل سفارشی",
              text: "عرض، padding، رنگ و پس‌زمینه سفارشی.",
            },
          },
          timer: {
            en: { title: "Auto Close Alert", text: "Closes automatically." },
            ps: { title: "خبرتیا", text: "دا کوچني په پاڼه خپل تړل کیږې." },
            fa: {
              title: "هشدار بسته شدن خودکار",
              text: "به طور خودکار بسته می‌شود.",
            },
          },
          rtl: {
            en: {
              title: "Would you like to continue?",
              text: "Right-to-left support.",
            },
            ps: {
              title: "ایا تاسو غواړئ ادامه ورکړئ؟",
              text: "ښي نه کیڼ ملاتړ.",
            },
            fa: {
              title: "آیا می‌خواهید ادامه دهید؟",
              text: "پشتیبانی از راست به چپ.",
            },
          },
          ajax: {
            en: {
              title: "Submit your Github username",
              text: "Enter a valid username.",
            },
            ps: {
              title: "خپل د ګیټ‌هب کارن نوم داخل کړې",
              text: "یو معتبر کارن(یوزر) نوم داخل کړې.",
            },
            fa: {
              title: "نام کاربری گیت‌هاب خود را وارد کنید",
              text: "یک نام کاربری معتبر وارد کنید.",
            },
          },
          confirmSuccess: {
            en: { title: "Saved!", text: "Changes saved." },
            ps: { title: "ثبت شو!", text: "بدلونونه ثبت شول." },
            fa: { title: "ذخیره شد!", text: "تغییرات ذخیره شدند." },
          },
          confirmInfo: {
            en: { title: "Changes not saved", text: "You chose not to save." },
            ps: {
              title: "بدلونونه ثبت نه شول",
              text: "تاسو وویل چې ثبت یې نه کړئ.",
            },
            fa: {
              title: "تغییرات ذخیره نشدند",
              text: "شما انتخاب کردید که ذخیره نکنید.",
            },
          },
          confirmCancelled: {
            en: { title: "Cancelled", text: "Action cancelled." },
            ps: { title: "لغوه شول", text: "عمل لغوه شو." },
            fa: { title: "لغو شد", text: "عملیات لغو شد." },
          },
          deleteSuccess: {
            en: { title: "Deleted!", text: "Item deleted." },
            ps: { title: "حذف شو!", text: "توکی حذف شو." },
            fa: { title: "حذف شد!", text: "مورد حذف شد." },
          },
          deleteCancelled: {
            en: { title: "Cancelled", text: "Deletion cancelled." },
            ps: { title: "لغوه شول", text: "حذف کول لغوه شول." },
            fa: { title: "لغو شد", text: "حذف لغو شد." },
          },
          confirmDeleteSuccess: {
            en: { title: "Deleted!", text: "Item deleted." },
            ps: { title: "حذف شو!", text: "توکی حذف شو." },
            fa: { title: "حذف شد!", text: "مورد حذف شد." },
          },
          confirmDeleteInfo: {
            en: { title: "Denied", text: "Deletion denied." },
            ps: { title: "رد شو", text: "حذف کول رد شول." },
            fa: { title: "رد شد", text: "حذف رد شد." },
          },
          threeButtonsSuccess: {
            en: { title: "Saved!", text: "Changes saved." },
            ps: { title: "ثبت شو!", text: "بدلونونه ثبت شول." },
            fa: { title: "ذخیره شد!", text: "تغییرات ذخیره شدند." },
          },
          threeButtonsInfo: {
            en: { title: "Changes not saved", text: "You chose not to save." },
            ps: {
              title: "بدلونونه ثبت نه شول",
              text: "تاسو وویل چې ثبت یې نه کړې.",
            },
            fa: {
              title: "تغییرات ذخیره نشدند",
              text: "شما انتخاب کردید که ذخیره نکنید.",
            },
          },
          confirmDeleteFnSuccess: {
            en: { title: "Deleted!", text: "Your file has been deleted." },
            ps: { title: "حذف شو!", text: "ستاسو فایل حذف شوی ده." },
            fa: { title: "حذف شد!", text: "فایل شما حذف شده است." },
          },
          ajaxSuccess: {
            en: { title: "Success!", text: "Github user found." },
            ps: { title: "بریالیتوب!", text: "د ګیټ‌هب کارن(یوزر) وموندل شو." },
            fa: { title: "موفقیت!", text: "کاربر گیت‌هاب پیدا شد." },
          },
          ajaxError: {
            en: { title: "Error!", text: "User not found." },
            ps: { title: "تېروتنه!", text: "کارن(یوزر) ونه موندل شو." },
            fa: { title: "خطا!", text: "کاربر پیدا نشد." },
          },
        },
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
            deny: "رد یې کړې",
            save: "ثبت یې کړې",
            dontSave: "مه یې ثبتوئ",
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
      setLanguage(currentLang);
    }
  }

  function setLanguage(lang) {
    if (translations && translations.buttons[lang]) {
      currentLang = lang;
      localStorage.setItem("preferredLanguage", lang);
      document.documentElement.lang = lang;
      document.documentElement.dir =
        lang === "fa" || lang === "ps" ? "rtl" : "ltr";

      // Re-fire current alert if visible
      if (
        currentAlertType &&
        document.getElementById("alertBox").style.display === "block"
      ) {
        fire({ type: currentAlertType });
      }
    } else {
      currentLang = "en";
      localStorage.setItem("preferredLanguage", "en");
      document.documentElement.dir = "ltr";
    }
  }

  // Observe changes to document.lang
  function observeLanguageChanges() {
    const observer = new MutationObserver(() => {
      const newLang = getPreferredLanguage();
      if (newLang !== currentLang) {
        setLanguage(newLang);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
  }

  // Listen for custom language change events
  window.addEventListener("languagechange", (event) => {
    const lang = event.detail?.lang;
    if (lang && lang !== currentLang) {
      setLanguage(lang);
    }
  });

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
      backdrop.style.background = backdropColor;
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
  observeLanguageChanges();

  return { fire };
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
