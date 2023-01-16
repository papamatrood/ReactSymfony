import React from "react";
import Chart from "chart.js/auto";

const Graph = () => {
    const ctx = 'myChart';
    const dataChart = {
        labels: [
            'Installation',
            'Inter-Qualité',
            'Inter-Dépannage',
            'Visite',
            'Récuperation',
        ],
        datasets: [{
            label: 'Graphe du rapport d\'activité',
            data: [300, 50, 100, 200, 150],
            backgroundColor: [
                '#cfe4c3',
                '#004b49',
                '#8b2500',
                '#3b81f1',
                '#938e8e',
            ],
            hoverOffset: 6
        }]
    };
    const config = {
        type: 'pie',
        data: dataChart,
    };
    let chartStatus = Chart.getChart("myChart"); 
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    const myChart = new Chart(ctx, config);
    return (
        <fieldset className="border p-2">
            <legend>Graphe du rapport d'activité</legend>
            <canvas id="myChart"></canvas>
        </fieldset>
    )
}

export default Graph;