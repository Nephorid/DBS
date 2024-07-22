$(document).ready(function() {
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

    $.ajax({
        url: '../php/get_system_info1.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.error) {
                console.error(response.error);
                $('#departmentCounts').html('<p>Hata: ' + response.error + '</p>');
            } else {
                var departmentCountsHtml = '';
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

    $('#addBranchForm').on('submit', function(event) {
        event.preventDefault();
        var branchName = $('#branchName').val();
        $.ajax({
            url: '../php/add_department.php',
            type: 'POST',
            data: { name: branchName },
            success: function(response) {
                if (response.success) {
                    alert('İdari birim başarıyla eklendi.');
                    $('#addBranchModal').modal('hide');
                    $('#branchName').val('');
                    loadDepartments(); 
                } else {
                    alert('Hata: ' + response.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('AJAX hatası: ' + textStatus + ', ' + errorThrown);
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

    loadDepartments();
    
    $(document).ready(function() {
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
      });
      

    $('#deleteBranchForm').on('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');
        var departmentId = $('#branchSelect').val();
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
                    console.error('Sunucudan gelen yanıt:', response);
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
      
});
