// 导航栏滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar ul li a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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

    // 导航栏固定效果
    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar.offsetTop;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // 平滑滚动效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // 添加移动端图片点击放大功能
    const systemImage = document.querySelector('.system-image img');
    if (systemImage) {
        // 检查是否是移动设备
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // 创建模态框元素
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            
            const modalImg = document.createElement('img');
            modalImg.className = 'modal-content';
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-modal';
            closeBtn.innerHTML = '&times;';
            
            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
            
            // 添加点击事件
            systemImage.addEventListener('click', function() {
                modal.style.display = 'flex';
                modalImg.src = this.src;
            });
            
            // 关闭模态框
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // 点击模态框背景也可以关闭
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }
});

// 添加微信号复制功能
function copyWechat() {
    const wechatElement = document.querySelector('.wechat-id');
    const wechatId = wechatElement.dataset.wechat;
    
    // 创建临时input元素
    const tempInput = document.createElement('input');
    tempInput.value = wechatId;
    document.body.appendChild(tempInput);
    
    // 选择并复制文本
    tempInput.select();
    document.execCommand('copy');
    
    // 删除临时元素
    document.body.removeChild(tempInput);
    
    // 显示复制成功提示
    showCopySuccess();
}

function showCopySuccess() {
    // 检查是否已存在提示元素
    let successMsg = document.querySelector('.copy-success');
    
    if (!successMsg) {
        // 创建提示元素
        successMsg = document.createElement('div');
        successMsg.className = 'copy-success';
        successMsg.textContent = '微信号已复制到剪贴板！';
        document.body.appendChild(successMsg);
    }
    
    // 显示提示
    setTimeout(() => {
        successMsg.classList.add('show');
        
        // 3秒后隐藏提示
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 3000);
    }, 100);
} 