import { Mesh, BoxBufferGeometry, Line , BufferGeometry} from 'three';
import {createMaterials, lineMaterial} from './materials.js';

export function createHandKeypoint() {
    const box = new BoxBufferGeometry(0.1, 0.1, 0.1);
    const materials = createMaterials();
     
    const indexFinger = new Mesh(box, materials.indexFinger);
    const middleFinger = new Mesh(box, materials.middleFinger);
    const palmBase = new Mesh(box, materials.palmBase);
    const pinky = new Mesh(box, materials.pinky);
    const ringFinger = new Mesh(box, materials.ringFinger);
    const thumb = new Mesh(box, materials.thumb);
    

    return {
        indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb
    };
}
export function createHandLine(points) {
    const materials = createMaterials();

    const indexFingerLine = new Line(new BufferGeometry(), materials.indexFinger);
    const middleFingerLine = new Line(new BufferGeometry(), materials.middleFinger);
    const pinkyLine = new Line(new BufferGeometry(), materials.pinky);
    const ringFingerLine = new Line(new BufferGeometry(), materials.ringFinger);
    const thumbLine = new Line(new BufferGeometry(), materials.thumb);
    

    return {
        indexFingerLine, middleFingerLine, pinkyLine, ringFingerLine, thumbLine
    };
}
