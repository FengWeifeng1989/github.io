document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // 设置头像显示的占位图
    setDefaultAvatar();
    
    // 添加滚动到顶部按钮
    addScrollToTopButton();
    
    // 添加滚动事件处理
    handleScrollEvents();
    
    // 添加导航菜单高亮效果
    highlightNavOnScroll();
    
    // 初始化线性回归模型
    initLinearRegressionModel();
    
    // 初始化多元回归模型
    initMultiRegressionModel();
    
    // 初始化多项式回归模型
    initPolyRegressionModel();
    
    // 添加技能进度条动画
    animateSkillBars();
});

// 设置默认头像
function setDefaultAvatar() {
    const avatar = document.getElementById('avatar');
    if (avatar) {
        avatar.onerror = function() {
            this.src = 'https://via.placeholder.com/250x250?text=冯伟峰';
        };
        avatar.src = 'https://via.placeholder.com/250x250?text=冯伟峰';
    }
}

// 添加回到顶部按钮
function addScrollToTopButton() {
    // 创建按钮元素
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', '回到顶部');
    scrollTopBtn.setAttribute('title', '回到顶部');
    
    // 添加样式
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.fontSize = '1.2rem';
    scrollTopBtn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    scrollTopBtn.style.zIndex = '1000';
    
    // 添加到DOM
    document.body.appendChild(scrollTopBtn);
    
    // 添加事件处理
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
}

// 处理滚动事件
function handleScrollEvents() {
    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundPosition = `50% ${scrollTop * 0.5}px`;
        }
    });
}

// 导航菜单滚动高亮
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// 线性回归模型相关函数
function initLinearRegressionModel() {
    // 获取DOM元素
    const slopeSlider = document.getElementById('slope');
    const slopeValue = document.getElementById('slope-value');
    const interceptSlider = document.getElementById('intercept');
    const interceptValue = document.getElementById('intercept-value');
    const noiseSlider = document.getElementById('noise');
    const noiseValue = document.getElementById('noise-value');
    const generateBtn = document.getElementById('generate-linear');
    const mseElement = document.getElementById('linear-mse');
    const r2Element = document.getElementById('linear-r2');
    
    // 添加按钮图标
    if (generateBtn) {
        generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> 生成新数据';
    }
    
    // 创建图表
    const ctx = document.getElementById('linear-regression-chart')?.getContext('2d');
    if (!ctx) return;
    
    let linearChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '数据点',
                    data: [],
                    backgroundColor: 'rgba(37, 99, 235, 0.7)',
                    pointRadius: 6
                },
                {
                    label: '回归线',
                    data: [],
                    type: 'line',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X值'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y值'
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1
                },
                legend: {
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
    
    // 更新显示的滑块值
    if (slopeSlider) {
        slopeSlider.addEventListener('input', function() {
            if (slopeValue) slopeValue.textContent = this.value;
            updateLinearRegression();
        });
    }
    
    if (interceptSlider) {
        interceptSlider.addEventListener('input', function() {
            if (interceptValue) interceptValue.textContent = this.value;
            updateLinearRegression();
        });
    }
    
    if (noiseSlider) {
        noiseSlider.addEventListener('input', function() {
            if (noiseValue) noiseValue.textContent = this.value;
        });
    }
    
    // 生成新数据
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            generateLinearData();
            // 添加旋转效果
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.add('fa-spin');
                setTimeout(() => {
                    icon.classList.remove('fa-spin');
                }, 1000);
            }
        });
    }
    
    // 初始化生成数据
    generateLinearData();
    
    // 生成线性回归数据
    function generateLinearData() {
        if (!slopeSlider || !interceptSlider || !noiseSlider) return;
        
        const slope = parseFloat(slopeSlider.value);
        const intercept = parseFloat(interceptSlider.value);
        const noise = parseFloat(noiseSlider.value);
        
        // 生成数据点
        const points = [];
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 10 - 5;
            const y = slope * x + intercept + (Math.random() * 2 - 1) * noise;
            points.push({x, y});
        }
        
        // 更新图表数据
        linearChart.data.datasets[0].data = points;
        
        // 执行回归
        const result = linearRegression(points);
        
        // 更新回归线
        updateRegressionLine(result.slope, result.intercept);
        
        // 更新评估指标
        if (mseElement) mseElement.textContent = result.mse.toFixed(3);
        if (r2Element) r2Element.textContent = result.r2.toFixed(3);
    }
    
    // 更新线性回归
    function updateLinearRegression() {
        if (!slopeSlider || !interceptSlider) return;
        
        const slope = parseFloat(slopeSlider.value);
        const intercept = parseFloat(interceptSlider.value);
        
        // 更新回归线
        updateRegressionLine(slope, intercept);
    }
    
    // 更新回归线
    function updateRegressionLine(slope, intercept) {
        const xMin = -5;
        const xMax = 5;
        
        const lineData = [
            {x: xMin, y: slope * xMin + intercept},
            {x: xMax, y: slope * xMax + intercept}
        ];
        
        linearChart.data.datasets[1].data = lineData;
        linearChart.update();
    }
    
    // 计算线性回归
    function linearRegression(data) {
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        const n = data.length;
        
        // 计算各项和
        for (let i = 0; i < n; i++) {
            sumX += data[i].x;
            sumY += data[i].y;
            sumXY += data[i].x * data[i].y;
            sumX2 += data[i].x * data[i].x;
        }
        
        // 计算斜率和截距
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // 计算MSE和R²
        let sse = 0, sst = 0, mean = sumY / n;
        
        for (let i = 0; i < n; i++) {
            const yPred = slope * data[i].x + intercept;
            sse += Math.pow(data[i].y - yPred, 2);
            sst += Math.pow(data[i].y - mean, 2);
        }
        
        const mse = sse / n;
        const r2 = 1 - (sse / sst);
        
        return {slope, intercept, mse, r2};
    }
}

// 多元回归模型相关函数
function initMultiRegressionModel() {
    // 获取DOM元素
    const coefXSlider = document.getElementById('coef-x');
    const coefXValue = document.getElementById('coef-x-value');
    const coefZSlider = document.getElementById('coef-z');
    const coefZValue = document.getElementById('coef-z-value');
    const interceptSlider = document.getElementById('multi-intercept');
    const interceptValue = document.getElementById('multi-intercept-value');
    const generateBtn = document.getElementById('generate-multi');
    const mseElement = document.getElementById('multi-mse');
    const r2Element = document.getElementById('multi-r2');
    
    // 添加按钮图标
    if (generateBtn) {
        generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> 生成新数据';
    }
    
    // 创建图表
    const ctx = document.getElementById('multi-regression-chart')?.getContext('2d');
    if (!ctx) return;
    
    let multiChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '数据点',
                data: [],
                backgroundColor: function(context) {
                    const value = context.raw.y;
                    const alpha = 0.7;
                    return value > 0 ? 
                        `rgba(37, 99, 235, ${alpha})` : 
                        `rgba(16, 185, 129, ${alpha})`;
                },
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X值'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y值'
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const dataPoint = context.raw;
                            return `(x: ${dataPoint.x.toFixed(2)}, y: ${dataPoint.y.toFixed(2)}, z: ${dataPoint.z.toFixed(2)})`;
                        }
                    }
                },
                legend: {
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
    
    // 更新显示的滑块值
    if (coefXSlider) {
        coefXSlider.addEventListener('input', function() {
            if (coefXValue) coefXValue.textContent = this.value;
        });
    }
    
    if (coefZSlider) {
        coefZSlider.addEventListener('input', function() {
            if (coefZValue) coefZValue.textContent = this.value;
        });
    }
    
    if (interceptSlider) {
        interceptSlider.addEventListener('input', function() {
            if (interceptValue) interceptValue.textContent = this.value;
        });
    }
    
    // 生成新数据
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            generateMultiData();
            // 添加旋转效果
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.add('fa-spin');
                setTimeout(() => {
                    icon.classList.remove('fa-spin');
                }, 1000);
            }
        });
    }
    
    // 初始化生成数据
    generateMultiData();
    
    // 生成多元回归数据
    function generateMultiData() {
        if (!coefXSlider || !coefZSlider || !interceptSlider) return;
        
        const coefX = parseFloat(coefXSlider.value);
        const coefZ = parseFloat(coefZSlider.value);
        const intercept = parseFloat(interceptSlider.value);
        
        // 生成数据点
        const points = [];
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 10 - 5;
            const z = Math.random() * 10 - 5;
            const y = coefX * x + coefZ * z + intercept + (Math.random() * 2 - 1) * 1.5;
            points.push({x, y, z});
        }
        
        // 更新图表数据
        multiChart.data.datasets[0].data = points;
        multiChart.update();
        
        // 计算MSE和R²
        const {mse, r2} = calculateMultiRegressionMetrics(points, coefX, coefZ, intercept);
        
        // 更新评估指标
        if (mseElement) mseElement.textContent = mse.toFixed(3);
        if (r2Element) r2Element.textContent = r2.toFixed(3);
    }
    
    // 计算多元回归评估指标
    function calculateMultiRegressionMetrics(data, coefX, coefZ, intercept) {
        const n = data.length;
        let sse = 0, sst = 0;
        
        // 计算平均值
        let sumY = 0;
        for (let i = 0; i < n; i++) {
            sumY += data[i].y;
        }
        const mean = sumY / n;
        
        // 计算SSE和SST
        for (let i = 0; i < n; i++) {
            const yPred = coefX * data[i].x + coefZ * data[i].z + intercept;
            sse += Math.pow(data[i].y - yPred, 2);
            sst += Math.pow(data[i].y - mean, 2);
        }
        
        const mse = sse / n;
        const r2 = 1 - (sse / sst);
        
        return {mse, r2};
    }
}

// 多项式回归模型相关函数
function initPolyRegressionModel() {
    // 获取DOM元素
    const degreeSlider = document.getElementById('degree');
    const degreeValue = document.getElementById('degree-value');
    const noiseSlider = document.getElementById('poly-noise');
    const noiseValue = document.getElementById('poly-noise-value');
    const generateBtn = document.getElementById('generate-poly');
    const mseElement = document.getElementById('poly-mse');
    const r2Element = document.getElementById('poly-r2');
    
    // 添加按钮图标
    if (generateBtn) {
        generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> 生成新数据';
    }
    
    // 创建图表
    const ctx = document.getElementById('poly-regression-chart')?.getContext('2d');
    if (!ctx) return;
    
    let polyChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: '数据点',
                    data: [],
                    backgroundColor: 'rgba(37, 99, 235, 0.7)',
                    pointRadius: 6
                },
                {
                    label: '多项式拟合曲线',
                    data: [],
                    type: 'line',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X值'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y值'
                    }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1
                },
                legend: {
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
    
    // 更新显示的滑块值
    if (degreeSlider) {
        degreeSlider.addEventListener('input', function() {
            if (degreeValue) degreeValue.textContent = this.value;
        });
    }
    
    if (noiseSlider) {
        noiseSlider.addEventListener('input', function() {
            if (noiseValue) noiseValue.textContent = this.value;
        });
    }
    
    // 生成新数据
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            generatePolyData();
            // 添加旋转效果
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.add('fa-spin');
                setTimeout(() => {
                    icon.classList.remove('fa-spin');
                }, 1000);
            }
        });
    }
    
    // 初始化生成数据
    generatePolyData();
    
    // 生成多项式回归数据
    function generatePolyData() {
        if (!degreeSlider || !noiseSlider) return;
        
        const degree = parseInt(degreeSlider.value);
        const noise = parseFloat(noiseSlider.value);
        
        // 生成数据点
        const points = [];
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * 10 - 5;
            let y = 0;
            
            // 生成多项式函数
            // 例如: y = 0.5 + 0.3x - 0.2x² + 0.1x³ + noise
            const coefficients = [0.5, 0.3, -0.2, 0.1, 0.05, -0.03];
            
            for (let j = 0; j <= Math.min(degree, 5); j++) {
                y += coefficients[j] * Math.pow(x, j);
            }
            
            y += (Math.random() * 2 - 1) * noise;
            points.push({x, y});
        }
        
        // 更新图表数据
        polyChart.data.datasets[0].data = points;
        
        // 执行多项式回归
        const result = polynomialRegression(points, degree);
        
        // 更新回归曲线
        updatePolyCurve(result.coefficients);
        
        // 更新评估指标
        if (mseElement) mseElement.textContent = result.mse.toFixed(3);
        if (r2Element) r2Element.textContent = result.r2.toFixed(3);
    }
    
    // 更新多项式曲线
    function updatePolyCurve(coefficients) {
        const curvePoints = [];
        const step = 0.1;
        
        for (let x = -5; x <= 5; x += step) {
            let y = 0;
            
            // 计算多项式的值
            for (let i = 0; i < coefficients.length; i++) {
                y += coefficients[i] * Math.pow(x, i);
            }
            
            curvePoints.push({x, y});
        }
        
        polyChart.data.datasets[1].data = curvePoints;
        polyChart.update();
    }
    
    // 多项式回归
    function polynomialRegression(data, degree) {
        if (!window.math) {
            console.error('Math.js库未加载');
            return {coefficients: [0], mse: 0, r2: 0};
        }
        
        const n = data.length;
        let X = [];
        let y = [];
        
        // 构建矩阵
        for (let i = 0; i < n; i++) {
            const row = [];
            for (let j = 0; j <= degree; j++) {
                row.push(Math.pow(data[i].x, j));
            }
            X.push(row);
            y.push(data[i].y);
        }
        
        try {
            // 计算系数 (使用数学库的最小二乘法)
            const Xt = math.transpose(X);
            const XtX = math.multiply(Xt, X);
            const XtY = math.multiply(Xt, y);
            const coefficients = math.lusolve(XtX, XtY).flat();
            
            // 计算MSE和R²
            let sse = 0, sst = 0;
            
            // 计算平均值
            let sumY = 0;
            for (let i = 0; i < n; i++) {
                sumY += data[i].y;
            }
            const mean = sumY / n;
            
            // 计算SSE和SST
            for (let i = 0; i < n; i++) {
                let yPred = 0;
                for (let j = 0; j <= degree; j++) {
                    yPred += coefficients[j] * Math.pow(data[i].x, j);
                }
                
                sse += Math.pow(data[i].y - yPred, 2);
                sst += Math.pow(data[i].y - mean, 2);
            }
            
            const mse = sse / n;
            const r2 = 1 - (sse / sst);
            
            return {coefficients, mse, r2};
        } catch (error) {
            console.error('多项式回归计算出错:', error);
            return {coefficients: [0], mse: 0, r2: 0};
        }
    }
} 