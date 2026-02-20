// js/new-post.js
async function checkAuth(){
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
    }
    return user;
}

document.getElementById('newPostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = await checkAuth();
    if (!user) return;
    
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    try {
        const { error } = await supabase
            .from('posts')
            .insert([
                {
                    title: title,
                    content: content,
                    user_id: user.id,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]);
        
        if (error) throw error;
        
        alert('✅ تم نشر المقال بنجاح');
        window.location.href = 'my-profile.html';
    } catch (error) {
        console.error('خطأ:', error);
        alert('خطأ: ' + error.message);
    }
});

checkAuth();
