$(document).ready(function() {
    function loadDepartments() {
        fetch('../php/get_departments.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const branchSelect = document.getElementById('branchSelect');
                branchSelect.innerHTML = '<option selected disabled>İdari birim seçiniz...</option>';
                data.forEach(department => {
                    const option = document.createElement('option');
                    option.value = department.id;
                    option.textContent = department.name;
                    branchSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Şİdari birimler alınırken hata oluştu:', error);
            });
    }

    // İlk sayfa yüklendiğinde gerekli verileri getirir.
    loadDepartments();

    // İlk AJAX isteği (Sisteme ait bilgileri getirir)
    $.ajax({
        url: '../php/get_system_info1.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                console.error(response.error);
                $('#computerCount').text('Hata: ' + response.error);
            } else {
                $('#computerCount').text(response.computer_count);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX hatası: ' + textStatus + ', ' + errorThrown);
            $('#computerCount').text('AJAX hatası: ' + textStatus + ', ' + errorThrown);
        }
    });

    // İkinci AJAX isteği (Bölümlere ait bilgisayar sayısını getirir)
    $.ajax({
        url: '../php/get_system_info1.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                console.error(response.error);
                $('#departmentCounts').html('<p>Hata: ' + response.error + '</p>');
            } else {
                let departmentCountsHtml = '';
                response.department_counts.sort((a, b) => b.computer_count - a.computer_count);
                response.department_counts.forEach(function(department) {
                    if (department.computer_count > 0) {
                        departmentCountsHtml += '<p>' + department.department_name + ': ' + department.computer_count + ' bilgisayar</p>';
                    }
                });
                $('#departmentCounts').html(departmentCountsHtml);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX hatası: ' + textStatus + ', ' + errorThrown);
            $('#departmentCounts').html('<p>AJAX hatası: ' + textStatus + ', ' + errorThrown + '</p>');
        }
    });

    $(document).ready(function() {
        let formSubmitted = false;  // Formun daha önce gönderilip gönderilmediğini takip eder
    
        $('#addBranchForm').on('submit', function(event) {
            event.preventDefault();
    
            if (formSubmitted) return;  // Form zaten gönderildiyse, tekrar gönderme
    
            formSubmitted = true;  // Formun gönderildiğini işaretle
            $('#addBranchForm button[type="submit"]').prop('disabled', true);  // Butonu devre dışı bırak
    
            const branchName = $('#branchName').val();
            const categoryID = $('#categorySelect').val();
            const subcategoryID = $('#departmentTypeSelect').val();
    
            if (!branchName || !categoryID || !subcategoryID) {
                alert('Tüm alanları doldurmanız gerekmektedir.');
                formSubmitted = false;  // Eğer eksik veri varsa, formun gönderildiğini sıfırla
                $('#addBranchForm button[type="submit"]').prop('disabled', false);  // Butonu tekrar etkinleştir
                return;
            }
    
            $.ajax({
                url: '../php/add_department.php',
                type: 'POST',
                data: {
                    name: branchName,
                    category_id: categoryID,
                    subcategory_id: subcategoryID
                },
                success: function(response) {
                    if (response.success) {
                        alert('Birim başarıyla eklendi.');
                        $('#addBranchModal').modal('hide');
                        $('#branchName').val('');
                        loadDepartments();
                    } else {
                        alert('Hata: ' + response.error);
                    }
                    formSubmitted = false;  // Formun gönderildiğini sıfırla
                    $('#addBranchForm button[type="submit"]').prop('disabled', false);  // Butonu tekrar etkinleştir
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('AJAX hatası: ' + textStatus + ', ' + errorThrown);
                    formSubmitted = false;  // Formun gönderildiğini sıfırla
                    $('#addBranchForm button[type="submit"]').prop('disabled', false);  // Butonu tekrar etkinleştir
                }
            });
        });
    
        function loadDepartments() {
            fetch('../php/get_departments.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const branchSelect = document.getElementById('branchSelect');
                    branchSelect.innerHTML = '<option selected disabled>İdari birim seçiniz...</option>';
                    data.forEach(department => {
                        const option = document.createElement('option');
                        option.value = department.id;
                        option.textContent = department.name;
                        branchSelect.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Şİdari birimler alınırken hata oluştu:', error);
                });
        }
    
        // Kategori seçimine göre alt birim türlerini güncelleme
        const departmentTypes = {
            1: ['Daire Başkanlığı', 'Müdürlük', 'Koordinatörlük', 'Genel Sekreterlik', 'Komisyon'],
            2: ['Yüksekokul', 'Meslek Yüksekokulu', 'Fakülte', 'Enstitü'],
            3: ['Araştırma Merkezi'],
            4: ['Diğer']
        };
    
        $('#categorySelect').change(function() {
            const selectedCategory = $(this).val();
            const departmentTypeSelect = $('#departmentTypeSelect');
            departmentTypeSelect.empty();
            departmentTypeSelect.append('<option value="" selected disabled>Birim Türü Seçin</option>');
    
            if (departmentTypes[selectedCategory]) {
                departmentTypes[selectedCategory].forEach(function(type, index) {
                    departmentTypeSelect.append('<option value="' + (index + 1) + '">' + type + '</option>');
                });
            }
        });
    
        loadDepartments();
    });
    

    // Çıkış işlemi
    $('#logoutButton').click(function(e) {
        e.preventDefault();
        $.ajax({
            url: '../php/logout.php',
            type: 'GET',
            success: function() {
                window.location.href = '../index.html';
            },
            error: function() {
                alert('Çıkış yapılırken bir hata oluştu.');
            }
        });
    });

    // Birim silme işlemi
    $('#deleteBranchForm').on('submit', function(event) {
        event.preventDefault();
        const departmentId = $('#branchSelect').val();
        if (!departmentId) {
            alert('Lütfen bir İdari birim seçiniz.');
            return;
        }
        $.ajax({
            url: '../php/delete_departments.php',
            type: 'POST',
            data: { id: departmentId },
            success: function(response) {
                try {
                    var result = JSON.parse(response);
                    if (result.success) {
                        alert(result.message);
                        $('#deleteBranchModal').modal('hide');
                        $('#branchSelect').val('');
                        loadDepartments(); 
                    } else {
                        alert('Hata: ' + result.message);
                    }
                } catch (e) {
                    console.error('Yanıt JSON formatında değil:', e);
                    alert('Bir hata oluştu.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('AJAX hatası: ' + textStatus + ', ' + errorThrown);
                alert('AJAX hatası: ' + textStatus + ', ' + errorThrown);
            }
        });
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

    // Departman bilgisini gösteren bölümün açılıp kapanması
    $('#departmentToggle').click(function() {
        $('#departmentCounts').slideToggle();
    });
});
