// سكربت كشف المخفي + حماية البروفايل من الفتح + إعداد الرانك
(function() {
    console.log("✅ تم تحميل سكربت ستيفن برو");

    // 1. كشف المستخدمين المخفيين
    function revealHiddenUsers() {
        const users = document.querySelectorAll('.uzr[style*="display:none"], .uzr[style*="visibility:hidden"], .uzr[hidden], .uzr[aria-hidden="true"]');
        users.forEach(user => {
            user.style.display = 'block';
            user.style.visibility = 'visible';
            user.hidden = false;
            user.setAttribute('aria-hidden', 'false');

            // وسم المستخدم كمخفي
            const tag = document.createElement('div');
            tag.innerHTML = '<span style="color: gold; font-weight: bold;">تم كشفه كمخفي | 🏠 الغرفة: غير معروفة</span>';
            user.appendChild(tag);
        });
    }

    // 2. منع فتح البروفايل نهائيًا من كل الأعضاء
    const observer = new MutationObserver(() => {
        const allUsers = document.querySelectorAll('[onclick^="upro("]');
        allUsers.forEach(el => {
            el.removeAttribute('onclick');
            el.style.pointerEvents = 'none';
            el.style.cursor = 'not-allowed';
            el.title = '🚫 غير مسموح بفتح البروفايل';
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 3. إعداد الرانك مباشرة عند الدخول
    const targetRank = 9000;
    const userDivs = document.querySelectorAll('.uzr');
    userDivs.forEach(div => {
        if (div.hasAttribute('v')) {
            div.setAttribute('v', targetRank);
        }
    });

    // تنفيذ فوري + كل ثانيتين تحديث تلقائي
    revealHiddenUsers();
    setInterval(revealHiddenUsers, 2000);
})();
