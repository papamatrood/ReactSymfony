import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const Graph = () => {
    const [dataChart, setDataChart] = useState({
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
    });


    return (
        <fieldset className="border p-2">
            <legend>Graphe du rapport d'activité</legend>
            <Pie
                data={dataChart}
                options={{
                    plugins: {
                        title: {
                            display: false,
                            text: "Users Gained between 2016-2020"
                        }
                    }
                }}
            />
        </fieldset>
    )
}

export default Graph;