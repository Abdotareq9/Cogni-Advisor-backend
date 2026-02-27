# Cogni-Advisor API - Postman Collection

## الاستخدام

1. استيراد الملف `Cogni-Advisor-API.postman_collection.json` في Postman
2. تأكد من تشغيل الخادم على `http://localhost:5000` (أو حدّث متغير `baseUrl` في المجموعة)
3. لاختبار المسارات المحمية:
   - نفّذ طلب **Login** أولاً
   - سيتم حفظ التوكن تلقائياً في متغير المجموعة `token`
   - الطلبات التالية ستستخدم التوكن في header `Authorization`
