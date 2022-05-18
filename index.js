let start_x, start_y, end_x, end_y;
let moveMove_x, moveMove_y;
const box = document.getElementById('box')
const item = document.getElementsByTagName('input')
const dragBox = document.getElementById('drag')
let box_left = box.getBoundingClientRect().left
let box_top = box.getBoundingClientRect().top
box.onmousedown = function(e) {
    start_x = e.clientX
    start_y = e.clientY
    end_x = e.clientX
    end_y = e.clientY
    dragBox.style.display = 'block'
}

box.onmousemove = function(e) {
    end_x = e.clientX
    end_y = e.clientY
    dragBox.style.width = Math.abs(start_x - end_x) + 'px'
    dragBox.style.height = Math.abs(start_y - end_y) + 'px'
    dragBox.style.left = Math.min(start_x, end_x) - box_left + 'px'
    dragBox.style.top = Math.min(start_y, end_y) - box_top + 'px'
}

box.onmouseup = function() {
    for (let i = 0; i < item.length; i++) {
        const location = item[i].getBoundingClientRect()
        if (get_location(location, dragBox.getBoundingClientRect()) == true) {
            item[i].checked = true
        }
    }
    dragBox.style.display = 'none'
    start_x = 0;
    start_y = 0;
    end_x = 0;
    end_y = 0;
}

function get_location(item, drag) {
    const width_max = Math.max(item.x + item.width, drag.x + drag.width)
    const hieght_max = Math.max(item.y + item.height, drag.y + drag.height)
    const width_min = Math.min(item.x, drag.x)
    const height_min = Math.min(item.y, drag.y)
    if (width_max - width_min <= item.width + drag.width && hieght_max - height_min <= item.height + drag.height) {
        return true
    } else {
        return false
    }
}