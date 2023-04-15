window.onload = async function () {
    try{
        let slId = sessionStorage.getItem("shoplistId");
        let res = await requestUserShoplist(slId);
        if (!res.successful) throw {msg:"Something went wrong"};
        let shoplist = res.shoplist;
        document.getElementById("name").textContent = shoplist.name;

    } catch(err) {
        console.log(err);
    }
}