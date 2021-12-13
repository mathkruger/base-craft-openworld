class CustomMap {
    constructor() {
        this.layers = {
            layerOne: [],
            layerTwo: [],
            layerThree: [],
        }

        this.nextMapUp = "";
        this.nextMapDown = "";
        this.nextMapLeft = "";
        this.nextMapRight = "";
    }

    getMapFromJson(mapName) {
        return fetch('/maps/' + mapName + '.json').then(x => {
            return x.json();
        }).then(result => {
            this.layers.layerOne = result.layers.layerOne;
            this.layers.layerTwo = result.layers.layerTwo;
            this.layers.layerThree = result.layers.layerThree;
            this.nextMapUp = result.nextMapUp;
            this.nextMapDown = result.nextMapDown;
            this.nextMapLeft = result.nextMapLeft;
            this.nextMapRight = result.nextMapRight;
        });
    }
}