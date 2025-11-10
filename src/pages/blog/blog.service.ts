import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {type Post } from '@/types/blog.type'
// import { resourceLimits } from 'worker_threads'

// bên slice ta dùng createSlice để tạo slice
// bên RTK query thì ta dùng createApi

// với createApi chúng ta gọi là sliceapi
// chúng ta sẽ khai báo baseUrl và các endpoints

// baseQuery được dùng cho mỗi endpoint để fetch api

// fetchBaseQuery là một function nhỏ được dây dựng tên fetch
// không hoàn toàn thay thế được axios nhưng sẽ giải quyết được hầu hết các vấn đề của bạn
// chúng ta có thể dùng axios thay thế cũng được

// endpoints là tập hợp những methods giúp get,post, put, delete... tương tác với server
// khi khai báo endpoints nó sẽ sinh ra cho chúng ta các hook tương ứng để dùng trong components
// endpoints có 2 hiểu là query và mutation
// query: thường dùng cho get
// mutation: thường dùng cho các trường hợp thay đổi dữ liệu trên server như post, put, delete


export const blogApi = createApi({
    reducerPath: 'blogApi', //Tên field trong redux state
    tagTypes: ['Posts'], //Những kiểu tag cho phép dùng trong blogApi
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    endpoints: build => ({
        // Generic Type theo thứ tự là kiểu response trả về và argument
        getPosts: build.query<Post[], void>({
            query: ()=> 'posts',
            providesTags(result){
                /*
                    Cái callback này sẽ chạy mỗi khi getPost chạy
                    Mong muốn là sẽ return về một mảng kiểu
                    interface Tags: {
                        type: "Posts";
                        id: string;
                    }[] 
                    vì thế phải thêm as const vào để báo hiệu type là Read only, không thể mutate
                */
               if(result) {
                const final = [...result.map(({id}) => ({type: 'Posts' as const,id})), {type: 'Posts' as const, id: 'LIST'}]
                return final
               }
            //    const final = [{type: 'Posts' as const, id: 'LIST'}]
            //    return final
               return [{type: 'Posts', id: 'LIST'}]
            }
        }),
        /*
            Chúng ta dùng mutation đối với các trường hợp POST, PUT, DELETE
            Post là response trả về và Omit<Post, 'id'> là body gửi lên
        */
       addPost: build.mutation<Post, Omit<Post, 'id'>>({
            query: (body) => {
                return {
                    url: 'posts',
                    method: 'POST',
                    body
                }
            },
            /*
                invalidatesTag cung cấp các tag để báo hiệu cho những method nào có providesTag
                match với nó để bị gọi lại
                Trong trường hợp này thì getPosts sẽ chạy lại
            */
            invalidatesTags: (result, error, body) => [{type: 'Posts', id: 'LIST'}]
       })
    })   
})

// Cái hook này được tạo ra khi ta sử dụng createApi và nó sẽ được đặt tên theo cái endpoints
export const {useGetPostsQuery, useAddPostMutation} = blogApi