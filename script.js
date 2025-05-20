document.addEventListener('DOMContentLoaded', () => {
    const selectButtons = document.querySelectorAll('.select-button');
    const cardContainer = document.querySelector('.card-container');
    const messageContainer = document.querySelector('.message-container');
    const messageText = document.querySelector('.message-text');
    const titleElement = document.querySelector('.title');
    const returnTitle = document.querySelector('.return-title');

    // Fetch messages from JSON
    async function fetchMessages() {
        try {
            const response = await fetch('messages.json');
            const messages = await response.json();
            return messages;
        } catch (error) {
            console.error('Lỗi tải messages:', error);
            return {};
        }
    }

    // Lấy thông điệp ngẫu nhiên
    function getRandomMessage(messages) {
        const messageKeys = Object.keys(messages);
        const randomKey = messageKeys[Math.floor(Math.random() * messageKeys.length)];
        return messages[randomKey];
    }

    // Xử lý khi chọn thẻ
    async function handleCardSelection(event) {
        const messages = await fetchMessages();
        
        // Lấy thông điệp ngẫu nhiên
        const randomMessage = getRandomMessage(messages);
        
        // Ẩn card container và tiêu đề với hiệu ứng mờ dần
        cardContainer.classList.add('fade-out');
        titleElement.style.display = 'none';
        
        // Đợi hiệu ứng mờ dần hoàn tất
        setTimeout(() => {
            cardContainer.style.display = 'none';
            
            // Hiện message container với hiệu ứng hiện dần
            messageContainer.style.display = 'block';
            messageContainer.classList.add('fade-in');
            returnTitle.style.display = 'block'; // Hiển thị tiêu đề mới
            
            // Hiển thị thông điệp ngẫu nhiên
            messageText.textContent = randomMessage || 'Không tìm thấy thông điệp';
        }, 500); // Thời gian của hiệu ứng mờ
    }

    // Quay lại màn hình chọn thẻ
    function returnToCardSelection() {
        messageContainer.classList.remove('fade-in');
        messageContainer.classList.add('fade-out');
        returnTitle.style.display = 'none'; // Ẩn tiêu đề mới
        
        setTimeout(() => {
            messageContainer.style.display = 'none';
            cardContainer.style.display = 'flex';
            titleElement.style.display = 'block';
            cardContainer.classList.remove('fade-out');
            cardContainer.classList.add('fade-in');
        }, 500);
    }

    // Gán sự kiện cho các nút chọn thẻ
    selectButtons.forEach(button => {
        button.addEventListener('click', handleCardSelection);
    });

    // Gán sự kiện click cho message container để quay lại
    messageContainer.addEventListener('click', returnToCardSelection);
});
