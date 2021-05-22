// 初始資料
let productData = [
    {
        id: 1,
        title: "THYGE",
        originPrice: 1500,
        price: 1399,
        isEnabled: true,
    }
];

// DOM
const productTitle = document.querySelector('#title');
const productOriginPrice = document.querySelector('#origin_price');
const productPrice = document.querySelector('#price');
const productNum = document.querySelector('#productCount');
const productList = document.querySelector('#productList');
const addBtn = document.querySelector('#addProduct');
const deleteAllBtn = document.querySelector('#clearAll');

// init
render(productData);

// 渲染畫面
function render(data) {
    console.log(data);
    productNum.textContent = data.length;
    let str = "";

    data.forEach(function (item) {
        str += `<tr>
        <th>${item.title}</th>
        <th width="120">NT ${parseInt(item.originPrice)}</th>
        <th width="120">NT ${parseInt(item.price)}</th>
        <th width="150">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" data-id="${item.id}" data-action="status" ${item.isEnabled ? 'checked' : ''}>
            </div></th>
        <th width="120"><botton type="button" class="btn btn-sm btn-outline-danger" data-id=${item.id} data-action="delete">刪除</botton></th>
    </tr>`
    });

    // console.log(str);
    productList.innerHTML = str;

}

// 新增產品
function addProduct() {
    console.log('add');
    let titleVal = productTitle.value.trim();;
    let originPriceVal = productOriginPrice.value.trim();
    let priceVal = productPrice.value.trim();

    if (titleVal === "") {
        alert('Your product title is empty!');
        return;
    } else if (originPriceVal === "" || originPriceVal == 0) {
        alert('Your product origin price is empty!');
        return;
    } else if (priceVal === "" || priceVal == 0) {
        alert('Your product price is empty!');
        return;
    }

    let newData = {
        id: (Date.now()) * 11,
        title: titleVal,
        originPrice: originPriceVal,
        price: priceVal,
        isEnabled: false,
    }

    productData.push(newData);
    render(productData);
    clearInput();
}

// 清除輸入框
function clearInput() {
    productTitle.value = "";
    productOriginPrice.value = "";
    productPrice.value = "";
}

// 改變啟用狀態
function changeStatus(id) {
    console.log(id);
    productData.forEach(function (item) {
        if (id == item.id) {
            item.isEnabled = !item.isEnabled;
        }
    });
    render(productData);
}

// 清除所有產品資料
function clearAll(e) {
    e.preventDefault();
    productData = [];
    render(productData);
}

// 清出特定產品資料
function deleteSingle(e) {
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    if (action == "delete") {
        console.log(id);
        let newIndex = 0;
        productData.forEach(function (item, index) {
            if (id == item.id) {
                newIndex = index;
            }
        });
        productData.splice(newIndex, 1);
        render(productData);
    } else if (action == "status") {
        changeStatus(id);
    }
}


addBtn.addEventListener('click', addProduct);
productList.addEventListener('click', deleteSingle);
deleteAllBtn.addEventListener('click', clearAll);

