// js/explore.js
async function loadAllUsers() {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const usersContainer = document.getElementById('usersList');
        
        if (!users || users.length === 0) {
            usersContainer.innerHTML = '<p class="no-users">لا يوجد كتاب بعد</p>';
            return;
        }
        
        usersContainer.innerHTML = '';
        
        for (const user of users) {
            const { count } = await supabase
                .from('posts')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id);
            
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.setAttribute('data-name', user.full_name.toLowerCase());
            userCard.innerHTML = `
                <img src="images/default-avatar.png" alt="${user.full_name}">
                <h3>${user.full_name}</h3>
                <p>${user.bio ? user.bio.substring(0, 50) + '...' : 'كاتب في مدونتي'}</p>
                <div class="user-stats">
                    <span>📝 ${count || 0} مقال</span>
                </div>
                <a href="user-profile.html?id=${user.id}" class="btn-view">زيارة المدونة</a>
            `;
            usersContainer.appendChild(userCard);
        }
    } catch (error) {
        console.error('خطأ:', error);
        document.getElementById('usersList').innerHTML = '<p class="error">حدث خطأ في التحميل</p>';
    }
}

document.getElementById('searchUsers')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const userCards = document.querySelectorAll('.user-card');
    
    userCards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        if (name.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

loadAllUsers();
