function openTab(tabId, buttonElement) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show the selected tab content
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('active');
    
    // Add active class to the clicked button
    buttonElement.classList.add('active');
    
    // Move the active line to the clicked button
    const activeLine = document.querySelector('.active-line');
    activeLine.style.width = `${buttonElement.offsetWidth}px`;
    activeLine.style.left = `${buttonElement.offsetLeft}px`;
}

// Initial setup for active line
document.addEventListener('DOMContentLoaded', () => {
    const activeButton = document.querySelector('.tab-button.active');
    const activeLine = document.querySelector('.active-line');
    activeLine.style.width = `${activeButton.offsetWidth}px`;
    activeLine.style.left = `${activeButton.offsetLeft}px`;
});
