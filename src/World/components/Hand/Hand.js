import { Group, MathUtils } from 'three';
import createMeshes from './meshes.js';
// To do...
class Hand extends Group {
    constructor() {
        super();
        this.meshes = createMeshes();
        
        // indexFinger 4, middleFinger 4 , palmBase 1 , pinky 4 , ringFinger 4, thumb 4
        this.palmBase = [this.meshes.palmBase];
        
        this.indexFinger = [this.meshes.indexFinger];
        this.middleFinger = [this.meshes.middleFinger];
        this.pinky = [this.meshes.pinky];
        this.ringFinger = [this.meshes.ringFinger];
        this.thumb = [this.meshes.thumb];
        for(let i =0;i<3;++i){
            this.indexFinger.push(this.meshes.indexFinger.clone());
            this.middleFinger.push(this.meshes.middleFinger.clone());
            this.pinky.push(this.meshes.pinky.clone());
            this.ringFinger.push(this.meshes.ringFinger.clone());
            this.thumb.push(this.meshes.thumb.clone());
        }
        
        this.add(
            this.palmBase[0],
        )
        for (let i=0;i<4;++i){
            this.add(this.indexFinger[i]);
            this.add(this.middleFinger[i]);
            this.add(this.pinky[i]);
            this.add(this.ringFinger[i]);
            this.add(this.thumb[i]);
        }
    }

    tick(delta) {
        
    }
}

export default Hand;