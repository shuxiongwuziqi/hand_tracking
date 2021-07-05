import {BufferAttribute} from 'three'


export class HandController {
    constructor(hand, controls) {
        this.hand = hand;
        this.controls = controls;
    }

    drawHand(prediction) {
        const { annotations: { indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb } } = prediction;
        const indexFingerLine = [], 
        middleFingerLine=[], 
        pinkyLine=[], 
        ringFingerLine=[], 
        thumbLine=[];
        for (let i = 0; i < 4; i++) {
            this.hand.indexFinger[i].position.set(...this._transform(indexFinger[i]));
            indexFingerLine.push(...this._transform(indexFinger[i]));
            
            this.hand.middleFinger[i].position.set(...this._transform(middleFinger[i]));
            middleFingerLine.push(...this._transform(middleFinger[i]));
            
            this.hand.pinky[i].position.set(...this._transform(pinky[i]));
            pinkyLine.push(...this._transform(pinky[i]));
            
            this.hand.ringFinger[i].position.set(...this._transform(ringFinger[i]));
            ringFingerLine.push(...this._transform(ringFinger[i]));
            
            this.hand.thumb[i].position.set(...this._transform(thumb[i]));
            thumbLine.push(...this._transform(thumb[i]));
        }
        this.hand.palmBase[0].position.set(...this._transform(palmBase[0]));
        this.controls.target.copy(this.hand.palmBase[0].position);
        this.controls.update();

        this.hand.lines.indexFingerLine.geometry.setAttribute('position',
        new BufferAttribute(new Float32Array(indexFingerLine),3));

        this.hand.lines.middleFingerLine.geometry.setAttribute('position',
        new BufferAttribute(new Float32Array(middleFingerLine),3));

        this.hand.lines.pinkyLine.geometry.setAttribute('position',
        new BufferAttribute(new Float32Array(pinkyLine),3));

        this.hand.lines.ringFingerLine.geometry.setAttribute('position',
        new BufferAttribute(new Float32Array(ringFingerLine),3));

        this.hand.lines.thumbLine.geometry.setAttribute('position',
        new BufferAttribute(new Float32Array(thumbLine),3));
    }

    _transform([x, y, z]) {
        return [4 - x / 100, 5 - y / 100, z / 30]
    }
}
