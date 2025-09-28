interface Product {
  name: string;
  images: string[];
  description: string;
  review: string;
}

const products: Record<string, Product> ={
  item1: {
    name: "ドイツ風バームクーヘン",
    images:[
      "https://i-storage.tenki.jp/large/storage/static-images/suppl/article/image/2/28/288/28895/1/large.jpg"
    ],
    description: "しっとり食感で年齢問わず人気のバームクーヘンです。",
    review: "★★★★★★　ふわっと薫り高くておいしい！",
  },
 item2: {
    name: "ハワイアンパンケーキ",
    images:[
      "https://graphon.jp/img/photo/34969.JPG"
    ],
    description: "たっぷりのフルーツとクリームで贅沢なパンケーキ。",
    review: "★★★★★★　フルーツとパンケーキの甘みとほのかな酸味が相性抜群です",
  },
  item3: {
    name: "トリコロールマカロン",
    images:[
      "https://user0514.cdnw.net/shared/img/thumb/elly21515B1848_TP_V.jpg"
    ],
    description: "カラフルで見た目も可愛いマカロンセット。",
    review: "★★★★★★　彩りも味も◎！",
  },
  item4: {
    name: "濃厚チョコレートケーキ",
    images:[
      "https://imageslabo.com/wp-content/uploads/2019/05/395_sweets_chocolate-cake_6856-1024x683.jpg"
    ],
    description: "コクのあるチョコレートを存分に味わえるケーキ。",
    review: "★★★★★★　リッチな味わいで大満足。",
  },
  item5: {
    name: "あまおうづくしタルト",
    images:[
      "https://d1uzk9o9cg136f.cloudfront.net/f/16781160/rc/2017/12/02/52d8d74c34b9fbc3ee02f473ca8dfcc7679f72e3_xlarge.jpg"
    ],
    description: "甘みの強いあまおうを贅沢に使用したタルト。",
    review: "★★★★★★　フルーツ感がたまりません。",
  },
  item6: {
    name: "ホワイトイチゴショート",
    images:[
      "https://d1uzk9o9cg136f.cloudfront.net/f/16781160/rc/2017/12/02/33776a1ff93a092ac7190bbadd9282072de900c5_xlarge.jpg"
    ],
    description: "希少なホワイトいちごを使った贅沢なショートケーキ。",
    review: "★★★★☆ 見た目も◎、味も上品。",
  },
  item7: {
    name: "三色チョコカップケーキ",
    images:[
      "https://www.lotte.co.jp/products/brand/ghana/recipe/img/recipe/1150.png"
    ],
    description: "チョコレート好きに贈るカップケーキセット。",
    review: "★★★★☆ 子どもにも大人気。",
  },
  item8: {
    name: "キャラメルミルクプリン",
    images:[
      "https://imgc.eximg.jp/i=https%253A%252F%252Fimage.excite.co.jp%252Fjp%252Ferecipe%252Frecipe%252F1%252F9%252F19b576a4ea9170730ba8306a24fdb1d4%252F04553d5f3962b45fdd1bea10be990bd1.jpeg&small=430&quality=0&type=jpeg"
    ],
    description: "とろ〜り食感のキャラメルプリン。",
    review: "★★★★★ とろける舌触りが最高です。",
  },
  item9: {
    name: "濃厚リッチシュークリーム",
    images:[
      "https://mi-journey.jp/foodie/wp-content/uploads/2015/04/05_64_chou-a-la-creme_01.jpg"
    ],
    description: "生地もクリームもリッチなシュークリーム。",
    review: "★★★★★ クリームがたっぷりで満足感あり。",
  },
};

/* --DOM 要素の取得（型付け） --*/
const $shopItems = document.querySelectorAll<HTMLDivElement>('.shop-item');
const $modal = document.getElementById('modal') as HTMLElement;
const $modalContent = $modal.querySelector('.modal-content') as HTMLElement;
const $modalTitle = document.getElementById('modal-title') as HTMLElement;
const $mainImage = document.getElementById('main-image') as HTMLImageElement;
const $thumbnailContainer = document.querySelector('.thumbnail-container') as HTMLElement;
const $descTab = document.getElementById('desc') as HTMLElement;
const $reviewTab = document.getElementById('review') as HTMLElement;
const $closeBtn = document.getElementById('close') as HTMLButtonElement;
const $tabButtons = document.querySelectorAll<HTMLButtonElement>('.modal-tabs .tab');
const $cartBtn = document.getElementById('add-to-cart') as HTMLButtonElement;

let $lastFocusedElement: HTMLElement | null = null;

/* 安全チェック */
if (
  !$modal || !$modalTitle || !$mainImage || !$thumbnailContainer ||
  !$descTab || !$reviewTab || !$closeBtn
|| !$cartBtn) {
  throw new Error('必要なDOM要素が見つかりません。HTML の id/class を確認してください。');
}

/* --- モーダルを開く処理 --- */
const $openModalFor = (itemId: string): void => {
  const $product = products[itemId];
  if (!$product) {
    console.warn('product not found:', itemId);
    return;
  }
  //カートボタンを押すと追加済み
  $cartBtn.addEventListener('click', () => {
  $cartBtn.textContent = "追加済み";
  $cartBtn.disabled = true;
  });
  
  //初期化
  $cartBtn.textContent = "カートに追加";
  $cartBtn.disabled =false;
  
  //クリックイベント
  $cartBtn.onclick = () => {
    $cartBtn.textContent = "追加済み";
    $cartBtn.disabled = true;
  }
  
  
  
  // 最後にフォーカスしていた要素を保存
  $lastFocusedElement = document.activeElement as HTMLElement | null;

  // タイトル・テキスト
  $modalTitle.textContent = $product.name;
  $descTab.textContent = $product.description;
  $reviewTab.textContent = $product.review;

  // ギャラリー初期化
  $mainImage.src = $product.images[0] ?? '';
  $mainImage.alt = $product.name;
  $thumbnailContainer.innerHTML = '';
  $product.images.forEach((src, idx) => {
    const $img = document.createElement('img');
    $img.src = src;
    $img.alt = `${$product.name} サムネイル ${idx + 1}`;
    if (idx === 0) $img.classList.add('active');
    $img.addEventListener('click', () => {
      $mainImage.src = src;
      $thumbnailContainer.querySelectorAll('img').forEach(t => t.classList.remove('active'));
      $img.classList.add('active');
    });
    $thumbnailContainer.appendChild($img);
  });

  // タブ初期化
  $tabButtons.forEach($b => $b.classList.remove('active'));
  ($tabButtons[0] as HTMLElement).classList.add('active');
  $descTab.style.display = 'block';
  $reviewTab.style.display = 'none';

  // 表示
  $modal.style.display = 'flex';
  $modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // フォーカス
  $closeBtn.focus();
};

/* --- モーダルを閉じる処理 --- */
const $closeModal = (): void => {
  $modal.style.display = 'none';
  $modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  if ($lastFocusedElement) $lastFocusedElement.focus();
};

/* --- イベント登録 --- */
// 商品クリック
$shopItems.forEach($item => {
  $item.addEventListener('click', () => {
    const id = $item.dataset.item!;
    $openModalFor(id);
  });
});

// 閉じるボタン
$closeBtn.addEventListener('click', () => $closeModal());

// オーバーレイクリック
$modal.addEventListener('click', (ev) => {
  if (ev.target === $modal) $closeModal();
});

// ESC キー
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && $modal.style.display !== 'none') {
    $closeModal();
  }
});

// タブ切替
$tabButtons.forEach($btn => {
  $btn.addEventListener('click', () => {
    $tabButtons.forEach($b => $b.classList.remove('active'));
    $btn.classList.add('active');

    const target = $btn.dataset.target;
    if (target === 'desc') {
      $descTab.style.display = 'block';
      $reviewTab.style.display = 'none';
    } else {
      $descTab.style.display = 'none';
      $reviewTab.style.display = 'block';
    }
  });
});

