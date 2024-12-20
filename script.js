// Genişletilmiş kelime havuzu
const kelimeHavuzu = [
    "elma", "armut", "muz", "kiraz", "çilek", "şeftali", "kedi", "köpek", 
    "çorap", "kalem", "masa", "bilgisayar", "telefon", "televizyon", "bardak",
    "kitap", "defter", "saat", "araba", "uçak", "tren", "bisiklet", "gemi",
    "zeytin", "biber", "domates", "patates", "soğan", "marul", "salatalık", "havuç",
    "mantar", "zencefil", "limon", "portakal", "kavun", "karpuz", "nar", "kivi",
    "çikolata", "bisküvi", "cikolata", "dondurma", "kola", "bira", "şarap", "süt",
    "kek", "turt", "pasta", "kraker", "kuru", "çörek", "peynir", "yoğurt",
    "çay", "kahve", "su", "meşrubat", "şeker", "bal", "reçel", "sarmısak",
    "baharat", "tuz", "karabiber", "kekik", "nane", "yogurt", "sütlaç", "pide",
    "börek", "mantı", "kuzu", "tavuk", "balık", "et", "köfte", "sosis",
    "salam", "sosis", "kısır", "kısır", "pilav", "makarna", "spagetti", "risotto",
    "pizza", "hamburger", "hotdog", "sandviç", "tost", "omlet", "krep", "menemen",
    "dolma", "kısır", "etli", "bezelye", "fasulye", "mercimek", "kuzu", "kuzu",
    "kuzu", "köfte", "pilav", "tavuk", "kuzu", "balık", "sucuk", "et", "sosis",
    "salam", "mangal", "kuzu", "karides", "deniz", "börek", "yufka", "zeytin",
    "zeytinyağı", "şeker", "pasta", "kek", "makarna", "pide", "tavuk", "kuzu",
    "köfte", "pide", "börek", "yufka", "zeytin", "zeytinyağı", "şeker", "pasta",
    "kek", "makarna", "pide", "tavuk", "kuzu", "köfte", "pide", "börek"
];

let secilenKelime = "";
let gizliKelime = [];
let hakSayisi = 5;
let dogruTahminler = [];
const minimumUcret = 1.00; // Minimum ücret

function ucretKontrol() {
    const ucret = parseFloat(document.getElementById('ucret').value);
    
    if (isNaN(ucret) || ucret < minimumUcret) {
        alert(`Oynamak için en az ${minimumUcret} TL ödemeniz gerekiyor.`);
        return;
    }

    // Ücret ödendi, oyunu başlat
    document.getElementById('oyunAlanı').style.display = 'block';
    document.getElementById('ucret').disabled = true; // Ücret girişini devre dışı bırak
    document.querySelector('button[onclick="ucretKontrol()"]').disabled = true; // Ödeme butonunu devre dışı bırak
    
    // Klavyeyi oluştur
    klavyeOlustur();
}

function rastgeleKelimeGetir(harfSayisi) {
    const uygunKelimeler = kelimeHavuzu.filter(kelime => kelime.length === harfSayisi);
    if (uygunKelimeler.length === 0) {
        return null; // Harf sayısına uygun kelime bulunamadı
    }
    const rastgeleIndex = Math.floor(Math.random() * uygunKelimeler.length);
    return uygunKelimeler[rastgeleIndex];
}

async function oyunuBaslat() {
    // Seçilen harf sayısını al
    const harfSayisi = parseInt(document.getElementById('harfSayisi').value);
    
    // Rastgele bir kelime seç
    secilenKelime = rastgeleKelimeGetir(harfSayisi);

    if (!secilenKelime) {
        document.getElementById('mesaj').innerText = "Harf sayısına uygun kelime bulunamadı. Lütfen farklı bir sayı seçin.";
        return;
    }

    gizliKelime = "_".repeat(secilenKelime.length).split('');
    hakSayisi = 5;
    dogruTahminler = [];

    guncelleKelimeAlani();
    document.getElementById('mesaj').innerText = ""; // Mesajı temizle
    document.getElementById('gelenKelime').innerText = `Gelen kelime: ${secilenKelime}`; // Gelen kelimeyi göster
}

function guncelleKelimeAlani() {
    document.getElementById('kelimeAlani').innerText = gizliKelime.join(' ');
}

function tahminEt() {
    let tahmin = document.getElementById('tahmin').value.toLowerCase();
    document.getElementById('tahmin').value = ''; // Tahmin kutusunu temizle
    if (tahmin.length !== 1) {
        document.getElementById('mesaj').innerText = "Lütfen tek bir harf girin.";
        return;
    }

    if (dogruTahminler.includes(tahmin)) {
        document.getElementById('mesaj').innerText = "Bu harfi zaten tahmin ettiniz.";
        return;
    }

    dogruTahminler.push(tahmin);

    let harfBulundu = false;
    for (let i = 0; i < secilenKelime.length; i++) {
        if (secilenKelime[i] === tahmin) {
            gizliKelime[i] = tahmin;
            harfBulundu = true;
        }
    }

    if (!harfBulundu) {
        hakSayisi--;
        document.getElementById('mesaj').innerText = `Yanlış tahmin! Kalan hak: ${hakSayisi}`;
    }

    if (hakSayisi <= 0) {
        document.getElementById('mesaj').innerText = "Oyunu Kaybettiniz!";
    }

    if (gizliKelime.join('') === secilenKelime) {
        document.getElementById('mesaj').innerText = "Tebrikler, Kelimeyi Bildiniz!";
    }

    guncelleKelimeAlani();
    klavyeTusuGuncelle(tahmin); // Klavyede ilgili tuşu güncelle
}

function kelimeTahminEt() {
    let tahmin = document.getElementById('kelimeTahmin').value.toLowerCase();
    document.getElementById('kelimeTahmin').value = ''; // Tahmin kutusunu temizle

    if (tahmin === secilenKelime) {
        document.getElementById('mesaj').innerText = "Tebrikler, Kelimeyi Bildiniz!";
        gizliKelime = secilenKelime.split(''); // Kelimeyi göster
    } else {
        hakSayisi--;
        document.getElementById('mesaj').innerText = `Yanlış tahmin! Kalan hak: ${hakSayisi}`;
    }

    if (hakSayisi <= 0) {
        document.getElementById('mesaj').innerText = "Oyunu Kaybettiniz!";
    }

    guncelleKelimeAlani();
}

function klavyeOlustur() {
    const klavye = document.getElementById('klavye');
    klavye.innerHTML = ''; // Klavye alanını temizle

    const harfler = 'abcdefghijklmnopqrstuvwxyz'.split('');
    harfler.forEach(harf => {
        const tus = document.createElement('div');
        tus.className = 'klavye-tus';
        tus.innerText = harf;
        tus.onclick = () => tahminEtHarf(harf);
        klavye.appendChild(tus);
    });
}

function tahminEtHarf(harf) {
    document.getElementById('tahmin').value = harf; // Tahmin kutusuna harfi ekle
    tahminEt(); // Tahmin etme işlevini çağır
}

function klavyeTusuGuncelle(harf) {
    const tuslar = document.querySelectorAll('.klavye-tus');
    tuslar.forEach(tus => {
        if (tus.innerText === harf) {
            tus.style.backgroundColor = '#ddd'; // Rengi değiştir
            tus.style.cursor = 'not-allowed'; // Tıklanamaz hale getir
        }
    });
}

function yenidenBasla() {
    // Oyun alanını sıfırla
    document.getElementById('oyunAlanı').style.display = 'none';
    document.getElementById('ucret').disabled = false; // Ücret girişini etkinleştir
    document.querySelector('button[onclick="ucretKontrol()"]').disabled = false; // Ödeme butonunu etkinleştir

    document.getElementById('kelimeAlani').innerText = '_____';
    document.getElementById('mesaj').innerText = '';
    document.getElementById('gelenKelime').innerText = '';
    document.getElementById('tahmin').value = '';
    document.getElementById('kelimeTahmin').value = '';

    // Klavyeyi sıfırla
    const klavye = document.getElementById('klavye');
    klavye.innerHTML = '';
}