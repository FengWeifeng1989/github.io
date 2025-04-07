// 图表初始化
document.addEventListener('DOMContentLoaded', function() {
    // 线性回归模型图表
    const linearRegressionCtx = document.getElementById('linearRegressionChart').getContext('2d');
    const linearRegressionChart = new Chart(linearRegressionCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '实际数据点',
                data: generateLinearRegressionData(30),
                backgroundColor: 'rgba(13, 110, 253, 0.5)',
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 1,
                pointRadius: 5
            }, {
                label: '回归线',
                data: generateRegressionLine(0, 100),
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '预测因子组合值'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '信贷评分'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '信贷评分线性回归模型',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });

    // 逻辑回归模型图表
    const logisticRegressionCtx = document.getElementById('logisticRegressionChart').getContext('2d');
    const logisticRegressionChart = new Chart(logisticRegressionCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '低风险客户',
                data: generateLogisticData(20, 0),
                backgroundColor: 'rgba(40, 167, 69, 0.5)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 1,
                pointRadius: 5
            }, {
                label: '高风险客户',
                data: generateLogisticData(15, 1),
                backgroundColor: 'rgba(220, 53, 69, 0.5)',
                borderColor: 'rgba(220, 53, 69, 1)',
                borderWidth: 1,
                pointRadius: 5
            }, {
                label: '决策边界',
                data: generateLogisticCurve(),
                type: 'line',
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '风险因子X₁'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '风险因子X₂'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '违约预测逻辑回归模型',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });

    // 时间序列模型图表
    const timeSeriesCtx = document.getElementById('timeSeriesChart').getContext('2d');
    const timeSeriesChart = new Chart(timeSeriesCtx, {
        type: 'line',
        data: {
            labels: generateTimeLabels(24),
            datasets: [{
                label: '历史违约率',
                data: generateTimeSeriesData(24, true),
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 2,
                pointRadius: 3,
                fill: true
            }, {
                label: 'ARIMA预测',
                data: generateTimeSeriesData(12, false).concat(generateForecastData(12)),
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                borderColor: 'rgba(255, 193, 7, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '时间 (月)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '违约率 (%)'
                    },
                    min: 0,
                    max: 5
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '贷款违约率时间序列分析',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });

    // 聚类分析图表
    const clusteringCtx = document.getElementById('clusteringChart').getContext('2d');
    const clusteringChart = new Chart(clusteringCtx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '高价值低风险',
                    data: generateClusterData(15, 70, 20, 5),
                    backgroundColor: 'rgba(40, 167, 69, 0.6)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 1,
                    pointRadius: 6
                },
                {
                    label: '高价值高风险',
                    data: generateClusterData(12, 65, 70, 5),
                    backgroundColor: 'rgba(255, 193, 7, 0.6)',
                    borderColor: 'rgba(255, 193, 7, 1)',
                    borderWidth: 1,
                    pointRadius: 6
                },
                {
                    label: '中等价值中等风险',
                    data: generateClusterData(20, 40, 40, 5),
                    backgroundColor: 'rgba(13, 110, 253, 0.6)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 1,
                    pointRadius: 6
                },
                {
                    label: '低价值低风险',
                    data: generateClusterData(18, 20, 25, 5),
                    backgroundColor: 'rgba(108, 117, 125, 0.6)',
                    borderColor: 'rgba(108, 117, 125, 1)',
                    borderWidth: 1,
                    pointRadius: 6
                },
                {
                    label: '低价值高风险',
                    data: generateClusterData(10, 15, 75, 5),
                    backgroundColor: 'rgba(220, 53, 69, 0.6)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 1,
                    pointRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '客户价值'
                    },
                    min: 0,
                    max: 100
                },
                y: {
                    title: {
                        display: true,
                        text: '风险指数'
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'K均值客户分群结果',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
});

// 生成线性回归模型的数据
function generateLinearRegressionData(n) {
    const data = [];
    const slope = 0.72;
    const intercept = 30;
    
    for (let i = 0; i < n; i++) {
        const x = Math.random() * 100;
        const noise = (Math.random() - 0.5) * 15;
        const y = slope * x + intercept + noise;
        
        data.push({x, y});
    }
    
    return data;
}

// 生成回归线
function generateRegressionLine(min, max) {
    const slope = 0.72;
    const intercept = 30;
    
    return [
        {x: min, y: slope * min + intercept},
        {x: max, y: slope * max + intercept}
    ];
}

// 生成逻辑回归模型的数据
function generateLogisticData(n, category) {
    const data = [];
    
    if (category === 0) {
        // 低风险客户
        for (let i = 0; i < n; i++) {
            const x = Math.random() * 40 + 10;
            const y = Math.random() * 40 + 10;
            data.push({x, y});
        }
    } else {
        // 高风险客户
        for (let i = 0; i < n; i++) {
            const x = Math.random() * 40 + 50;
            const y = Math.random() * 40 + 50;
            data.push({x, y});
        }
    }
    
    return data;
}

// 生成逻辑回归决策边界
function generateLogisticCurve() {
    const data = [];
    
    for (let x = 0; x <= 100; x += 5) {
        const y = -1.5 * x + 120; // 简化的决策边界
        if (y >= 0 && y <= 100) {
            data.push({x, y});
        }
    }
    
    return data;
}

// 生成时间标签
function generateTimeLabels(n) {
    const labels = [];
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - n + 1);
    
    for (let i = 0; i < n; i++) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        labels.push(`${year}/${month}`);
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return labels;
}

// 生成时间序列数据
function generateTimeSeriesData(n, withPattern) {
    const data = [];
    const baseValue = 1.8;
    
    for (let i = 0; i < n; i++) {
        let value;
        if (withPattern) {
            // 添加季节性模式
            const seasonal = 0.8 * Math.sin(i * Math.PI / 6);
            value = baseValue + seasonal + (Math.random() - 0.5) * 0.5;
        } else {
            value = baseValue + (Math.random() - 0.5) * 0.5;
        }
        data.push(value);
    }
    
    return data;
}

// 生成预测数据
function generateForecastData(n) {
    const data = new Array(n).fill(null);
    const startValue = 2.2;
    
    for (let i = 0; i < n; i++) {
        const seasonal = 0.8 * Math.sin((i + 12) * Math.PI / 6);
        data[i] = startValue + seasonal + (i * 0.1);
    }
    
    return data;
}

// 生成聚类数据
function generateClusterData(n, centerX, centerY, radius) {
    const data = [];
    
    for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * radius;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        
        data.push({x, y});
    }
    
    return data;
} 