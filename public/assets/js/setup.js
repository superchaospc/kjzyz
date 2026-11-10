// Tab 切换
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
    // 切换后回到顶部（避免长内容下切换 tab 出现位置偏移）
    document.querySelector('.tabs-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// URL hash 支持：直接 setup.html#android 进入会自动切到对应 tab
(function() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const tab = document.querySelector(`.tab[data-tab="${hash}"]`);
    if (tab) tab.click();
  }
})();

// Nav scroll 阴影
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
});
