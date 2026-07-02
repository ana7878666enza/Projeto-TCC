document.addEventListener('DOMContentLoaded', function() {
    // 1. Gráfico de Rendimento (Gauge)
    const gaugeCtx = document.getElementById('rendimentoGauge').getContext('2d');
    new Chart(gaugeCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [71, 29],
                backgroundColor: ['#002D5B', '#CFD8DC'],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            cutout: '80%'
        }
    });

    // 2. Gráfico de Barras (Satisfação setor)
    const barCtx = document.getElementById('setorBarChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Vendas', 'Financeiro', 'Produção', 'Marketing'],
            datasets: [{
                data: [60, 80, 30, 90],
                backgroundColor: [
                    '#0D47A1', // Vendas
                    '#1E88E5', // Financeiro
                    '#3949AB', // Produção
                    '#001529'  // Marketing (quase preto)
                ],
                borderRadius: 0,
                barThickness: 50
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    beginAtZero: true, 
                    max: 100,
                    grid: { color: '#eee' },
                    ticks: { color: '#666' }
                },
                x: { 
                    grid: { display: false },
                    ticks: { color: '#333', font: { weight: 'bold' } }
                }
            }
        }
    });

    // 3. Gráfico Donut (Comercial, Entrega, etc)
    const donutCtx = document.getElementById('setorDonutChart').getContext('2d');
    new Chart(donutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Entrega', 'Comercial', 'Atendimento', 'Qualidade'],
            datasets: [{
                data: [15.1, 33, 22.2, 29.7],
                backgroundColor: ['#1565C0', '#000A1A', '#1A237E', '#0D47A1'],
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#333',
                        font: { size: 14, weight: 'bold' },
                        padding: 20,
                        usePointStyle: true,
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} ${data.datasets[0].data[i]}%`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                index: i,
                                strokeStyle: 'transparent'
                            }));
                        }
                    }
                }
            },
            cutout: '50%'
        }
    });
});
;
