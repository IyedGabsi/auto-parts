const allStar=document.querySelectorAll('.rating .star')

allStar.forEach((item,idx)=>{
    item.addEventListener('click',function(){
        allStar.forEach(i=>{
            i.classList.replace('fa-solid','fa-regular')
        })
        for(let i=0;i<allStar.length;i++){
            if(i<=idx){
                allStar[i].classList.replace('fa-regular','fa-solid')
            }
        }
    })
})


let thumbnails=document.getElementsByClassName('thumbnail')
let activeImages=document.getElementsByClassName('active')


for(var i=0; i < thumbnails.length ; i++){
    thumbnails[i].addEventListener('mouseover',function(){
        if(activeImages.length>0){
            activeImages[0].classList.remove('active')
        }
        this.classList.add('active')
        document.getElementById('featured').src=this.src
    })
}

let buttonRight=document.getElementById('prev')
let buttonleft=document.getElementById('next')

buttonleft.addEventListener('click',function(){
    document.getElementById('slider').scrollLeft += 180
})
buttonRight.addEventListener('click',function(){
    document.getElementById('slider').scrollLeft -= 180
})