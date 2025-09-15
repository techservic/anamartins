function showPanel(panelId) {
    // Esconder todos os painéis
    const panels = document.querySelectorAll('.detalhes > div');
    panels.forEach(panel => {
        panel.style.display = "none";
    });

    // Mostrar o painel selecionado
    const activePanel = document.getElementById(panelId + "-panel");
    if (activePanel) {
        activePanel.style.display = "block";
    }

    // Atualizar o estado dos botões
    const buttons = document.querySelectorAll('.botao button');
    buttons.forEach(button => {
        button.classList.remove('ativo');
    });

    const activeButton = document.getElementById(panelId);
    if (activeButton) {
        activeButton.classList.add('ativo');
    }
}

// Mostrar o painel de licenciatura por defeito
showPanel('licenciatura');

function showPanel(panelId) {
    const panels = document.querySelectorAll('.detalhes .tab');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById(panelId + '-panel');
    if (!target) return;

    // forçar reflow para garantir que a animação reinicia (útil se clicar duas vezes rápido)
    void target.offsetWidth;

    target.classList.add('active');

    // atualizar botão ativo (opcional)
    document.querySelectorAll('.botao button').forEach(b => b.classList.remove('ativo'));
    const btn = document.getElementById(panelId);
    if (btn) btn.classList.add('ativo');
}
