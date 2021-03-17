//https://stackabuse.com/merge-sort-in-javascript/#:~:text=Implementation%20of%20Merge%20Sort%20in%20JavaScript&text=First%2C%20we%20create%20an%20empty,since%20they%20are%20both%20sorted.

export function mergeSort(array) {

    if (array.length === 1) return array;
    const half = Math.ceil(array.length / 2);
    const left = array.splice(0, half);
    return merge(mergeSort(left), mergeSort(array));
}

function merge(left, right) {
    let arr = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }
    return [...arr, ...left, ...right];
}