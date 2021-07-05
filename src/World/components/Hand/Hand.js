import { Group, MathUtils, LineBasicMaterial, Vector3, BufferGeometry, Line, BufferAttribute} from 'three';
import {createHandKeypoint, createHandLine} from './meshes';
// To do...
export class Hand extends Group {
    constructor() {
        super();
        const keypoints = createHandKeypoint();
        
        // indexFinger 4, middleFinger 4 , palmBase 1 , pinky 4 , ringFinger 4, thumb 4
        this.palmBase = [keypoints.palmBase];
        
        this.indexFinger = [keypoints.indexFinger];
        this.middleFinger = [keypoints.middleFinger];
        this.pinky = [keypoints.pinky];
        this.ringFinger = [keypoints.ringFinger];
        this.thumb = [keypoints.thumb];
        for(let i =0;i<3;++i){
            this.indexFinger.push(keypoints.indexFinger.clone());
            this.middleFinger.push(keypoints.middleFinger.clone());
            this.pinky.push(keypoints.pinky.clone());
            this.ringFinger.push(keypoints.ringFinger.clone());
            this.thumb.push(keypoints.thumb.clone());
        }
        this.palmBase.forEach(each=>this.add(each));
        this.indexFinger.forEach(each=>this.add(each));
        this.middleFinger.forEach(each=>this.add(each));
        this.pinky.forEach(each=>this.add(each));
        this.ringFinger.forEach(each=>this.add(each));
        this.thumb.forEach(each=>this.add(each));

        this.lines = createHandLine();
        for(const key in this.lines)this.add(this.lines[key]);
    }

    tick(delta) {
        
    }
}