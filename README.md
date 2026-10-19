# rntrainingfrontend

React Native 0.88 + React Navigation 7 (static configuration), terhubung ke `rn-training-backend`.

Folder ini hanya berisi sisi JavaScript. Folder native (`android/`, `ios/`) dibuat oleh React Native CLI, jadi proyeknya perlu dibuat dulu.

## Setup

1. Buat proyek dengan nama yang sama, di luar folder ini:

   ```bash
   npx @react-native-community/cli@latest init rntrainingfrontend
   ```

2. Salin `src/`, `App.tsx`, `index.js`, `app.json`, dan `package.json` dari folder ini ke proyek tersebut (timpa file bawaan), lalu pasang dependensi:

   ```bash
   npm install
   ```

   Di Mac untuk iOS, jalankan juga `bundle exec pod install` di folder `ios/`.

3. Android, dua perubahan dari [dokumentasi React Navigation](https://reactnavigation.org/docs/getting-started):

   `android/app/src/main/java/com/rntrainingfrontend/MainActivity.kt`:

   ```kotlin
   import android.os.Bundle
   import com.swmansion.rnscreens.fragment.restoration.RNScreensFragmentFactory

   class MainActivity : ReactActivity() {
     // ...
     override fun onCreate(savedInstanceState: Bundle?) {
       supportFragmentManager.fragmentFactory = RNScreensFragmentFactory()
       super.onCreate(savedInstanceState)
     }
   }
   ```

   `android/app/src/main/AndroidManifest.xml`, di tag `<application>`:

   ```xml
   android:enableOnBackInvokedCallback="false"
   ```

4. Jalankan backend (`npm start` di `rn-training-backend`), lalu `npm run android`.

## Catatan

- Emulator Android memakai `http://10.0.2.2:3000`. Di HP fisik, ganti `BASE_URL` di `src/api.ts` dengan IP LAN komputer.
- Favorites disimpan di perangkat (AsyncStorage), karena backend tidak punya endpoint favorites.
- `npm run typecheck` menjalankan `tsc`.
- `npm test` bawaan template merender App template. Hapus `__tests__/App.test.tsx` atau tambahkan mock untuk modul native.