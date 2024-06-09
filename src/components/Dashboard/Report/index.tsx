import ApexCharts from 'apexcharts';
import { useLayoutEffect, useRef } from 'react';

import styles from './report.module.scss';

const options = {
    series: [
        {
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ],
    chart: {
        type: 'bar',
        height: 350,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
    },
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
        title: {
            text: '$ (thousands)',
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter: function (val: number) {
                return '$ ' + val + ' thousands';
            },
        },
    },
};

const Report = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const chart = new ApexCharts(chartRef.current, options);
        chart.render();
    }, [chartRef]);

    return (
        <div className={styles.container}>
            <div ref={chartRef} id="chart"></div>
        </div>
    );
};

export default Report;
