# Testler Modülü

Bu klasör, her konu için bir test sayfası içerir. Ortak motor
`_shared/test-engine.js` ve stil `_shared/test-style.css` altındadır.

## Kullanım
- Her test sayfası: `/testler/<slug>/index.html`
- Firebase oturumu şarttır. Giriş yoksa `/kayit/index.html`'e yönlendirilir.
- Sonuçlar `users/{uid}/generalTests/{testId}` altına yazılır.

## Not
`firebase-init.js` proje kökünde olmalı ve `export const auth, db` sağlamalıdır.