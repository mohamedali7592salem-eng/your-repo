// js/view-profile.js
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

if (!userId) {
    window.location.href = 'explore.html';
}

async function loadUserProfile() {
    try {
        const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        
        if (error) throw error;
        
        document.getElementById('viewProfileName').textContent = userData.full_name;
        document.getElementById('viewProfileBio').textContent = userData.bio || 'لا توجد نبذة';
        
        const { count } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);
        
        document.getElementById('viewPostsCount').textContent = count || 0;
        
    } catch (error) {
        console.error('خطأ:', error);
        document.getElementById('viewProfileName').textContent = 'المستخدم غير موجود';
    }
}

async function loadUserPosts() {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const postsContainer = document.getElementById('viewUserPosts');
        
        if (!posts || posts.length === 0) {
            postsContainer.innerHTML = '<p class="no-posts">لا توجد مقالات بعد</p>';
            return;
        }
        
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content.substring(0, 200)}...</p>
                <div class="post-meta">
                    <span>📅 ${new Date(post.created_at).toLocaleDateString('ar-EG')}</span>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('خطأ:', error);
    }
}

loadUserProfile();
loadUserPosts();
