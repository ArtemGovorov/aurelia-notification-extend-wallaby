export default class PagedView {
    currentPage = 1;
    numberOfPages = 0;
    
    constructor(router, baseUrl) {
        this.router = router;
        this.baseUrl = baseUrl;

        this.filter = null;
    }

    get pages() {
        let pag = [];
        for (var i = 0; i < this.numberOfPages; i++) {
            pag.push(i + 1);
        }

        return pag;
    }

    getPage(page, filter) {
        return this.getData(page, filter).then(() => {
            this.currentPage = page;
            this._setPushState(page);
        });
    }

    applyFilters(page) {
        return this.getData(page, this.filter);
    }

    edit (item) {
        this._navigate(item, "edit");
    }

    add () {
        this._navigate(null, "add");
    }

    details(item) {
        this._navigate(item, "details");
    }

    _navigate(selectedItem, module) {
        let id = selectedItem != null ? `${selectedItem.id}/` : "";
        let url = `${this.baseUrl}/${id}${module}`;
        this.router.navigate(url);
    }

    _setPushState(page) {
        //let currentUrl = window.location.href;
        //let newUrl = currentUrl.includes("?pagina=") ? currentUrl.replace(/[?]pagina=\d+/, `?pagina=${page}`) : `${currentUrl}?pagina=${page}`;
        //history.pushState(null, `pagina ${page}`, newUrl);
    }
}