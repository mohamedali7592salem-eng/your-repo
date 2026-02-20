// js/register.js
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const bio = document.getElementById('bio').value;
    
    if (password !== confirmPassword) {
        alert('كلمة المرور غير متطابقة');
        return;
    }
    
    try {
        // 1. إنشاء حساب في Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password
        });
        
        if (authError) throw authError;
        
        if (authData.user) {
            // 2. إضافة بيانات المستخدم في جدول users
            const { error: profileError } = await supabase
                .from('users')
                .insert([
                    {
                        id: authData.user.id,
                        full_name: fullName,
                        bio: bio || 'مرحباً، أنا عضو جديد في مدونتي',
                        avatar_url: 'default-avatar.png',
                        created_at: new Date()
                    }
                ]);
            
            if (profileError) throw profileError;
            
            alert('✅ تم إنشاء الحساب بنجاح!');
            window.location.href = 'my-profile.html';
        }
    } catch (error) {
        console.error('خطأ:', error);
        alert('خطأ: ' + error.message);
    }
});
