let l = [1, [2, [3, 4]], 5];

const flattenArray = (arr) => {
  for (const i in arr) {
    if (arr[i] === arr[i].)
    console.log(arr[i])
  }
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].isArray) {
      console.log(i, "founded")
    }
  }    
} 
flattenArray(l)
