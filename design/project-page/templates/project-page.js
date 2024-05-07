document.querySelector('.select-click').onclick = function(event) {
    var items = document.querySelector('.select-items');
    items.style.display = items.style.display === 'block' ? 'none' : 'block';
    event.stopPropagation();
  };

  const items = document.querySelectorAll('.select-item');
  items.forEach(item => {
      item.addEventListener('click', function(e) {
        const checkbox = this.querySelector('input[type=checkbox]');
        checkbox.checked = !checkbox.checked;
        e.preventDefault(); // Зупинка дії за замовчуванням
      });
    });

    // Close the dropdown if clicked outside
    window.onclick = function(event) {
      var dropdowns = document.getElementsByClassName("select-items");
      for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].style.display = 'none';
      }
    };