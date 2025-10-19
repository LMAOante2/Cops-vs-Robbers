document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const sideMenu = document.querySelector(".side-menu");

  menuToggle.addEventListener("click", function () {
    sideMenu.classList.add("active");
  });

  closeMenu.addEventListener("click", function () {
    sideMenu.classList.remove("active");
  });

  document.addEventListener("click", function (event) {
    if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      sideMenu.classList.remove("active");
    }
  });
});

//Pokazivanje
const buttons = document.querySelectorAll('.btn4');
const rules = document.querySelectorAll('.rule');
const ddd = document.querySelectorAll('.ddd');
const krug = document.querySelectorAll('.krug')
const krug1 = document.querySelectorAll('.krug1')

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;


    rules.forEach(rule => rule.classList.remove('show'));
    ddd.forEach(el => el.classList.remove('show'));
    krug.forEach(el => el.classList.remove('show'));
    krug1.forEach(el => el.classList.remove('show'));
    krug.forEach(el => el.classList.remove('hide'));
    krug1.forEach(el => el.classList.remove('hide'));
    buttons.forEach(btn => btn.classList.remove('active'));

    const targetRule = document.getElementById(targetId);
    if (targetRule) {
      targetRule.classList.add('show');
    }
    button.classList.add('active');


    if (targetId === 'rule1') {
      document.getElementById('Policajac')?.classList.add('show');
      document.getElementById('test')?.classList.add('show');
      document.getElementById('test1')?.classList.add('show');
    } else if (targetId === 'rule2') {
      document.getElementById('Pljackas')?.classList.add('show');
      document.getElementById('test')?.classList.add('show');
      document.getElementById('test1')?.classList.add('show');
    }

    if (targetId === 'rule3') {
      document.getElementById('krug')?.classList.add('hide');
      document.getElementById('krug1')?.classList.add('hide');
    }
  });
});

const PRODUCTS = {
  'orglvl1': {
    id: 'orglvl1',
    title: 'Organizacija LVL1',
    price: '€7',
    img: 'slike/orglvl1.png',
    desc: 'Sef, Custom Ime, Bez Interijera i Auta Po Našem Odabiru'
  },
  'orglvl2': {
    id: 'orglvl2',
    title: 'Organizacija LVL2',
    price: '€15',
    img: 'slike/orglvl2.png',
    desc: 'Interijer, Sef, i Auta Po Vašoj Zelji, Custom Ime'
  },
  'orglvl3': {
    id: 'orglvl3',
    title: 'Organizacija LVL3',
    price: '€25 / Sa Helikopterom €30',
    img: 'slike/orglvl3.png',
    desc: 'Custom ime, Napunjen Sef, Interijer, Custom Auta Po Vašoj Zelji (koja nisu na serveru)'
  },
  'low': {
    id: 'low',
    title: 'TX LOW',
    price: '€7',
    img: 'slike/txlow.png',
    desc: 'Ukoliko Radite TX Abuse Vam TX Moze Biti Oduzet Cak Iako Je Kupljen!'
  },
  'mid': {
    id: 'mid',
    title: 'TX MID',
    price: '€15',
    img: 'slike/txmid.png',
    desc: 'Ukoliko Radite TX Abuse Vam TX Moze Biti Oduzet Cak Iako Je Kupljen!'
  },
  'full': {
    id: 'full',
    title: 'TX FULL',
    price: '€20',
    img: 'slike/txfull.png',
    desc: 'Ukoliko Radite TX Abuse Vam TX Moze Biti Oduzet Cak Iako Je Kupljen!'
  },
  'admin': {
    id: 'admin',
    title: 'ADMIN',
    price: '€10',
    img: 'slike/admin.png',
    desc: 'Ukoliko Radite Admin Abuse Vam Admin Moze Biti Oduzet Cak Iako Je Kupljen!'
  },
  'sadmin': {
    id: 'sadmin',
    title: 'SUPERADMIN',
    price: '€15',
    img: 'slike/superadmin.png',
    desc: 'Ukoliko Radite Admin Abuse Vam Admin Moze Biti Oduzet Cak Iako Je Kupljen!'
  },
  'hadmin': {
    id: 'hadmin',
    title: 'HEAD ADMIN',
    price: '€20',
    img: 'slike/headadmin.png',
    desc: 'Ukoliko Radite Admin Abuse Vam Admin Moze Biti Oduzet Cak Iako Je Kupljen!'
  },
  'vstaffa': {
    id: 'vstaffa',
    title: 'VODJA STAFFA',
    price: '€30',
    img: 'slike/vodjastaffa.png',
    desc: 'Ukoliko Radite Admin Abuse Vam Admin Moze Biti Oduzet Cak Iako Je Kupljen!'
  },
  'svlasnik': {
    id: 'svlasnik',
    title: 'SUVLASNIK',
    price: '€50',
    img: 'slike/suvlasnik.png',
    desc: 'Ukoliko Radite Admin Abuse Vam Admin Moze Biti Oduzet Cak Iako Je Kupljen!'
  },
  'vzelji': {
    id: 'vzelji',
    title: 'Vozilo Po Zelji',
    price: '€15',
    img: 'slike/vozilopozelji.png',
    desc: 'Vozilo Po zelji kojeg ce te samo vi imati (Koji Nije Na Serveru)'
  },
  'vsalon': {
    id: 'vsalon',
    title: 'Vozilo Iz Autosalona',
    price: '€10',
    img: 'slike/voziloizsalona.png',
    desc: 'Bilo Koje Vozilo Iz AutoSalona'
  },
  'orgvsalon': {
    id: 'orgvsalon',
    title: 'ORG Vozilo Iz AutoSalona',
    price: '€10',
    img: 'slike/orgvozilosalon.png',
    desc: 'Bilo Koje Vozilo Iz AutoSalona Za Vasu ORG'
  },
  'orgvzelja': {
    id: 'orgvsalon',
    title: 'ORG Vozilo Po Zelji',
    price: '€15',
    img: 'slike/orgvzelja.png',
    desc: 'Bilo Koje Vozilo Koje Nije Na Serveru Za Vasu ORG'
  },
  'orgfulltune': {
    id: 'orgfulltune',
    title: 'FullTune ORG Vozila',
    price: '€5',
    img: 'slike/fulltuneorg.png',
    desc: 'FullTune Svih Vasih ORG Vozila'
  },
  'fulltune': {
    id: 'fulltune',
    title: 'FullTune Vaseg Vozila',
    price: '€5',
    img: 'slike/fulltunevozila.png',
    desc: 'FullTune Vaseg Vozila'
  },
  'handling': {
    id: 'handling',
    title: 'Custom Handling',
    price: '€7',
    img: 'slike/handling.png',
    desc: 'Custom Handling Na Vasem Vozilu'
  },
  'zvuk': {
    id: 'zvuk',
    title: 'Custom Zvuk',
    price: '€7',
    img: 'slike/zvuk.png',
    desc: 'Custom Zvuk Na Vasem Vozilu'
  },
  'novac': {
    id: 'novac',
    title: 'Novac 100K',
    price: '€5',
    img: 'slike/novac.png',
    desc: ''
  },
  'plvl1': {
    id: 'plvl1',
    title: 'Priority Lvl1',
    price: '€10',
    img: 'slike/plvl1.png',
    desc: ''
  },
  'plvl2': {
    id: 'plvl2',
    title: 'Priority Lvl2',
    price: '€20',
    img: 'slike/plvl2.png',
    desc: ''
  },
  'ped': {
    id: 'ped',
    title: 'Ped',
    price: '€5',
    img: 'slike/ped.png',
    desc: ''
  },
};

const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const detailImg = document.getElementById('detail-img');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
const detailPrice = document.getElementById('detail-price');
const detailExtra = document.getElementById('detail-extra');

function renderDetail(prod) {
  detailImg.src = prod.img;
  detailImg.alt = prod.title;
  detailTitle.textContent = prod.title;
  detailDesc.textContent = prod.desc;
  detailPrice.textContent = prod.price;
  detailExtra.innerHTML = `<a class="ticket"; target="_blank"; href="https://discord.com/channels/1084108590668845197/1131574439197282344" style="color:black;text-decoration:none; padding: 20px; background: white; text-align: center; place-self: center; margin: 20px auto auto; position: relative; border-radius: 20px;">Doniraj sada</a>`;
}

function openDetail(id, push = true) {
  const p = PRODUCTS[id];
  if (!p) return console.warn('Produkt ne postoji:', id);
  renderDetail(p);
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  closeBtn.focus();
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.ORG');
  if (!card) return;
  const id = card.dataset.id;
  if (id) openDetail(id, true);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const card = e.target.closest('.ORG');
    if (card && card.dataset.id) openDetail(card.dataset.id, true);
  }
});

function closeDetail() {
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

closeBtn.addEventListener('click', closeDetail);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeDetail();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('show')) closeDetail();
});
