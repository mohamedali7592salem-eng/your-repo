Enter// js/main.js
async function loadLatestPosts() {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select(`
                *,
                users (
                    full_name,
                    avatar_url
                )
            `)
            .order('created_at', { ascending: false })
            .limit(6);
        
        if (error) throw error;
        
        const postsGrid = document.getElementById('latestPosts');
        
        if (!posts || posts.length === 0) {
            postsGrid.innerHTML = '<p class="no-posts">لا توجد مقالات بعد</p>';
            return;
        }
        
        postsGrid.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('article');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <h3>${post.title}</h3>
                <p class="post-excerpt">${post.content.substring(0, 150)}...</p>
                <div class="post-meta">
                    <span>✍️ ${post.users?.full_name || 'كاتب'}</span>
                    <span>📅 ${new Date(post.created_at).toLocaleDateString('ar-EG')}</span>
                </div>
                <a href="user-profile.html?id=${post.user_id}" class="read-more">اقرأ المزيد</a>
            `;
            postsGrid.appendChild(postCard);
        });
    } catch (error) {
        console.error('خطأ في تحميل المقالات:', error);
        document.getElementById('latestPosts').innerHTML = '<p class="error">حدث خطأ في التحميل</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadLatestPosts);
