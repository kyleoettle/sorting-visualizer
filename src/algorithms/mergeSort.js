//https://stackabuse.com/merge-sort-in-javascript/#:~:text=Implementation%20of%20Merge%20Sort%20in%20JavaScript&text=First%2C%20we%20create%20an%20empty,since%20they%20are%20both%20sorted.
const ARRAY_MAX_VALUE = 730;
const ARRAY_MIN_VALUE = 5;

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

export function getNewMergeSortAnimation(originalArray) {
    const animations = [];
    const arrayToSort = originalArray.slice();
    const startIdx = 0;
    const endIdx = arrayToSort.length - 1;

    const sortedArray = mergeSortNewHelper(arrayToSort, arrayToSort, animations, startIdx, endIdx);
    console.log(sortedArray);
    console.log(animations);

    return { sortedArray, animations };
}

export function mergeSortNewHelper(originalArray, arrayToSort, animations) {

    if (arrayToSort.length === 1) return arrayToSort;
    const halfIdx = Math.ceil(arrayToSort.length / 2);
    const left = arrayToSort.splice(0, halfIdx);
    const leftSorted = mergeSortNewHelper(originalArray, left, animations);
    const rightSorted = mergeSortNewHelper(originalArray, arrayToSort, animations);
    return mergeNew(leftSorted, rightSorted, originalArray, animations);
}

function mergeNew(left, right, originalArray, animations) {
    let arr = [];
    while (left.length && right.length) {

        const leftNode = left[0];
        const rightNode = right[0];
        animations.push(createComparisonAnimation(leftNode, rightNode, "compareStart"))
        animations.push(createComparisonAnimation(leftNode, rightNode, "compareEnd"))

        if (leftNode.value < rightNode.value) {
            //the smaller value is already on the left hand side, so add it to the array
            const node = left.shift();
            arr.push(node);
            //if the smaller value is already on the left hand side, we don't need to do a shift
            animations.push(createStayAnimation(node, "stayStart"))
            animations.push(createStayAnimation(node, "stayEnd"))
        } else {
            //the larger value is before the smaller value, so add the smaller value to the array
            const node = right.shift();
            const newLeftIdx = leftNode.idx;
            arr.push(node);
            animations.push(createShiftAnimation(node, newLeftIdx, "shiftStart"))
            animations.push(createShiftAnimation(node, newLeftIdx, "shiftEnd"))
            left.forEach(n => {
                n.idx++;
            });
            node.idx = newLeftIdx;
        }
    }
    return [...arr, ...left, ...right];
}

function createStayAnimation(node, action) {
    return { idx: node.idx, value: node.value, action, msg: "The node on the left hand side is smaller than the node on the right hand side and values shouldn't move." };
}

function createShiftAnimation(node, newIdx, action) {
    return {
        oldIdx: node.idx, newIdx: newIdx, value: node.value, action,
        msg: "the node on the right hand side is smaller. We are doing replace operations, so just replace the old node's lenth with the new nodes length"
    };
}

function createComparisonAnimation(leftNode, rightNode, action) {
    return { leftIdx: leftNode.idx, leftValue: leftNode.value, rightIdx: rightNode.idx, rightValue: rightNode.value, action, msg: "Comparing these two values with each other" };
}

export function createArray(length) {
    const array = [];
    for (let j = 0; j < length; j++) {
        const animation = { idx: j, value: getRandomValue(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE), startIdx: j };
        array.push(animation);
    }
    return array;
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
            //here the values that were compared are in the correct order, so just print the value
            //We replace the value oat index k in the original array with the value at index i in the auxiliary array
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            //we replace the value at index k in the original array with the value at index j in the auxiliary array
            //here the values were out of order and we need to replace the old value
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