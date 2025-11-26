
let todos = [];
let editId = null;

function render() {
    const list = document.getElementById('todoList');
    const empty = document.getElementById('emptyState');
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    const filtered = todos.filter(t => t.text.toLowerCase().includes(search));
    
    if (filtered.length === 0) {
        list.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    
    empty.style.display = 'none';
    list.innerHTML = filtered.map(todo => `
        <div class="todo-item ${todo.done ? 'completed' : ''}">
            <input 
                type="checkbox" 
                ${todo.done ? 'checked' : ''} 
                onchange="toggle(${todo.id})"
                class="form-check-input"
            >
            <span class="todo-text">${todo.text}</span>
            <button onclick="edit(${todo.id})" class="btn btn-sm btn-warning">Edit</button>
            <button onclick="remove(${todo.id})" class="btn btn-sm btn-danger">Hapus</button>
        </div>
    `).join('');
}

document.getElementById('todoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        if (editId) {
            todos.find(t => t.id === editId).text = text;
            editId = null;
            document.querySelector('button[type="submit"]').textContent = 'Tambah';
        } else {
            todos.push({ id: Date.now(), text: text, done: false });
        }
        input.value = '';
        render();
    }
});

document.getElementById('searchInput').addEventListener('input', render);

function toggle(id) {
    const todo = todos.find(t => t.id === id);
    todo.done = !todo.done;
    render();
}

function edit(id) {
    const todo = todos.find(t => t.id === id);
    document.getElementById('todoInput').value = todo.text;
    document.getElementById('todoInput').focus();
    editId = id;
    document.querySelector('button[type="submit"]').textContent = 'Update';
}

function remove(id) {
    if (confirm('Hapus tugas ini?')) {
        todos = todos.filter(t => t.id !== id);
        render();
    }
}

render();
