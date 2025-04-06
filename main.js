// 在内存中定义数据，而不是从文件中获取
document.addEventListener('DOMContentLoaded', function() {
    // 客户流失数据
    const churnData = [
        {
            "id": 1,
            "tenure": 24,
            "monthly_charges": 65.5,
            "total_charges": 1570.8,
            "gender": "Male",
            "churn": "No"
        },
        {
            "id": 2,
            "tenure": 6,
            "monthly_charges": 85.2,
            "total_charges": 511.2,
            "gender": "Female",
            "churn": "Yes"
        },
        {
            "id": 3,
            "tenure": 56,
            "monthly_charges": 105.65,
            "total_charges": 5916.4,
            "gender": "Male",
            "churn": "No"
        },
        {
            "id": 4,
            "tenure": 12,
            "monthly_charges": 70.35,
            "total_charges": 844.2,
            "gender": "Female",
            "churn": "No"
        },
        {
            "id": 5,
            "tenure": 3,
            "monthly_charges": 55.2,
            "total_charges": 165.6,
            "gender": "Male",
            "churn": "Yes"
        }
    ];

    // 处理客户流失数据
    handleChurnData(churnData);

    // 客户分群数据
    const customerSegmentation = [
        {
            "cluster": 0,
            "size": 1458,
            "avg_income": 58254.32,
            "avg_age": 39.8,
            "avg_spending_score": 48.7,
            "gender_ratio_male": 0.45,
            "members": [
                {"id": 101, "income": 60000, "age": 38, "spending_score": 50, "gender": "Female"},
                {"id": 102, "income": 55000, "age": 42, "spending_score": 45, "gender": "Male"}
            ]
        },
        {
            "cluster": 1,
            "size": 932,
            "avg_income": 86350.15,
            "avg_age": 35.2,
            "avg_spending_score": 75.8,
            "gender_ratio_male": 0.38,
            "members": [
                {"id": 201, "income": 85000, "age": 36, "spending_score": 78, "gender": "Female"},
                {"id": 202, "income": 90000, "age": 32, "spending_score": 80, "gender": "Female"}
            ]
        }
    ];

    // 处理客户分群数据
    handleCustomerSegmentation(customerSegmentation);

    // 股票数据
    const stockData = [
        {"date": "2023-01-01", "open": 150.23, "high": 152.43, "low": 149.01, "close": 151.73, "volume": 2800000},
        {"date": "2023-01-02", "open": 151.73, "high": 154.53, "low": 151.20, "close": 153.69, "volume": 3200000},
        {"date": "2023-01-03", "open": 153.69, "high": 155.23, "low": 152.45, "close": 154.93, "volume": 2900000},
        {"date": "2023-01-04", "open": 154.93, "high": 156.75, "low": 154.01, "close": 156.23, "volume": 3100000},
        {"date": "2023-01-05", "open": 156.23, "high": 158.36, "low": 155.30, "close": 157.45, "volume": 3400000},
        {"date": "2023-01-08", "open": 157.45, "high": 159.25, "low": 156.90, "close": 158.75, "volume": 3000000},
        {"date": "2023-01-09", "open": 158.75, "high": 160.32, "low": 158.10, "close": 159.80, "volume": 3200000},
        {"date": "2023-01-10", "open": 159.80, "high": 161.35, "low": 158.95, "close": 160.85, "volume": 3500000},
        {"date": "2023-01-11", "open": 160.85, "high": 162.80, "low": 160.30, "close": 162.45, "volume": 3300000},
        {"date": "2023-01-12", "open": 162.45, "high": 164.20, "low": 161.85, "close": 163.75, "volume": 3600000}
    ];

    // 处理股票数据
    handleStockData(stockData);
});

// 处理客户流失数据的函数
function handleChurnData(data) {
    console.log("客户流失数据加载成功");
    try {
        // 这里可以添加可视化或数据处理代码
        // 例如: 计算流失率
        const churnRate = data.filter(customer => customer.churn === "Yes").length / data.length;
        console.log(`客户流失率: ${(churnRate * 100).toFixed(2)}%`);
        
        // 在这里可以添加更多的数据处理和可视化代码
    } catch (error) {
        console.error("处理客户流失数据时出错:", error);
    }
}

// 处理客户分群数据的函数
function handleCustomerSegmentation(data) {
    console.log("客户分群数据加载成功");
    try {
        // 这里可以添加可视化或数据处理代码
        // 例如: 输出各分群的大小
        data.forEach(cluster => {
            console.log(`分群 ${cluster.cluster}: ${cluster.size} 人, 平均收入: $${cluster.avg_income.toFixed(2)}`);
        });
        
        // 在这里可以添加更多的数据处理和可视化代码
    } catch (error) {
        console.error("处理客户分群数据时出错:", error);
    }
}

// 处理股票数据的函数
function handleStockData(data) {
    console.log("股票数据加载成功");
    try {
        // 这里可以添加可视化或数据处理代码
        // 例如: 计算平均收盘价
        const avgClose = data.reduce((sum, day) => sum + day.close, 0) / data.length;
        console.log(`平均收盘价: $${avgClose.toFixed(2)}`);
        
        // 在这里可以添加更多的数据处理和可视化代码
    } catch (error) {
        console.error("处理股票数据时出错:", error);
    }
} 