// scripts.js — versão robusta e compatível com index.html
(function () {
  'use strict';

  // toggle interno (usa IDs do HTML: #btn-menu e #menu-mobile)
  function _toggleMenu() {
    const btn = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-mobile');
    if (!btn || !menu) return;

    const willOpen = !menu.classList.contains('active');

    menu.classList.toggle('active', willOpen);
    btn.classList.toggle('active', willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
    document.body.style.overflow = willOpen ? 'hidden' : '';
  }

  // expor globalmente para o onclick inline do HTML (onclick="menuShow()")
  window.menuShow = _toggleMenu;

  // Código que só corre depois do DOM estar pronto
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-mobile');

    // Se o botão NÃO tem um onclick inline (atributo), anexa listener.
    // Isto evita o problema de "duplo clique" (toggle duas vezes).
    if (btn && !btn.hasAttribute('onclick')) {
      btn.addEventListener('click', _toggleMenu);
    }

    // Fechar ao clicar num link dentro do menu
    if (menu) {
      menu.addEventListener('click', (e) => {
        // Se clicou num <a> (ou nódulo filho), fecha
        const a = e.target.closest('a');
        if (a) {
          menu.classList.remove('active');
          if (btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
          return;
        }

        // Se clicou exatamente no overlay (fora do <nav>) fecha
        if (e.target === menu) {
          menu.classList.remove('active');
          if (btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
        }
      });
    }

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (menu && menu.classList.contains('active')) {
          menu.classList.remove('active');
          if (btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
        }
      }
    });

    /* -----------------------------
       TABS - "Jornada" (compatível com onclick inline)
       HTML usa: onclick="showPanel('licenciatura')"
       ----------------------------- */
    function showPanel(panelId) {
      const panels = document.querySelectorAll('.detalhes .tab');
      panels.forEach(p => p.classList.remove('active'));

      const target = document.getElementById(panelId + '-panel');
      if (target) {
        // forçar reflow para reiniciar animação se necessário
        void target.offsetWidth;
        target.classList.add('active');
      }

      // atualizar buttons
      const buttons = document.querySelectorAll('.botao button');
      buttons.forEach(b => b.classList.remove('ativo'));
      const activeBtn = document.getElementById(panelId);
      if (activeBtn) activeBtn.classList.add('ativo');
    }

    // expor global
    window.showPanel = showPanel;

    // mostra painel default
    showPanel('licenciatura');
  });
})();
// Scroll Spy: ativa link conforme a section visível
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".menu-link");

  function onScroll() {
    let scrollPos = window.scrollY + 200; // margem para ativar antes de chegar no topo

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // ativar o correto logo ao carregar
});
