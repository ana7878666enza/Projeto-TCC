document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('satisfactionChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['reclamações', 'elogios', 'duvidas'],
            datasets: [{
                data: [420, 300, 80],
                backgroundColor: [
                    '#0D47A1', // Azul escuro
                    '#C62828', // Vermelho
                    '#002D5B'  // Azul marinho
                ],
                borderRadius: 5,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 500,
                    ticks: {
                        stepSize: 100
                    },
                    grid: {
                        display: true,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Simulação de navegação para futuras telas
    document.querySelector('.back-btn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Aqui voltará para a tela anterior assim que você me enviar!');
    });

    document.querySelector('.btn-make-report').addEventListener('click', function() {
        alert('Função de gerar relatório acionada!');
    });
});
