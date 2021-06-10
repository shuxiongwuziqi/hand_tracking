import { Mesh } from 'three';

import createGeometries from './geometries.js';
import createMaterials from './materials.js';

function createMeshes() {
    const geometries = createGeometries();
    const materials = createMaterials();
     
    const indexFinger = new Mesh(geometries.point, materials.indexFinger);
    const middleFinger = new Mesh(geometries.point, materials.middleFinger);
    const palmBase = new Mesh(geometries.point, materials.palmBase);
    const pinky = new Mesh(geometries.point, materials.pinky);
    const ringFinger = new Mesh(geometries.point, materials.ringFinger);
    const thumb = new Mesh(geometries.point, materials.thumb);
    

    return {
        indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb
    };
}

export default createMeshes;
