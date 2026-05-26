let draggedItem=null;

function wireDraggable(item){
    item.addEventListener('dragStart',()=>{
       draggedItem=item;
       item.classList.add('dragging')
    })
    item.addEventListener('dragEnd',()=>{
        draggedItem=null;
       item.classList.remove('dragging')
    })

    
    const del=item.querySelector(".delete-btn");
    if(del){
        del.addEventListener("click",(e)=>{
            e.stopPropagation();
            item.remove()
        })
    }
}


document.querySelectorAll(".items").forEach(wrapper=>{
    wrapper.addEventListener('dragover',(e)=>{
        e.preventDefault();
        const afterElement=getDragAfterElement(wrapper,e.clientY)
        if(!draggedItem) return ;
        if(afterElement==null){
             wrapper.appendChild(draggedItem)
        }
        else{
            wrapper.insertBefore(draggedItem,afterElement)
        }
    })
})

function getDragAfterElement(container,y){
   const items=[...container.querySelectorAll('.item:not(.dragging)')]
   return items.reduce((closest,child)=>{
     const box=child.getBoundingClientRect();
     const offset=y-(box.top+box.height/2);
     if(offset<0 && offset >closest.offset){
          return {offset:offset,element:child}
     }
     else{
        return closest;
     }
   },{offset:Number.NEGATIVE_INFINITY}).element;
}

document.querySelectorAll('.column').forEach(col=>{
    const input=col.querySelector('.add-bar input');
    const btn=col.querySelector('.add-bar button');
    const itemsWrap=col.querySelector('.items');
const addItem=()=>{
    const text=(input.value || '').trim();
    if(!text) return;
    const item=document.createElement("div")
    item.className='item'
    item.draggable=true;
    item.textContent=text;
    const del=document.createElement("button")
    del.className='delete-btn'
    del.title='Delete'
    del.textContent='x'
    item.appendChild(del)
    itemsWrap.appendChild(item)
    wireDraggable(item)
    input.value=''

}
btn.addEventListener('click',addItem)
input.addEventListener('keydown',(e)=>{
    if(e.key==='Enter') addItem()
})
})
document.querySelectorAll('.item').forEach(wireDraggable)