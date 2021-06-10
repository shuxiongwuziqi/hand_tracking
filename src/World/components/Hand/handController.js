
class handController {
    constructor(hand, controls) {
        this.hand = hand;
        this.controls = controls;
    }

    drawHand(predictions) {
        const { annotations: { indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb } } = predictions[0];
        for (let i = 0; i < 4; i++) {
            this.hand.indexFinger[i].position.set(...this._transform(indexFinger[i]));
            this.hand.middleFinger[i].position.set(...this._transform(middleFinger[i]));
            this.hand.pinky[i].position.set(...this._transform(pinky[i]));
            this.hand.ringFinger[i].position.set(...this._transform(ringFinger[i]));
            this.hand.thumb[i].position.set(...this._transform(thumb[i]));
        }
        this.hand.palmBase[0].position.set(...this._transform(palmBase[0]));
        this.controls.target.copy(this.hand.palmBase[0].position);
        this.controls.update();
    }

    _transform([x, y, z]) {
        return [5 - x / 100, 5 - y / 100, z / 30]
    }
}

export default handController;