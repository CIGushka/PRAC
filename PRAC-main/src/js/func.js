document.addEventListener('click', function(event) {
  var menu = document.getElementById('menu');
  var searchMenu = document.getElementById('searchMenu');
  var linksMenu = document.getElementById('linksMenu');
  var authMenu = document.getElementById('authMenu');
  var sidebar = document.querySelector('.sidebar');
  var dropdownContent = document.getElementById('dropdown-content');
  var LengButton = document.getElementById('LengButton');

  if (!sidebar.contains(event.target) && !dropdownContent.contains(event.target)) {
      menu.style.display = 'none';
      searchMenu.style.display = 'none';
      linksMenu.style.display = 'none';
      authMenu.style.display = 'none';
      dropdownContent.style.display = 'none';
  }
});

function toggleMenu(menuId) {
  var menu = document.getElementById(menuId);
  var otherMenus = ['menu', 'searchMenu', 'linksMenu', 'authMenu'].filter(id => id !== menuId).map(id => document.getElementById(id));

  if (menu.style.display === 'block') {
      menu.style.display = 'none';
  } else {
      menu.style.display = 'block';
      otherMenus.forEach(m => m.style.display = 'none');
  }
}

function toggleDropdown() {
  var dropdownContent = document.getElementById('dropdown-content');
  if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
  } else {
      dropdownContent.style.display = 'block';
  }
}

function LengButton(button) {
  button.classList.toggle('active');
}

var btnContainer = document.getElementsById("trigger");
var btns = btnContainer.getElementsByClassName("iconbtn");
console.log(Array.from(btns));

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("activebtn");
    current[0].className = current[0].className.replace(" activebtn", "");
    this.className += " activebtn";
  });
}

function selectKeyword(keyword) {
  document.querySelector('.dropdown-btn').value = keyword;
  document.getElementById('dropdown-content').style.display = 'none';
}

function search() {
  var searchInput = document.getElementById('searchInput').value;
  var selectedKeyword = document.querySelector('.dropdown-btn').value;

  if (selectedKeyword !== 'Выберите ключевое слово' && selectedKeyword !== '') {
      alert('Искать по ключевому слову: ' + selectedKeyword);
  } else if (searchInput) {
      alert('Искать: ' + searchInput);
  } else {
      alert('Введите текст для поиска или выберите ключевое слово.');
  }
}

function login() {
  var login = document.getElementById('login').value;
  var password = document.getElementById('password').value;

  if (login && password) {
      alert('Вход выполнен с логином: ' + login);
      alert('Введите логин и пароль.');
  }
}


// Глобальная переменная для хранения выбранного ключа
let selectedKeyword = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Собираем уникальные ключевые слова
    const keywordMap = new Map();
    articles.forEach(article => {
        article.keywords.forEach(k => {
            const lowerK = k.toLowerCase();
            if (!keywordMap.has(lowerK)) keywordMap.set(lowerK, k);
        });
    });

    // Заполняем выпадающий список
    const dropdownContent = document.getElementById('dropdown-content');
    Array.from(keywordMap.values())
        .sort()
        .forEach(keyword => {
            const link = document.createElement('a');
            link.href = '#';
            link.innerHTML = keyword;
            link.onclick = () => selectKeyword(keyword);
            dropdownContent.appendChild(link);
        });
});

// Функция выбора ключевого слова
function selectKeyword(keyword) {
    selectedKeyword = keyword;
    document.getElementById('keywordInput').value = keyword;
    toggleDropdown(); // Скрываем выпадающий список после выбора
}

// Переключение видимости выпадающего списка
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-content');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Выполнение поиска
function performSearch() {
    if (!selectedKeyword) {
        alert('Пожалуйста, выберите ключевое слово');
        return;
    }
    window.location.href = `search.html?keyword=${encodeURIComponent(selectedKeyword.toLowerCase())}`;
}

// Закрытие выпадающего списка при клике вне его
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.getElementById('dropdown-content').style.display = 'none';
    }
});


function copyToClipboard() {
  const text = document.getElementById('textSource').innerText;
  const statusDiv = document.getElementById('status');

  // Современный API (работает на HTTPS)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => showStatus("✅ Скопировано!", "green"))
      .catch(err => {
        console.error("Ошибка API:", err);
        copyFallback(text); // Пробуем старый метод
      });
  } else {
    copyFallback(text); // Для старых браузеров
  }
}

function copyFallback(text) {
  // Создаем временный элемент
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  
  try {
    textarea.select();
    const success = document.execCommand("copy");
    showStatus("✅ Скопировано (через fallback)", "green");
  } catch (err) {
    showStatus("❌ Ошибка копирования", "red");
    console.error("Fallback error:", err);
  } finally {
    document.body.removeChild(textarea);
  }
}

function showStatus(message, color) {
  const statusDiv = document.getElementById("status");
  statusDiv.textContent = message;
  statusDiv.style.color = color;
  setTimeout(() => statusDiv.textContent = "", 2000);
}