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


export function getMergeSortAnimations(array) {

    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {

    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {

    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            //We replace the value oat index k in the original array with the value at index i in the auxiliary array
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            //we replace the value at index k in the original array with the value at index j in the auxiliary array
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        //these are the values that we're comparing; we push them once to change their color
        animations.push([i, i]);
        //these are the values that we're comparingl we push them a second time to revert their color
        animations.push([i, i]);
        //we replace the value at index k in the original array with the value at index i in the auxiliary array
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}