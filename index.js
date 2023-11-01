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
            let direction = "";
            while(currentNode !== null){
                if(currentNode.data === value){
                    if(!currentNode.left && !currentNode.right){
                        previousNode[direction] = null;
                        
                    } else if(!currentNode.left){
                        previousNode[direction] = currentNode.right;
                    } else if(!currentNode.right){
                        previousNode[direction] = currentNode.left;
                    } else{
                        let rootParent = currentNode
                        let newRoot = currentNode.right;
                        let left = currentNode.left;
                        let right = currentNode.right
                        while(newRoot.left !== null){
                            [rootParent, newRoot] = [newRoot, newRoot.left]
                        }
                        if(previousNode){ 
                            previousNode[direction] = newRoot;
                        } else {
                            this.root = newRoot;
                        }
                        newRoot.left = left;
                        newRoot.right = right;
                        rootParent.left = null;
                    }
                    return;
                }else if(value > currentNode.data){
                    [currentNode,previousNode] = [currentNode.right, previousNode=currentNode];
                    direction = "right";
                }else{
                    [currentNode,previousNode] = [currentNode.left, previousNode=currentNode];
                    direction = "left";
                }
            }
            console.log("Node not found");
            
        },
        find(value){
            let currentNode = this.root;
            while(currentNode){
                if(currentNode.data === value){
                    return currentNode
                }else if(value > currentNode.data){
                    currentNode = currentNode.right
                }else{
                    currentNode = currentNode.left
                }
            }
            return "Not found"
            
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
tree.delete(8);
prettyPrint(tree.root);
console.log(tree.find(9));