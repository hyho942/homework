(function () {
  /*
    본 코드는 todos 배열을 한 단계만 deepCopy한 예제입니다. (얕은 복사, shallow copy)
    실제로 만약 todos의 데이터 구조가 바뀌어 배열안에 객체안에 객체, 혹은 그 이상이 있다면 그 깊이까지 deepCopy를 해주어야하고,
    일반적인 경우, deepCopy를 해주는 라이브러리를 사용하는 것이 더 효율적입니다.
    immer 혹은 immutable 라이브러리를 검색해보세요!
  */

  /* =========
      MODEL
  =========== */
  let todos = [
    // { id: 1, content: 'angular', completed: false },
    // { id: 2, content: 'react', completed: true },
    // { id: 3, content: 'vue', completed: false }
  ];

  /* ========
      VIEW
  =========== */
  const $ul = document.querySelector('.todos');

  // 현재 filter값을 구하는 함수
  function getFilter() {
    let filter;
    [...document.querySelector('.nav').children].forEach(li => {
      if (li.classList.contains('active')) {
        filter = li.id;
      }
    });
    return filter;
  }

  // 필터링된 Todos 배열을 가져오는 함수.
  function getFilteredTodos(filter) {
    if (filter === 'active') {
      return todos.filter(todo => todo.completed === false);
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }
    return todos;
  }

  // 배열이 바뀌었을 때 화면을 렌더랑하는 함수
  function render(res) {
    console.log(res);
    // 원래 있는 Todo들을 화면에서 비워줍니다.
    $ul.textContent = '';

    // 선택된 필터를 가져옵나다.
    const filter = getFilter();

    // 선택된 필터를 기반으로 필터링된 todos 배열을 가져옵니다.
    const filteredTodos = getFilteredTodos(filter);

    // 필터링된 Todos 배열을 기반으로 Todo를 화면에 그려줍니다.
    filteredTodos.forEach(({ id, content, completed }) => {
      // ul.todos 요소 안에 들어갈 li, input, label, i 태그를 생성합니다.
      const $li = document.createElement('li');
      const $checkbox = document.createElement('input');
      const $label = document.createElement('label');
      const $removeButton = document.createElement('i');

      // 각 요소들에 속성, id, class를 부여합니다.
      $li.id = id;
      $li.classList.add('todo-item');

      $checkbox.setAttribute('type', 'checkbox');
      $checkbox.classList.add('custom-checkbox');
      $checkbox.id = `ck-${id}`;
      if (completed) {
        $checkbox.setAttribute('checked', 'checked');
      }

      $label.setAttribute('for', `ck-${id}`);
      $label.textContent = content;

      $removeButton.className = 'remove-todo far fa-times-circle';

      // input(체크 박스), label(할일 내용), i(삭제버튼) 요소를 li태그에 집어넣어줍니다.
      $li.appendChild($checkbox);
      $li.appendChild($label);
      $li.appendChild($removeButton);

      // ul.todos 요소에 채워진 li 태그를 집어넣어줍니다.
      $ul.appendChild($li);
    });

    // 완료된 할 일 갯수를 넣어줍니다.
    document.querySelector('.completed-todos').textContent = todos.filter(
      todo => todo.completed === true
    ).length;

    // 완료되지 않은 할 일 갯수를 넣어줍니다.
    document.querySelector('.active-todos').textContent = todos.filter(
      todo => todo.completed === false
    ).length;
  }

  /* ===============
      CONTROLLER
  ================= */
  // 새 할 일의 id를 생성해 주는 함수
  function generateId() {
    return todos[0] ? Math.max(...todos.map(todo => todo.id)) + 1 : 0;
  }

  // 할일을 deepCopy해주는 함수
  function deepCopy() {
    return todos.map(todo => ({ ...todo }));
  }

  // 할 일을 추가하는 함수
  function addTodo(content) {
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: generateId(), content, completed: false })
    })
      .then(res => res.json())
      .then(res => (todos = res))
      .then(render)
      .catch(console.error);
  }

  // 특정 할 일의 완료 상태를 반대로 바꿔주는 함수
  function toggleTodo(target) {
    fetch(`/todos/${target.id.slice(3)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: target.checked })
    })
      .then(res => res.json())
      .then(res => (todos = res))
      .then(render)
      .catch(console.error);
  }

  // 특정 할 일을 삭제해주는 함수
  function removeTodo(id) {
    fetch(`/todos/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => (todos = res))
      .then(render)
      .catch(console.error);
  }

  // 모든 할 일을 인자에 따라 true나 false로 바꿔주는 함수
  function toggleAllTodos(boolean) {
    // deepCopy
    // const deepCopiedTodos = deepCopy();
    // todos = deepCopiedTodos.map(todo => {
    //   todo.completed = boolean;
    //   return todo;
    // });
    // render();
    console.log(boolean);
    fetch('./todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: boolean })
    })
      .then(res => res.json())
      .then(res => (todos = res))
      .then(render)
      .catch(console.log);
  }

  /* ======================
      ADD EVENT HANDLER
  ======================== */
  // todos가 하나라도 false라면 Mark all as complete 버튼의 체크를 지운다.
  function uncheckToggleAllTodosButton() {
    if (todos.some(todo => todo.completed === false) || !todos[0]) {
      document.querySelector('#ck-complete-all').checked = false;
    }
  }

  // input에서 엔터를 눌렀다 띄었을 때 할일을 추가해주는 이벤트 핸들러
  document.querySelector('.input-todo').onkeyup = function (e) {
    if (e.keyCode === 13 && e.target.value.trim()) {
      addTodo(e.target.value);
      e.target.value = '';
    }
  };

  // checkbox가 토글되었을 때 할 일의 완료상태를 토글해주는 이벤트 핸들러
  document.querySelector('.todos').onchange = function (e) {
    if (e.target.classList.contains('custom-checkbox')) {
      toggleTodo(e.target);
      uncheckToggleAllTodosButton();
    }
  };

  // 삭제 버튼을 클릭했을 때 할 일을 삭제해주는 이벤트 핸들러
  document.querySelector('.todos').onclick = function (e) {
    if (e.target.classList.contains('remove-todo')) {
      removeTodo(+e.target.parentNode.id);
    }
  };

  // 버튼을 클릭했을 때 모든 할 일의 완료상태를 체크 상태에 따라 true 혹은 false로 바꿔주는 이벤트 핸들러
  document.querySelector('#ck-complete-all').onclick = function (e) {
    toggleAllTodos(e.target.checked);
  };

  // 버튼을 클릭했을 때 완료된 할 일을 모두 지워주는 함수.
  document.querySelector('.clear-completed > .btn').onclick = function (e) {
    const deepCopiedTodos = deepCopy();
    todos = deepCopiedTodos.filter(todo => todo.completed === false);
    render();
    uncheckToggleAllTodosButton();
  };

  // 해당 필터 메뉴를 클릭했을 때, 해당 메뉴에만 active 클래스를 부여하고 렌더링하는 함수
  document.querySelector('.nav').onclick = function (e) {
    if (e.target.nodeName === 'LI') {
      [...this.children].forEach(li => {
        li.classList.remove('active');
        e.target.classList.add('active');
      });
      render();
    }
  };
  fetch('/todos')
    .then(res => res.json())
    .then(res => (todos = res))
    .then(render)
    .catch(console.log);
}());
