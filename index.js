function createNode(data, left = null, right = null){
    return {
        data,
        left,
        right
    }
}
function createTree(array){
    
    let sortedArray = sortArray(array)

    return {
        root: buildTree(sortedArray,0,sortedArray.length - 1),
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
            return "Node not found";
            
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
            
        },
        levelOrder(func = (x) => x){
        
            let queue = [this.root];
            let dataArr = [];
            
            while(queue.length !== 0){
                let node = queue.shift();
                dataArr.push(func(node.data));
                if(node.left){queue.push(node.left)}
                if(node.right){queue.push(node.right)};
            }
            return dataArr;
        },
        inOrder(func = (x) => x, root = this.root){
            
            if(!root){
                return null;
            }else{
            
                let leftArr = this.inOrder(func, root.left);
                let arr = [func(root.data)];
                let rightArr = this.inOrder(func,root.right);
                
                if(leftArr){arr = leftArr.concat(arr)}
                if(rightArr){arr = arr.concat(rightArr)}
                return arr;
            }
        },
        preOrder(func = (x) => x, root = this.root){
            
            if(!root){
                return null;
            }else{
                
                let arr = [func(root.data)];
                let leftArr = this.preOrder(func, root.left); 
                let rightArr = this.preOrder(func,root.right);
                
                if(leftArr){arr = arr.concat(leftArr)}
                if(rightArr){arr = arr.concat(rightArr)}
                return arr;
            }
        },
        postOrder(func = (x) => x, root = this.root){
            
            if(!root){
                return null;
            }else{
                
                
                let leftArr = this.postOrder(func, root.left); 
                let rightArr = this.postOrder(func,root.right);
                let arr = [func(root.data)];
                
                if(leftArr && rightArr){
                    arr = leftArr.concat(rightArr, arr)
                }else if(leftArr){
                    arr = leftArr.concat(arr)
                }else if(rightArr){arr = rightArr.concat(arr)}
                return arr;
            }
        },
        height(node, x){
            if(!node) return -1;

            let leftHeight = this.height(node.left, x);
            let rightHeight = this.height(node.right, x);

            let currentHeight = Math.max(leftHeight, rightHeight) + 1;
            
            if(node)

            return currentHeight;
        }
    }
}

function sortArray(array){
    return array.sort((a,b)=>a-b).filter((item,index, thisArray)=> thisArray.indexOf(item) === index);
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
//console.log(tree.find(9));
//console.log(tree.levelOrder())
//console.log(tree.inOrder());
//console.log(tree.preOrder());
//console.log(tree.postOrder());
console.log(tree.height(tree.find(9)));