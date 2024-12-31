import React from 'react'
import { useStore } from './store'
import { useEffect } from 'react';
import replyIcon from '/images/icon-reply.svg'
function App() {
  const {data,fetchData,inputId,setInputDisplay,currentUserName,currentuserImage, inputValue, setInputValue,setComment,currentComment,setCurrentComment,postData} = useStore();
  useEffect(()=>{
    fetchData();
},[currentComment])
  return (
    <div className='bg-VeryLightGray flex flex-col items-center w-full min-h-screen'>
  {data?.comments?.length > 0 ? (
    data.comments.map((comment) => ( 
      <div key={comment.id} className='w-3/5'>
        <div className='bg-White w-full h-fit p-2 rounded-lg mb-5'>
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <img src={comment.user.image.png} alt={`${comment.user.username} profile`} className='w-10 h-10 rounded-full m-2' />
              <h3>{comment.user.username}</h3>
              <span className='mx-4'>{comment.createdAt}</span>
            </div>
            <div className='flex items-center w-fit m-2 cursor-pointer' onClick={()=> setInputDisplay(comment.id)}>
              <img src={replyIcon} alt="reply icon" className='w-fit h-fit m-2'></img>
              <span>reply</span>
            </div>
          </div>
          <div className='pl-5'>{comment.content}</div>
        </div>
        {comment.id == inputId ? (
          <div className='bg-White w-full h-fit p-2 rounded-lg mb-5 flex justify-evenly items-center'>
            <img src={currentuserImage} alt={currentUserName}></img>
            <textarea className='h-[100px] w-3/5 border-2 border-LightGrayishBlue rounded-md'/>
            <button className='w-1/6 h-fit bg-ModerateBlue p-2 rounded-md text-White'>Reply</button>
          </div>
        ):('')}
        {comment.replies.length > 0 &&
          comment.replies.map((reply) => (
            <div key={reply.id} className='w-4/5 ml-10 flex flex-col justify-self-end'>
              <div className='bg-White w-full h-fit p-2 rounded-lg mb-5'>
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    <img src={reply.user.image.png} alt={`${reply.user.username} profile`} className='w-10 h-10 rounded-full m-2' />
                    <h3>{reply.user.username}</h3>
                  </div>
                  <div className='flex items-center w-fit m-2 cursor-pointer' onClick={()=> setInputDisplay(reply.id)}>
                    <img src={replyIcon} alt="reply icon" className='w-fit h-fit m-2'></img>
                    <span>reply</span>
                  </div>
                </div>
                <div className='pl-5'>{reply.content}</div>
              </div>
              {reply.id == inputId ? (
                <div className='bg-White w-full h-fit p-2 rounded-lg mb-5 flex justify-evenly items-center'>
                  <img src={currentuserImage} alt={currentUserName}></img>
                  <textarea value={inputValue}className='h-[100px] w-3/5 border-2 border-LightGrayishBlue rounded-md' onChange={(e)=>setInputValue(e.target.value)}/>
                  <button className='w-1/6 h-fit bg-ModerateBlue p-2 rounded-md text-White' onClick={()=> setComment(comment.id)}>Reply</button>
                </div>
              ):('')}
            </div>
            
          ))}
      </div>
      
    ))
  ) : (
    <p>No comments available or loading...</p>
  )}
  <div className='bg-White w-3/5 h-fit p-2 rounded-lg mb-5 flex justify-evenly items-center'>
      <img src={currentuserImage} alt={currentUserName}></img>
      <textarea value={currentComment}className='h-[100px] w-3/5 border-2 border-LightGrayishBlue rounded-md' onChange={(e)=>setCurrentComment(e.target.value)}/>
      <button className='w-1/6 h-fit bg-ModerateBlue p-2 rounded-md text-White' onClick={()=> postData()}>Send</button>
    </div>
</div>
  )
}

export default App
