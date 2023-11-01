function createNode(data, left = null, right = null){
    return {
        data,
        left,
        right
    }
}
function createTree(array){
    let sortedArray = array.sort((a,b)=>a-b);
    let filteredArray = sortedArray.filter((item, index) =>{
        return sortedArray.indexOf(item) === index;
    })

    return {
        root: buildTree(filteredArray,0,filteredArray.length - 1),
        insert(value){
            let previousNode = null;
            let currentNode = this.root;
            while(currentNode){
                if(value > currentNode.data){
                    [currentNode,previousNode] = [currentNode.right, previousNode=currentNode];
                }else{
                    [currentNode,previousNode] = [currentNode.left, previousNode=currentNode];
                }
            }

            if(value > previousNode.data){
                previousNode.right = createNode(value);
            } else {
                previousNode.left = createNode(value);
            }
        },
        delete(value){
            let previousNode = null;
            let currentNode = this.root;
            while(1 == null){
                if(value > currentNode.data){
                    [currentNode,previousNode] = [currentNode.right, previousNode=currentNode];
                }else{
                    [currentNode,previousNode] = [currentNode.left, previousNode=currentNode];
                }
            }

            
        }
    }
}

function buildTree(array, start, end){
    if(start > end) return null;
    

    const mid = Math.round((start + end) / 2);
    const treeRoot = createNode(array[mid]);

    treeRoot.left = buildTree(array, start, mid - 1);
    treeRoot.right = buildTree(array, mid + 1, end);

    return treeRoot;
}

//credit The Odin Project
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
 


const tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree.insert(83)
prettyPrint(tree.root);