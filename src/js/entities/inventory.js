class Inventory {
    constructor(items = [], capacity = 30) {
        this.items = items;
        this.capacity = capacity;

        this.selectedItem = 0;
    }

    addItem(item) {
        if (this.items.length < this.capacity) {
            this.items.push(item);
        }
    }

    useItem() {
        const item = this.items[this.selectedItem];
        if (item) {
            item.action();
            item.quantity -= 1;

            if (item.quantity <= 0) {
                this.items.splice(this.selectedItem, 1);
            }
        }
    }
}