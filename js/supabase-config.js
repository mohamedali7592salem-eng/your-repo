// js/supabase-config.js
const SUPABASE_URL = 'https://toqqvrhsumddbiqbyjdy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvcXF2cmhzdW1kZGJpcWJ5amR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTkwNjksImV4cCI6MjA4NzE3NTA2OX0.xIfU9gOFFcuOXVRMpIN1G1bZIPg5-Io8pvbuj7A9fYY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// دالة للتحقق من المستخدم الحالي
async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

// دالة لتسجيل الخروج
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = 'index.html';
    }
}

// تحديث واجهة المستخدم
async function updateNavUI() {
    const user = await getCurrentUser();
    const loggedInNav = document.getElementById('loggedInNav');
    const guestNav = document.getElementById('guestNav');
    
    if (user && loggedInNav && guestNav) {
        loggedInNav.style.display = 'flex';
        guestNav.style.display = 'none';
    } else if (loggedInNav && guestNav) {
        loggedInNav.style.display = 'none';
        guestNav.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', updateNavUI);
