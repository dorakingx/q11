import { noneBridge } from './game';
import { mountQ11 } from './ui/mount';

const root = document.getElementById('root');
if (!root) throw new Error('#root missing');
mountQ11(root, { bridge: noneBridge(), storage: 'local' });
