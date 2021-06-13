export function compile(node, vm) {
    const childNodes = node.childNodes;

    // 直接操作节点引用
    [...childNodes].forEach(child => {
        // 元素节点
        if (child.nodeType === 1) {
            // 递归编译直到找到文本节点
            compile(child, vm);
        } else if (child.nodeType === 3) {
            // 文本节点
            compileText(child, vm);
        }
    });
};

export function compileText(node, vm) {
    const defaultRep = /\{\{((?:.|\r?\n)+?)\}\}/g;

    node.textContent = node.textContent.replace(defaultRep, (...args) => {
        // console.log(args);
        return getValue(vm, args[1]);
    });
};

export function getValue(vm, exp) {
    if (!exp.includes('.')) {
        return vm[exp];
    }

    exp = exp.split('.');

    return exp.reduce((val, cur) => {
        return (val = val[cur]);
    }, vm);
};
