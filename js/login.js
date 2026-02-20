// js/login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        alert('✅ تم تسجيل الدخول بنجاح');
        window.location.href = 'my-profile.html';
    } catch (error) {
        console.error('خطأ:', error);
        alert('خطأ في تسجيل الدخول: ' + error.message);
    }
});
