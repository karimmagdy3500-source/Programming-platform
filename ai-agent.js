(function () {
  function injectAiTutorUI() {
    if (document.getElementById('aiTutorBtn')) return;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <button id="aiTutorBtn" type="button" onclick="window.toggleAiTutor()" class="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium px-4 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        <span class="text-sm font-bold hidden sm:inline">المساعد الذكي</span>
      </button>

      <div id="aiTutorModal" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm hidden flex justify-end">
        <div id="aiTutorContainer" class="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 transition-transform duration-300 translate-x-full">
          <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="font-bold text-slate-800 dark:text-slate-100 text-sm">مساعد البرمجة الذكي</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">اسأل عن JavaScript والأسئلة</p>
            </div>
            <button type="button" onclick="window.toggleAiTutor()" class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg">
              ✕
            </button>
          </div>

          <div id="aiChatMessages" class="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            <div class="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded-2xl">
              أهلاً بك! اكتب سؤالك في البرمجة أو JavaScript وسأساعدك خطوة بخطوة.
            </div>
          </div>

          <form id="aiTutorForm" class="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <input id="aiInput" type="text" placeholder="اكتب سؤالك هنا..." class="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 dark:text-slate-100" required />
            <button type="submit" class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-bold">
              إرسال
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);

    const form = document.getElementById('aiTutorForm');
    if (form) {
      form.addEventListener('submit', handleAiSubmit);
    }
  }

  function appendMessage(sender, text) {
    const box = document.getElementById('aiChatMessages');
    if (!box) return;

    const msg = document.createElement('div');
    msg.className = sender === 'user'
      ? 'bg-cyan-600 text-white p-3 rounded-2xl ml-auto max-w-[85%]'
      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded-2xl mr-auto max-w-[85%]';
    msg.textContent = text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
  }

  async function handleAiSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('aiInput');
    if (!input) return;

    const question = input.value.trim();
    if (!question) return;

    appendMessage('user', question);
    input.value = '';

    // هنا هنربط الـ Endpoint / Edge Function أو الـ API في الخطوة الجاية
    appendMessage('ai', 'تم استلام سؤالك. جاري تجهيز الربط الفعلي مع نموذج الذكاء الاصطناعي.');
  }

  window.toggleAiTutor = function () {
    const modal = document.getElementById('aiTutorModal');
    const container = document.getElementById('aiTutorContainer');
    if (!modal || !container) return;

    if (modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      setTimeout(() => container.classList.remove('translate-x-full'), 10);
    } else {
      container.classList.add('translate-x-full');
      setTimeout(() => modal.classList.add('hidden'), 300);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAiTutorUI);
  } else {
    injectAiTutorUI();
  }
})();