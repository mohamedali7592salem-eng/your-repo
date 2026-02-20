// js/edit-post.js
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (!postId) {
    window.location.href = 'my-profile.html';
}

async function loadPost() {
    try {
        const { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single();
        
        if (error) throw error;
        
        document.getElementById('postId').value = post.id;
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postContent').value = post.content;
    } catch (error) {
        console.error('خطأ:', error);
        alert('لا يمكن تحميل المقال');
        window.location.href = 'my-profile.html';
    }
}

document.getElementById('editPostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    try {
        const { error } = await supabase
            .from('posts')
            .update({
                title: title,
                content: content,
                updated_at: new Date()
            })
            .eq('id', postId);
        
        if (error) throw error;
        
        alert('✅ تم تعديل المقال بنجاح');
        window.location.href = 'my-profile.html';
    } catch (error) {
        alert('خطأ: ' + error.message);
    }
});

loadPost();
