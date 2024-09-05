export const Utils = {
    mergeArrays(arr1, arr2) {
    const map = new Map();

    arr1.forEach(obj => map.set(obj.id, obj));
    arr2.forEach(obj => map.set(obj.id, obj));

    return Array.from(map.values());
  }
}
