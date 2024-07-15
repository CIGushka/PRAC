document.addEventListener('click', function(event) {
  var menu = document.getElementById('menu');
  var searchMenu = document.getElementById('searchMenu');
  var linksMenu = document.getElementById('linksMenu');
  var authMenu = document.getElementById('authMenu');
  var sidebar = document.querySelector('.sidebar');
  var dropdownContent = document.getElementById('dropdown-content');

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
