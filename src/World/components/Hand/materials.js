import { MeshBasicMaterial } from 'three';

// To do...
export function createMaterials() {
    const indexFinger = new MeshBasicMaterial({color: '#f00',});
    const middleFinger = new MeshBasicMaterial({color: '#ff0',});
    const palmBase = new MeshBasicMaterial({color: '#fff',});
    const pinky = new MeshBasicMaterial({color: '#0f0',});
    const ringFinger = new MeshBasicMaterial({color: '#0ff',});
    const thumb = new MeshBasicMaterial({color: '#f0f',});
    return {
        indexFinger, middleFinger, palmBase, pinky, ringFinger, thumb 
    };
}
