import { MeshStandardMaterial } from 'three';

// To do...
function createMaterials() {
    const indexFinger = new MeshStandardMaterial({
        color: '#f00',
        flatShading: true
    });
    const middleFinger = new MeshStandardMaterial({
        color: '#ff0',
        flatShading: true
    });
    const palmBase = new MeshStandardMaterial({
        color: '#fff',
        flatShading: true
    });
    const pinky = new MeshStandardMaterial({
        color: '#0f0',
        flatShading: true
    });
    const ringFinger = new MeshStandardMaterial({
        color: '#0ff',
        flatShading: true
    });
    const thumb = new MeshStandardMaterial({
        color: '#f0f',
        flatShading: true
    });
    return {
        indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb 
    };
}

export default createMaterials;