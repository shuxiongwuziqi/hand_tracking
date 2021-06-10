import { BoxBufferGeometry} from 'three';

// To do...
function createGeometries() {
    const point = new BoxBufferGeometry(0.1, 0.1, 0.1);
    return {
        point
    };
}

export default createGeometries;