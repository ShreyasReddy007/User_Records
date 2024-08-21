document.addEventListener('DOMContentLoaded', function () {
    fetchUsers();

    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userId = document.getElementById('userId').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (userId) {
            updateUser(userId, name, email);
        } else {
            addUser(name, email);
        }
    });
});

function fetchUsers() {
    fetch('fetch.php')
        .then(response => response.json())
        .then(data => {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = '';
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td class="actions">
                        <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;
                usersList.appendChild(row);
            });
        });
}

function addUser(name, email) {
    fetch('db.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, action: 'add' })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
        fetchUsers();
        resetForm();
    });
}

function updateUser(id, name, email) {
    fetch('db.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, name: name, email: email, action: 'update' })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
        fetchUsers();
        resetForm();
    });
}

function deleteUser(id) {
    fetch('db.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, action: 'delete' })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
        fetchUsers();
    });
}

function editUser(id, name, email) {
    document.getElementById('userId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
}

function resetForm() {
    document.getElementById('userId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}
