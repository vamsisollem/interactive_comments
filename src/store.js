import { create } from "zustand";

const store = (set,get)=>({
    data : {},
    inputId: '',
    currentUserName: '',
    currentuserImage: '',
    inputValue : '',
    setInputValue: (value)=> set({inputValue: value}),
    currentComment: '',
    setCurrentComment:(value)=> set({currentComment: value}),
    setComment:(id)=>{
        
        },
    setcurrentImage: (path)=> set({currentuserImage: path}),
    setcurrentuser: (name) => set({currentUserName: name}),
    setData : (info)=>set({data:info}),
    setInputDisplay: (id)=> set(state => ({inputId: id})),
    fetchData: async ()=>{
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            if(data){
                get().setData(data)
                get().setcurrentImage(data.currentUser.image.png)
                get().setcurrentuser(data.currentUser.username)
            }
            else{
                console.log('No data to display');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },
    postData : async()=>{
        const newComment = {
            "id": Date.now().toString(36) + Math.random().toString(36).substring(2),
            "content": get().currentComment,
            "createdAt": "",
            "score": 0,
            "user": {
                "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
                },
                "username": "juliusomo"
            },
            "replies": []
        }
        try {
            const response = await fetch('http://localhost:3000/comments',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
            if(!response.ok){
                console.log('Error posting the data')
            }
            else{
                const data = await response.json()
                console.log('succesfully posted', data)
                get().setCurrentComment('')
            }
            
        } catch (error) {
            console.error('Error:', error)
        }
    },

})

export const useStore = create(store);