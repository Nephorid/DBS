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
                <td data-filter="department_name">${item.department_name || ''}</td>
                <td data-filter="user_name">${item.user_name || ''}</td>
                <td data-filter="gsm">${item.gsm || ''}</td>
                <td data-filter="email">${item.email || ''}</td>
                <td data-filter="cpu_info">
                    <span class="cpu-markasi">${item.cpu_markasi || ''}</span> / 
                    <span class="cpu-modeli">${item.cpu_modeli || ''}</span> / 
                    <span class="cpu-hizi">${item.cpu_hizi || ''}</span>
                </td>
                <td data-filter="ram_size">
                    <span class="ram-size">${item.ram_size || ''}</span> / 
                    <span class="ram-type">${item.ram_type || ''}</span>
                </td>
                <td data-filter="disk_info">
                    <span class="disk1-markasi">${item.disk1_markasi || ''}</span> / 
                    <span class="disk1-modeli">${item.disk1_modeli || ''}</span> / 
                    <span class="disk1-boyutu">${item.disk1_boyutu || ''}</span> / 
                    <span class="disk1-turu">${item.disk1_turu || ''}</span><br>
                    <span class="disk2-markasi">${item.disk2_markasi || ''}</span> / 
                    <span class="disk2-modeli">${item.disk2_modeli || ''}</span> / 
                    <span class="disk2-boyutu">${item.disk2_boyutu || ''}</span> / 
                    <span class="disk2-turu">${item.disk2_turu || ''}</span>
                </td>
                <td data-filter="gpu_info">
                    <span class="gpu-brand">${item.gpu_brand || ''}</span> / 
                    <span class="gpu-model">${item.gpu_model || ''}</span> / 
                    <span class="gpu-memory">${item.gpu_memory || ''}</span>
                </td>
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
            document.getElementById('editUserName').value = item.user_name || '';
            document.getElementById('editEmail').value = item.email || '';
            document.getElementById('editGsm').value = item.gsm || '';
            document.getElementById('editCpuMarkasi').value = item.cpu_markasi || '';
            document.getElementById('editCpuModeli').value = item.cpu_modeli || '';
            document.getElementById('editCpuHizi').value = item.cpu_hizi || '';
            document.getElementById('editRamSize').value = item.ram_size || '';
            document.getElementById('editRamType').value = item.ram_type || '';
            document.getElementById('editDisk1Markasi').value = item.disk1_markasi || '';
            document.getElementById('editDisk1Modeli').value = item.disk1_modeli || '';
            document.getElementById('editDisk1Boyutu').value = item.disk1_boyutu || '';
            document.getElementById('editDisk1Turu').value = item.disk1_turu || '';
            document.getElementById('editDisk2Markasi').value = item.disk2_markasi || '';
            document.getElementById('editDisk2Modeli').value = item.disk2_modeli || '';
            document.getElementById('editDisk2Boyutu').value = item.disk2_boyutu || '';
            document.getElementById('editDisk2Turu').value = item.disk2_turu || '';
            document.getElementById('editGpuModel').value = item.gpu_model || '';
            document.getElementById('editGpuMemory').value = item.gpu_memory || '';
            document.getElementById('editGpuBrand').value = item.gpu_brand || '';

            fetch('../php/get_departments.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const departmentSelect = document.getElementById('editDepartmentId');
                    departmentSelect.innerHTML = '<option value="">Birim Seçin</option>';
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
        document.getElementById('editUserName').value = item.user_name || '';
        document.getElementById('editEmail').value = item.email || '';
        document.getElementById('editGsm').value = item.gsm || '';
        document.getElementById('editCpuMarkasi').value = item.cpu_markasi || '';
        document.getElementById('editCpuModeli').value = item.cpu_modeli || '';
        document.getElementById('editCpuHizi').value = item.cpu_hizi || '';
        document.getElementById('editRamSize').value = item.ram_size || '';
        document.getElementById('editRamType').value = item.ram_type || '';
        document.getElementById('editDisk1Markasi').value = item.disk1_markasi || '';
        document.getElementById('editDisk1Modeli').value = item.disk1_modeli || '';
        document.getElementById('editDisk1Boyutu').value = item.disk1_boyutu || '';
        document.getElementById('editDisk1Turu').value = item.disk1_turu || '';
        document.getElementById('editDisk2Markasi').value = item.disk2_markasi || '';
        document.getElementById('editDisk2Modeli').value = item.disk2_modeli || '';
        document.getElementById('editDisk2Boyutu').value = item.disk2_boyutu || '';
        document.getElementById('editDisk2Turu').value = item.disk2_turu || '';
        document.getElementById('editGpuModel').value = item.gpu_model || '';
        document.getElementById('editGpuMemory').value = item.gpu_memory || '';
        document.getElementById('editGpuBrand').value = item.gpu_brand || '';

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
    .then(response => response.text())  // JSON yerine metin olarak al
    .then(text => {
        try {
            const data = JSON.parse(text);  // JSON parse et
            if (data.status === 'success') {
                alert('Bilgiler başarıyla güncellendi.');
                fetchSystemInfo();
                $('#editModal').modal('hide');
            } else {
                alert('Bilgiler güncellenirken hata oluştu: ' + data.message);
            }
        } catch (error) {
            console.error('JSON parse hatası:', error);
            console.log('Sunucu cevabı:', text);  // Gelen cevabı konsola yazdır
            alert('Sunucu hatası: Beklenmedik bir cevap alındı.');
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

    // Sütunların gizlenmesi/gösterilmesi
    var spanClassMap = {
        'cpu_markasi': '.cpu-markasi',
        'cpu_modeli': '.cpu-modeli',
        'cpu_hizi': '.cpu-hizi',
        'ram_size': '.ram-size',
        'ram_type': '.ram-type',
        'disk1_markasi': '.disk1-markasi',
        'disk1_modeli': '.disk1-modeli',
        'disk1_boyutu': '.disk1-boyutu',
        'disk1_turu': '.disk1-turu',
        'disk2_markasi': '.disk2-markasi',
        'disk2_modeli': '.disk2-modeli',
        'disk2_boyutu': '.disk2-boyutu',
        'disk2_turu': '.disk2-turu',
        'gpu_brand': '.gpu-brand',
        'gpu_model': '.gpu-model',
        'gpu_memory': '.gpu-memory'
    };

    if (spanClassMap[column]) {
        $(spanClassMap[column]).toggle();
        var isVisible = $(spanClassMap[column]).is(':visible');
        $(this).find('.column-checkbox').prop('checked', isVisible);
    } else {
        var columnCells = $(`table th:nth-child(${column + 1}), table td:nth-child(${column + 1})`);
        var isVisible = columnCells.is(':visible');
        $(this).find('.column-checkbox').prop('checked', !isVisible);
        if (isVisible) {
            columnCells.hide();
        } else {
            columnCells.show();
        }
    }
    saveColumnVisibility();
});

function saveColumnVisibility() {
    var columnVisibility = [];
    $('.toggle-column').each(function() {
        var column = $(this).data('column');
        var isVisible = false;

        var spanClassMap = {
            'cpu_markasi': '.cpu-markasi',
            'cpu_modeli': '.cpu-modeli',
            'cpu_hizi': '.cpu-hizi',
            'ram_size': '.ram-size',
            'ram_type': '.ram-type',
            'disk1_markasi': '.disk1-markasi',
            'disk1_modeli': '.disk1-modeli',
            'disk1_boyutu': '.disk1-boyutu',
            'disk1_turu': '.disk1-turu',
            'disk2_markasi': '.disk2-markasi',
            'disk2_modeli': '.disk2-modeli',
            'disk2_boyutu': '.disk2-boyutu',
            'disk2_turu': '.disk2-turu',
            'gpu_brand': '.gpu-brand',
            'gpu_model': '.gpu-model',
            'gpu_memory': '.gpu-memory'
        };

        if (spanClassMap[column]) {
            isVisible = $(spanClassMap[column]).is(':visible');
        } else {
            isVisible = $(`table th:nth-child(${column + 1}), table td:nth-child(${column + 1})`).is(':visible');
        }

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

            var spanClassMap = {
                'cpu_markasi': '.cpu-markasi',
                'cpu_modeli': '.cpu-modeli',
                'cpu_hizi': '.cpu-hizi',
                'ram_size': '.ram-size',
                'ram_type': '.ram-type',
                'disk1_markasi': '.disk1-markasi',
                'disk1_modeli': '.disk1-modeli',
                'disk1_boyutu': '.disk1-boyutu',
                'disk1_turu': '.disk1-turu',
                'disk2_markasi': '.disk2-markasi',
                'disk2_modeli': '.disk2-modeli',
                'disk2_boyutu': '.disk2-boyutu',
                'disk2_turu': '.disk2-turu',
                'gpu_brand': '.gpu-brand',
                'gpu_model': '.gpu-model',
                'gpu_memory': '.gpu-memory'
            };

            if (spanClassMap[column]) {
                if (isVisible === undefined || isVisible) {
                    $(spanClassMap[column]).show();
                    $(this).find('.column-checkbox').prop('checked', true);
                } else {
                    $(spanClassMap[column]).hide();
                    $(this).find('.column-checkbox').prop('checked', false);
                }
            } else {
                var columnCells = $(`table th:nth-child(${column + 1}), table td:nth-child(${column + 1})`);
                if (isVisible) {
                    columnCells.show();
                    $(this).find('.column-checkbox').prop('checked', true);
                } else {
                    columnCells.hide();
                    $(this).find('.column-checkbox').prop('checked', false);
                }
            }
        });
    } else {
        // Varsayılan olarak tüm span'ları görünür yap
        $('.toggle-column').each(function() {
            var column = $(this).data('column');
            var spanClassMap = {
                'cpu_markasi': '.cpu-markasi',
                'cpu_modeli': '.cpu-modeli',
                'cpu_hizi': '.cpu-hizi',
                'ram_size': '.ram-size',
                'ram_type': '.ram-type',
                'disk1_markasi': '.disk1-markasi',
                'disk1_modeli': '.disk1-modeli',
                'disk1_boyutu': '.disk1-boyutu',
                'disk1_turu': '.disk1-turu',
                'disk2_markasi': '.disk2-markasi',
                'disk2_modeli': '.disk2-modeli',
                'disk2_boyutu': '.disk2-boyutu',
                'disk2_turu': '.disk2-turu',
                'gpu_brand': '.gpu-brand',
                'gpu_model': '.gpu-model',
                'gpu_memory': '.gpu-memory'
            };

            if (spanClassMap[column]) {
                $(spanClassMap[column]).show();
                $(this).find('.column-checkbox').prop('checked', true);
            } else {
                var columnCells = $(`table th:nth-child(${column + 1}), table td:nth-child(${column + 1})`);
                columnCells.show();
                $(this).find('.column-checkbox').prop('checked', true);
            }
        });
    }
}

$(document).ready(function() {
    applyColumnVisibility();
});


$(document).ready(function() {
    $('#profileSettingsModal').on('show.bs.modal', function () {
      $.ajax({
        url: '../php/get_user_profile.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          if (response.error) {
            console.error(response.error);
          } else {
            $('#profileUsername').val(response.username);
            $('#profileGsm').val(response.gsm);
            $('#profileEmail').val(response.email);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('AJAX hatası: ' + textStatus + ', ' + errorThrown);
        }
      });
    });
  
    $('#profileSettingsForm').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        url: '../php/update_profile.php',
        type: 'POST',
        data: $(this).serialize(),
        success: function(response) {
          alert('Profil başarıyla güncellendi!');
          $('#profileSettingsModal').modal('hide');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('AJAX hatası: ' + textStatus + ', ' + errorThrown);
          alert('Bir hata oluştu!');
        }
      });
    });
});


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

$(document).ready(function() {
    const departmentTypes = {
      1: ['Daire Başkanlığı', 'Müdürlük', 'Koordinatörlük', 'Genel Sekreterlik', 'Komisyon'], // İdari
      2: ['Yüksekokul', 'Meslek Yüksekokulu', 'Fakülte', 'Enstitü'], // Akademik
      3: ['Araştırma Merkezi'], // Araştırma
      4: ['Diğer'] // Diğer
    };
  
    $('#categorySelect').change(function() {
      const selectedCategory = $(this).val();
      const departmentTypeSelect = $('#departmentTypeSelect');
      departmentTypeSelect.empty();
      departmentTypeSelect.append('<option value="" selected disabled>Birim Türü Seçin</option>');
  
      if (departmentTypes[selectedCategory]) {
        departmentTypes[selectedCategory].forEach(function(type) {
          departmentTypeSelect.append('<option value="' + type + '">' + type + '</option>');
        });
      }
    });
  
    // Formun gönderilmesi (Örneğin PHP'ye veri gönderimi)
    $('#addBranchForm').submit(function(event) {
      event.preventDefault();
      const formData = $(this).serialize();
      
      $.ajax({
        url: '../php/add_department.php',
        type: 'POST',
        data: formData,
        success: function(response) {
          alert('Birim başarıyla eklendi!');
          $('#addBranchModal').modal('hide');
          // Gerekirse formu temizleyebilir ve/veya sayfayı yenileyebilirsiniz
        },
        error: function(error) {
          alert('Birim eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
      });
    });
  });
  