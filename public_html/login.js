document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorLogin');


    if (user === 'admin' && pass === '2026') {
       
        sessionStorage.setItem('autenticado', 'true');
  
        window.location.href = 'index.html';
    } else {
        errorMsg.style.display = 'block';
    }
});