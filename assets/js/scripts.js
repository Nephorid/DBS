let currentPage = 1;
const recordsPerPage = 10;
let systemData = [];
let filteredData = [];
let currentSort = { column: '', order: 'asc' };

function fetchSystemInfo() {
    fetch('../php/get_system_info.php')
        .then(response => response.json())
        .then(data => {
            systemData = data;
            filteredData = data;
            displayPage(1);
            setupPagination();
            applyColumnVisibility();
        })
        .catch(error => console.error('Veri çekerken hata oluştu:', error));
}

function displayPage(page) {
    currentPage = page;
    const tableBody = document.querySelector('#systemInfoTable');
    tableBody.innerHTML = '';
    const start = (page - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const paginatedData = filteredData.slice(start, end);

    paginatedData.forEach(item => {
        const row = `
            <tr>
                <td data-filter="department_name">${item.department_name}</td>
                <td data-filter="user_name">${item.user_name}</td>
                <td data-filter="gsm">${item.gsm}</td>
                <td data-filter="email">${item.email}</td>
                <td data-filter="cpu_model">${item.cpu_model}</td>
                <td data-filter="ram_size">${item.ram_size} ${item.ram_type}</td>
                <td data-filter="disk_model">
                    Disk1: ${item.disk1_model} ${item.disk1_size} ${item.disk1_type} <br>
                    Disk2: ${item.disk2_model} ${item.disk2_size} ${item.disk2_type}
                </td>
                <td data-filter="gpu_model">${item.gpu_model} ${item.gpu_memory}</td>
                <td>
                    <button class="btn btn-link edit-btn" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#editModal" style="font-size: 18px;">
                        <i class="fas fa-cog"></i>
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const item = systemData.find(data => data.id == id);

            document.getElementById('editId').value = item.id;
            document.getElementById('editUserName').value = item.user_name;
            document.getElementById('editEmail').value = item.email;
            document.getElementById('editGsm').value = item.gsm;
            document.getElementById('editCpuModel').value = item.cpu_model;
            document.getElementById('editRamSize').value = item.ram_size;
            document.getElementById('editRamType').value = item.ram_type;
            document.getElementById('editDisk1Model').value = item.disk1_model;
            document.getElementById('editDisk1Size').value = item.disk1_size;
            document.getElementById('editDisk1Type').value = item.disk1_type;
            document.getElementById('editDisk2Model').value = item.disk2_model;
            document.getElementById('editDisk2Size').value = item.disk2_size;
            document.getElementById('editDisk2Type').value = item.disk2_type;
            document.getElementById('editGpuModel').value = item.gpu_model;
            document.getElementById('editGpuMemory').value = item.gpu_memory;

            fetch('../php/get_departments.php')
                .then(response => response.json())
                .then(data => {
                    const departmentSelect = document.getElementById('editDepartmentId');
                    departmentSelect.innerHTML = '<option value="">İdari birim Seçin</option>';
                    data.forEach(department => {
                        const option = document.createElement('option');
                        option.value = department.id;
                        option.textContent = department.name;
                        if (department.id == item.department_id) {
                            option.selected = true;
                        }
                        departmentSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('İdari birimler alınırken hata oluştu:', error));
        });
    });
    applyColumnVisibility();
}

function setupPagination() {
    const pageCount = Math.ceil(filteredData.length / recordsPerPage);
    const pagination = document.querySelector('#pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.innerHTML = `<a class="page-link" href="javascript:void(0);" onclick="displayPage(${i})">${i}</a>`;
        pagination.appendChild(pageItem);
    }
}

function filterTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterSelect = document.getElementById('filterSelect').value;

    filteredData = systemData.filter(item => {
        if (filterSelect) {
            const value = item[filterSelect]?.toLowerCase() || '';
            return value.includes(searchInput);
        } else {
            return Object.keys(item).some(key => item[key]?.toString().toLowerCase().includes(searchInput));
        }
    });

    if (currentSort.column) {
        sortTable(currentSort.column, currentSort.order);
    }

    displayPage(1);
    setupPagination();
}

function sortTable(column, order) {
    const compare = (a, b) => {
        if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
        return 0;
    };

    filteredData.sort(compare);
    currentSort = { column, order };

    displayPage(1);
    setupPagination();
}

document.getElementById('searchInput').addEventListener('input', filterTable);
document.getElementById('filterSelect').addEventListener('change', filterTable);

document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', function() {
        const column = this.getAttribute('data-sort');
        const order = currentSort.column === column && currentSort.order === 'asc' ? 'desc' : 'asc';
        sortTable(column, order);
    });
});

window.addEventListener('load', fetchSystemInfo);

document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');

    $('#editModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const id = button.data('id');
        const item = systemData.find(data => data.id == id);

        document.getElementById('editId').value = item.id;
        document.getElementById('editUserName').value = item.user_name;
        document.getElementById('editEmail').value = item.email;
        document.getElementById('editGsm').value = item.gsm;
        document.getElementById('editCpuModel').value = item.cpu_model;
        document.getElementById('editRamSize').value = item.ram_size;
        document.getElementById('editRamType').value = item.ram_type;
        document.getElementById('editDisk1Model').value = item.disk1_model;
        document.getElementById('editDisk1Size').value = item.disk1_size;
        document.getElementById('editDisk1Type').value = item.disk1_type;
        document.getElementById('editDisk2Model').value = item.disk2_model;
        document.getElementById('editDisk2Size').value = item.disk2_size;
        document.getElementById('editDisk2Type').value = item.disk2_type;
        document.getElementById('editGpuModel').value = item.gpu_model;
        document.getElementById('editGpuMemory').value = item.gpu_memory;

        fetch('../php/get_departments.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const departmentSelect = document.getElementById('editDepartmentId');
                departmentSelect.innerHTML = '<option value="">İdari birim Seçin</option>';
                data.forEach(department => {
                    const option = document.createElement('option');
                    option.value = department.id;
                    option.textContent = department.name;
                    if (department.id == item.department_id) {
                        option.selected = true;
                    }
                    departmentSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('İdari birimler alınırken hata oluştu:', error);
            });
    });

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch('../php/update_system_info.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Bilgiler başarıyla güncellendi.');
                fetchSystemInfo();
                $('#editModal').modal('hide');
            } else {
                alert('Bilgiler güncellenirken hata oluştu.');
            }
        })
        .catch(error => {
            console.error('Güncelleme sırasında hata oluştu:', error);
            alert('Bilgiler güncellenirken bir hata oluştu.');
        });
    });

    const fileUploader = document.getElementById('fileUploader');
    fileUploader.addEventListener('change', function() {
        const file = fileUploader.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('fileToUpload', file);

            fetch('../php/upload.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert('Dosya başarıyla yüklendi!');
                fetchSystemInfo();
            })
            .catch(error => {
                console.error('Hata oluştu:', error);
                alert('Dosya yükleme sırasında bir hata oluştu.');
            });
        }
    });

    const editModal = document.getElementById('editModal');
    editModal.addEventListener('hidden.bs.modal', function() {
        editForm.reset();
    });

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function() {
        if (confirm('Bu bilgisayarı silmek istediğinizden emin misiniz?')) {
            const id = document.getElementById('editId').value;
            deleteSystem(id);
        }
    });

    function deleteSystem(id) {
        fetch('../php/delete_system.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Silme işlemi başarısız oldu.');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Bilgisayar başarıyla silindi.');
                fetchSystemInfo();
                $('#editModal').modal('hide');
            } else {
                alert('Bilgisayar silinirken hata oluştu: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Silme sırasında hata oluştu:', error);
            alert('Bilgisayar silinirken bir hata oluştu.');
        });
    }
});

$(document).on('click', '.toggle-column', function(e) {
    e.preventDefault();
    var column = $(this).data('column');
    var columnCells = $(`table th:nth-child(${column + 1}), table td:nth-child(${column + 1})`);
    var isVisible = columnCells.is(':visible');
    $(this).find('.column-checkbox').prop('checked', !isVisible);
    if (isVisible) {
        columnCells.hide();
    } else {
        columnCells.show();
    }
    saveColumnVisibility();
});

function saveColumnVisibility() {
    var columnVisibility = [];
    $('.toggle-column').each(function() {
        var column = $(this).data('column');
        var isVisible = $(`table th:nth-child(${column + 1}), table td:nth-child(${column + 1})`).is(':visible');
        columnVisibility[column] = isVisible;
    });
    localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
}

function applyColumnVisibility() {
    var columnVisibility = JSON.parse(localStorage.getItem('columnVisibility'));
    if (columnVisibility) {
        $('.toggle-column').each(function() {
            var column = $(this).data('column');
            var isVisible = columnVisibility[column];
            $(this).find('.column-checkbox').prop('checked', isVisible);
            var columnCells = $(`table th:nth-child(${column + 1}), table td:nth-child(${column + 1})`);
            if (isVisible) {
                columnCells.show();
            } else {
                columnCells.hide();
            }
        });
    }
}

$(document).ready(function() {
    updateDropdownState();
    applyColumnVisibility();
});

function updateDropdownState() {
    $('.toggle-column').each(function() {
        var column = $(this).data('column');
        var isVisible = $(`table th:nth-child(${column + 1}), table td:nth-child(${column + 1})`).is(':visible');
        $(this).find('.column-checkbox').prop('checked', isVisible);
    });
}
