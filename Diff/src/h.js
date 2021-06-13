import vnode from './vnode';

export default function (sel, data, c) {
    if (arguments.length !== 3) {
        throw new Error(`must have three args`);
    }

    // h(sel, {}, string||number)
    if (typeof c === 'string' || typeof c === 'number') {
        return vnode(sel, data, undefined, c, undefined);
    } 
    // h(sel, {}, [h(...), h(...)])
    else if (c instanceof Array) {
        const children = [];

        for (const val of c) {
            children.push(val);
        }

        return vnode(sel, data, children, undefined, undefined);
    }
    // h(sel, {}, h(...))
    else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        return vnode(sel, data, [c], undefined, undefined);
    } else {
        throw new Error(`wrong args!`);
    }
}
