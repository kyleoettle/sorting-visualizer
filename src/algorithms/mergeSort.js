//https://stackabuse.com/merge-sort-in-javascript/#:~:text=Implementation%20of%20Merge%20Sort%20in%20JavaScript&text=First%2C%20we%20create%20an%20empty,since%20they%20are%20both%20sorted.
const ARRAY_MAX_VALUE = 730;
const ARRAY_MIN_VALUE = 5;

export function getMergeSortAnimation(originalArray) {
    const animations = [];
    const arrayToSort = originalArray.slice();
    const sortedArray = mergeSort(arrayToSort, animations);
    return { sortedArray, animations };
}

export function mergeSort(arrayToSort, animations) {

    if (arrayToSort.length === 1) return arrayToSort;
    const halfIdx = Math.ceil(arrayToSort.length / 2);
    const left = arrayToSort.splice(0, halfIdx);
    const leftSorted = mergeSort(left, animations);
    const rightSorted = mergeSort(arrayToSort, animations);
    return mergeSortArrays(leftSorted, rightSorted, animations);
}

function mergeSortArrays(left, right, animations) {
    let arr = [];
    while (left.length && right.length) {

        const leftNode = left[0];
        const rightNode = right[0];
        animations.push(createShowAnimation(leftNode, rightNode, "compareStart"));
        animations.push(createShowAnimation(leftNode, rightNode, "compareEnd"));


        if (leftNode.value < rightNode.value) {
            //the smaller value is already on the left hand side, so add it to the array
            const node = left.shift();
            arr.push(node);
            //if the smaller value is already on the left hand side, we don't need to do a shift
        } else {
            //the larger value is before the smaller value, so add the smaller value to the array
            const node = right.shift();
            const newLeftIdx = leftNode.idx;
            arr.push(node);
            animations.push(createShiftAnimation(node, newLeftIdx, "shiftEnd"))
            var compareStartAnimationIdx = animations.length - 3;
            var compareStartAnimation = animations[compareStartAnimationIdx];
            animations[compareStartAnimationIdx] = { ...compareStartAnimation, shift: true };
            left.forEach(n => {
                n.idx++;
            });
            node.idx = newLeftIdx;
        }
    }
    return [...arr, ...left, ...right];
}

function createShowAnimation(leftNode, rightNode, action) {
    return { leftIdx: leftNode.idx, leftValue: leftNode.value, rightIdx: rightNode.idx, rightValue: rightNode.value, action, shift: false };
}

function createShiftAnimation(node, newIdx, action) {
    return {
        oldIdx: node.idx, newIdx: newIdx, value: node.value, action
    };
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