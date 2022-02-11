class PhotoGallery{
    constructor(){
        this.ApiKey= '563492ad6f91700001000001736a4740576a46c595ad05ca3b451666';
        this.galleryDiv =document.querySelector('.gallery');
        
        this.searchForm = document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.pageIndex = 1;
        this.eventHandle();
    }
    eventHandle(){
        document.addEventListener('DOMContentLoaded',()=>{
            this.getImage(1);
        });
        this.searchForm.addEventListener('submit',(e)=>{
            this.getSearchedImages(e)
        })
        this.loadMore.addEventListener('click',(e)=>{
            this.loadMoreImages(e)
        })
    }
    async getImage(index){
        this.loadMore.setAttribute('data-img', 'curated');
        const baseURL =`https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
      const data =await this.fetchImages(baseURL);
      this.genarateHtml(data.photos);
    //   console.log(data.photos);
     
    }
    async fetchImages(baseURL){
        const response = await fetch(baseURL,{
            method:'GET',
            headers:{
                Accept: 'application/json',
                Authorization : this.ApiKey
            }
        });
        const data = await response.json();
        return data;
    }
    genarateHtml(photos){
        photos.forEach(photo =>{
            const item =document.createElement('div');
            item.classList.add('item');
            item.innerHTML=`
            <a href='#'>
            <img src="${photo.src.medium}">
            <h3>${photo.photographer}</h3>
            </a>
            `;
            this.galleryDiv.appendChild(item);
        })
    }
   async getSearchedImages(e){
       this.loadMore.setAttribute('data-img', 'search');
        e.preventDefault();
        this.galleryDiv.innerHTML='';
        const searchValue =e.target.querySelector('input').value;
        const baseURL = await `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
        const data = await this.fetchImages(baseURL);
        this.genarateHtml(data.photos)
        e.target.reset();
    }
    loadMoreImages(e){
        let index = ++this.pageIndex;
       const loadMoreData = e.target.getAttribute('data-img');
       if(loadMoreData === 'curated'){
        this.getImage(index)
       }else{

       }

    }
}

const gallery =new PhotoGallery;




//for backup

// class PhotoGallery{
//     constructor(){
//         this.ApiKey= '563492ad6f91700001000001736a4740576a46c595ad05ca3b451666';
//         this.galleryDiv =document.querySelector('.gallery');
        
//         this.searchForm = document.querySelector('.header form');
//         this.loadMore = document.querySelector('.load-more');
//         this.eventHandle();
//     }
//     eventHandle(){
//         document.addEventListener('DOMContentLoaded',()=>{
//             this.getImage();
//         });
//     }
//     async getImage(){
//         const baseURL ="https://api.pexels.com/v1/curated?per_page=12";
//       const data =await this.fetchImages(baseURL);
//       this.genarateHtml(data.photos);
//     //   console.log(data.photos);
     
//     }
//     async fetchImages(baseURL){
//         const response = await fetch(baseURL,{
//             method:'GET',
//             headers:{
//                 Accept: 'application/json',
//                 Authorization : this.ApiKey
//             }
//         });
//         const data = await response.json();
//         return data;
//     }
//     genarateHtml(photos){
//         photos.forEach(photo =>{
//             const item =document.createElement('div');
//             item.classList.add('item');
//             item.innerHTML=`
//             <a href='#'>
//             <img src="${photo.src.medium}">
//             <h3>${photo.photographer}</h3>
//             </a>
//             `;
//             this.galleryDiv.appendChild(item);
//         })
//     }
// }

// const gallery =new PhotoGallery;
