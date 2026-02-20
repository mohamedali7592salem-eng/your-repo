<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ملفي الشخصي - مدونتي</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>
    <nav class="top-nav">
        <div class="container">
            <div class="nav-left">
                <a href="index.html" class="logo">📝 مدونتي</a>
            </div>
            <div class="nav-right">
                <a href="index.html">الرئيسية</a>
                <a href="my-profile.html" class="active">ملفي</a>
                <a href="new-post.html">➕ مقال جديد</a>
                <button onclick="logout()" class="btn-logout">تسجيل خروج</button>
            </div>
        </div>
    </nav>

    <div class="profile-container">
        <div class="profile-header">
            <div class="container">
                <div class="profile-cover">
                    <img src="images/default-cover.jpg" alt="غلاف الملف" id="coverImage">
                </div>
                
                <div class="profile-info">
                    <div class="profile-avatar">
                        <img src="images/default-avatar.png" alt="الصورة الشخصية" id="profileImage">
                    </div>
                    
                    <div class="profile-details">
                        <h1 id="profileName">جاري التحميل...</h1>
                        <p id="profileBio"></p>
                        
                        <div class="profile-stats">
                            <div class="stat">
                                <span class="stat-value" id="postsCount">0</span>
                                <span class="stat-label">مقالات</span>
                            </div>
                        </div>
                        
                        <div class="profile-actions">
                            <button class="btn-primary" onclick="showEditProfile()">تعديل الملف</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile-content">
            <div class="container">
                <h2>مقالاتي</h2>
                <div class="posts-list" id="userPosts">
                    <div class="loading">جاري التحميل...</div>
                </div>
            </div>
        </div>
    </div>

    <!-- نافذة تعديل الملف الشخصي -->
    <div class="modal" id="editProfileModal" style="display: none;">
        <div class="modal-content">
            <span class="close" onclick="hideEditProfile()">&times;</span>
            <h2>تعديل الملف الشخصي</h2>
            
            <form id="editProfileForm">
                <div class="form-group">
                    <label>الاسم</label>
                    <input type="text" id="editName" required>
                </div>
                
                <div class="form-group">
                    <label>نبذة عني</label>
                    <textarea id="editBio" rows="3"></textarea>
                </div>
                
                <button type="submit" class="btn-primary">حفظ التعديلات</button>
            </form>
        </div>
    </div>

    <script src="js/supabase-config.js"></script>
    <script src="js/profile.js"></script>
</body>
</html>
